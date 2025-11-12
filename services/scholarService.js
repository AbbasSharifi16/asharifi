const axios = require('axios');
const cheerio = require('cheerio');

// Cache for scholar data
let cachedData = {
  publications: 0,
  citations: 0,
  hIndex: 0,
  i10Index: 0,
  lastUpdated: null
};

// Cache for publications list
let cachedPublications = [];

/**
 * Fetch detailed publications list from Google Scholar
 * @param {string} userId - Google Scholar user ID
 */
async function fetchPublicationsList(userId) {
  const publications = [];
  let pageIndex = 0;
  const pageSize = 100; // Max items per page
  let hasMorePages = true;

  try {
    while (hasMorePages) {
      const url = `https://scholar.google.com/citations?user=${userId}&hl=en&cstart=${pageIndex}&pagesize=${pageSize}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const publicationsOnPage = $('#gsc_a_t tr.gsc_a_tr');
      
      if (publicationsOnPage.length === 0) {
        hasMorePages = false;
      } else {
        publicationsOnPage.each((index, element) => {
          const $row = $(element);
          const title = $row.find('.gsc_a_t a').text().trim();
          const authors = $row.find('.gs_gray').eq(0).text().trim();
          const venue = $row.find('.gs_gray').eq(1).text().trim();
          const year = $row.find('.gsc_a_y span').text().trim();
          const citedBy = $row.find('.gsc_a_c a').text().trim() || '0';
          const link = 'https://scholar.google.com' + $row.find('.gsc_a_t a').attr('href');
          
          if (title) {
            publications.push({
              title,
              authors,
              venue,
              year: parseInt(year) || 0,
              citedBy: parseInt(citedBy) || 0,
              link
            });
          }
        });
        
        pageIndex += pageSize;
        
        // Check if we got less than pageSize items
        if (publicationsOnPage.length < pageSize) {
          hasMorePages = false;
        }
        
        // Add a small delay to avoid rate limiting
        if (hasMorePages) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    return publications;
  } catch (error) {
    console.error('Error fetching publications list:', error.message);
    return [];
  }
}

/**
 * Fetch total number of publications by checking all pages
 * @param {string} userId - Google Scholar user ID
 */
async function fetchTotalPublications(userId) {
  let totalPublications = 0;
  let pageIndex = 0;
  const pageSize = 100; // Max items per page
  let hasMorePages = true;

  try {
    while (hasMorePages) {
      const url = `https://scholar.google.com/citations?user=${userId}&hl=en&cstart=${pageIndex}&pagesize=${pageSize}`;
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      const publicationsOnPage = $('#gsc_a_t tr.gsc_a_tr').length;
      
      if (publicationsOnPage === 0) {
        hasMorePages = false;
      } else {
        totalPublications += publicationsOnPage;
        pageIndex += pageSize;
        
        // Check if there's a "Next" button or if we got less than pageSize items
        const showMoreButton = $('#gsc_bpf_more').length;
        if (publicationsOnPage < pageSize || !showMoreButton) {
          hasMorePages = false;
        }
        
        // Add a small delay to avoid rate limiting
        if (hasMorePages) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
    
    return totalPublications;
  } catch (error) {
    console.error('Error fetching total publications:', error.message);
    return 0;
  }
}

/**
 * Fetch Google Scholar metrics
 * @param {string} userId - Google Scholar user ID
 */
async function fetchScholarMetrics(userId = 'OChapXkAAAAJ') {
  try {
    const url = `https://scholar.google.com/citations?user=${userId}&hl=en`;
    
    // Set a user agent to avoid being blocked
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Extract metrics from the page
    const citations = $('#gsc_rsb_st tbody tr').eq(0).find('td').eq(1).text().trim() || '0';
    const hIndex = $('#gsc_rsb_st tbody tr').eq(1).find('td').eq(1).text().trim() || '0';
    const i10Index = $('#gsc_rsb_st tbody tr').eq(2).find('td').eq(1).text().trim() || '0';
    
    // Fetch total publications across all pages
    console.log('🔍 Fetching all publications across multiple pages...');
    const publicationsCount = await fetchTotalPublications(userId);
    
    // Fetch detailed publications list
    console.log('📚 Fetching detailed publications list...');
    const publicationsList = await fetchPublicationsList(userId);
    cachedPublications = publicationsList;
    console.log(`✅ Fetched ${publicationsList.length} publications with details`);

    // Update cache
    cachedData = {
      publications: parseInt(publicationsCount) || 0,
      citations: parseInt(citations.replace(/,/g, '')) || 0,
      hIndex: parseInt(hIndex) || 0,
      i10Index: parseInt(i10Index) || 0,
      lastUpdated: new Date()
    };

    console.log('✅ Google Scholar metrics updated:', cachedData);
    return cachedData;

  } catch (error) {
    console.error('❌ Error fetching Google Scholar metrics:', error.message);
    
    // Return cached data if available, otherwise return defaults
    if (cachedData.lastUpdated) {
      console.log('⚠️ Using cached data from:', cachedData.lastUpdated);
      return cachedData;
    }
    
    return {
      publications: 0,
      citations: 0,
      hIndex: 0,
      i10Index: 0,
      lastUpdated: null,
      error: error.message
    };
  }
}

/**
 * Get cached metrics
 */
function getCachedMetrics() {
  return cachedData;
}

/**
 * Get cached publications list
 */
function getCachedPublications() {
  return cachedPublications;
}

module.exports = {
  fetchScholarMetrics,
  getCachedMetrics,
  getCachedPublications
};

const express = require('express');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const cron = require('node-cron');
const { fetchScholarMetrics, getCachedMetrics, getCachedPublications } = require('./services/scholarService');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      mediaSrc: ["'self'", "blob:", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://view.officeapps.live.com"],
    },
  },
}));

// Compression middleware
app.use(compression());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// Initialize Google Scholar metrics on startup
fetchScholarMetrics().then(() => {
  console.log('📊 Initial Google Scholar metrics loaded');
});

// Schedule automatic updates every 24 hours (daily at midnight)
cron.schedule('0 0 * * *', () => {
  console.log('🔄 Updating Google Scholar metrics...');
  fetchScholarMetrics();
});

// API endpoint to get current metrics
app.get('/api/scholar-metrics', (req, res) => {
  res.json(getCachedMetrics());
});

// Routes
app.get('/', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('index', { 
    title: 'Abbas Sharifi - PhD in Civil Engineering',
    page: 'home',
    scholarMetrics: metrics
  });
});

app.get('/research', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('research', { 
    title: 'Research - Abbas Sharifi',
    page: 'research',
    scholarMetrics: metrics
  });
});

app.get('/research/seawater-robot', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('seawater-robot', { 
    title: 'Sea Water Robot - Abbas Sharifi',
    page: 'research',
    scholarMetrics: metrics
  });
});

app.get('/research/magnetic-drug-targeting', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('magnetic-drug-targeting', { 
    title: 'Magnetic Drug Targeting - Abbas Sharifi',
    page: 'research',
    scholarMetrics: metrics
  });
});

app.get('/research/medical-image-processing', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('medical-image-processing', { 
    title: 'Medical Image Processing - Abbas Sharifi',
    page: 'research',
    scholarMetrics: metrics
  });
});

app.get('/research/covid-research', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('covid-research', { 
    title: 'COVID-19 Research - Abbas Sharifi',
    page: 'research',
    scholarMetrics: metrics
  });
});

app.get('/publications', (req, res) => {
  const metrics = getCachedMetrics();
  const publications = getCachedPublications();
  res.render('publications', { 
    title: 'Publications - Abbas Sharifi',
    page: 'publications',
    scholarMetrics: metrics,
    publications: publications
  });
});

app.get('/teaching', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('teaching', { 
    title: 'Teaching - Abbas Sharifi',
    page: 'teaching',
    scholarMetrics: metrics
  });
});

app.get('/gallery', (req, res) => {
  const metrics = getCachedMetrics();
  const galleryPath = path.join(__dirname, 'public', 'img', 'gallery');
  
  // Read all images from the gallery folder
  let images = [];
  try {
    if (fs.existsSync(galleryPath)) {
      const files = fs.readdirSync(galleryPath);
      images = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'].includes(ext);
      }).map(file => `/img/gallery/${file}`);
    }
  } catch (error) {
    console.error('Error reading gallery folder:', error);
  }
  
  res.render('gallery', { 
    title: 'Gallery - Abbas Sharifi',
    page: 'gallery',
    scholarMetrics: metrics,
    images: images
  });
});

app.get('/contact', (req, res) => {
  const metrics = getCachedMetrics();
  res.render('contact', { 
    title: 'Contact - Abbas Sharifi',
    page: 'contact',
    scholarMetrics: metrics
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

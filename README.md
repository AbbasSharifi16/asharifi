# Abbas Sharifi - Professional Academic Website

A professional academic portfolio website built with Node.js and Express.js, featuring a modern Google-inspired design and comprehensive content management system.

## Features

- **Professional Design**: Google-inspired color scheme with clean typography using Inter and Merriweather fonts
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Complete Academic Portfolio**: 
  - Homepage with hero section and research highlights
  - Research page with detailed project information
  - Publications page with comprehensive publication list
  - Teaching page with course information
  - Contact page with contact form
- **Interactive Elements**: Smooth animations, hover effects, and responsive navigation
- **SEO Optimized**: Meta tags, semantic HTML structure, and proper heading hierarchy
- **Performance Optimized**: Compressed assets, efficient CSS, and optimized images

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone or download the project** to your local machine

2. **Navigate to the project directory**:
   ```bash
   cd "Personal Website"
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Add your images**:
   - Place your profile picture in `img/profile.jpg`
   - Place your lab image in `img/lab_image.jpg`
   - The website already references these image paths

5. **Add your research videos**:
   - Place the following videos in `public/video/` directory:
     - `geyser_experimental_setup.mp4` - Main experimental setup (will autoplay with overlay)
     - `geyser_video1.mp4` or `geyser_video1.mov` - Geyser experiment example 1
     - `geyser_video2.mp4` - Geyser experiment example 2
     - `geyser_video3.mp4` - Geyser experiment example 3
   - See `public/video/README.md` for video specifications and optimization tips
   - Videos will autoplay on the research page

6. **Start the development server**:
   ```bash
   npm run dev
   ```
   This will start the server with nodemon for automatic restarts during development.

6. **For production**:
   ```bash
   npm start
   ```

7. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
Personal Website/
├── app.js                 # Main Express server
├── package.json           # Project dependencies and scripts
├── README.md             # This file
├── img/                  # Image directory
│   ├── profile.jpg       # Your profile picture
│   └── lab_image.jpg     # Lab setup image
├── public/               # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   └── js/
│       └── main.js       # Client-side JavaScript
└── views/                # EJS templates
    ├── index.ejs         # Homepage
    ├── research.ejs      # Research page
    ├── publications.ejs  # Publications page
    ├── teaching.ejs      # Teaching page
    └── contact.ejs       # Contact page
```

## Customization

### Content Updates
- **Personal Information**: Edit the EJS files in the `views/` directory
- **Publications**: Update the publications list in `publications.ejs`
- **Research Projects**: Modify research details in `research.ejs`
- **Teaching Experience**: Update course information in `teaching.ejs`

### Styling
- **Colors**: Modify CSS custom properties in `public/css/style.css`
- **Fonts**: Change Google Fonts imports in the EJS templates
- **Layout**: Adjust CSS Grid and Flexbox layouts in the stylesheet

### Adding New Pages
1. Create a new EJS template in the `views/` directory
2. Add a new route in `app.js`
3. Update the navigation in all templates

## Available Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-restart
- `npm test`: Run tests (to be implemented)

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: CSS3 with Custom Properties, Google Fonts
- **Icons**: Font Awesome
- **Development**: Nodemon for auto-restart

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Local Development
The website is ready to run locally with the setup instructions above.

### Production Deployment
For production deployment, you can:

1. **Deploy to Heroku**:
   - Add a `Procfile` with: `web: node app.js`
   - Set up environment variables if needed
   - Deploy using Git

2. **Deploy to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`

3. **Deploy to DigitalOcean/AWS**:
   - Set up a server with Node.js
   - Clone the repository
   - Run `npm install --production`
   - Use PM2 for process management

## Performance Considerations

- Images should be optimized (WebP format recommended)
- The website uses compression middleware for faster loading
- CSS is minified and optimized
- Font loading is optimized with font-display: swap

## Contact Information

For questions about this website template or customization requests:

- **Email**: asharifi@fiu.edu
- **LinkedIn**: [Abbas Sharifi](https://www.linkedin.com/in/abbas-sharifi/)
- **Google Scholar**: [Profile](https://scholar.google.com/citations?user=OChapXkAAAAJ)

## License

This project is created for academic portfolio purposes. Feel free to use it as a template for your own academic website.

---

**Note**: Make sure to replace the placeholder images with your actual photos and update all personal information to match your profile.

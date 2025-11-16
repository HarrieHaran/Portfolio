# Personal Portfolio Website

A responsive and visually appealing personal portfolio website built with HTML, CSS, JavaScript, and Bootstrap.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices (desktop, tablet, mobile)
- **Smooth Scrolling**: JavaScript-powered smooth scrolling navigation
- **Interactive Navigation**: Active link highlighting based on scroll position
- **Modern UI/UX**: Beautiful gradient designs and hover effects
- **Portfolio Section**: Showcase your projects with interactive cards
- **Blog Integration**: WordPress blog section with API integration support
- **Contact Form**: Functional contact form with validation
- **Social Links**: Easy-to-customize social media links

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styling with animations and transitions
- **JavaScript**: Interactive features and smooth scrolling
- **Bootstrap 5.3.2**: Responsive grid system and components
- **Bootstrap Icons**: Icon library

## File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Setup Instructions

1. **Download/Clone** all files to your local machine
2. **Open** `index.html` in a web browser
3. **Customize** the content with your own information:
   - Update name, title, and bio in the HTML
   - Replace placeholder images with your own
   - Add your actual portfolio projects
   - Update social media links
   - Configure WordPress blog URL (if applicable)

## Customization Guide

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --dark-color: #212529;
    --light-color: #f8f9fa;
}
```

### Adding Portfolio Projects

In `index.html`, find the portfolio section and duplicate the portfolio card structure:

```html
<div class="col-md-6 col-lg-4">
    <div class="portfolio-card">
        <div class="portfolio-image">
            <div class="portfolio-placeholder">
                <i class="bi bi-laptop"></i>
            </div>
            <div class="portfolio-overlay">
                <h5>Your Project Title</h5>
                <p>Project description</p>
                <a href="#" class="btn btn-sm btn-light">View Project</a>
            </div>
        </div>
    </div>
</div>
```

### WordPress Blog Integration

To connect your WordPress blog:

1. Open `script.js`
2. Find the WordPress integration section (commented out)
3. Uncomment the code
4. Replace `'https://yourwordpresssite.com'` with your WordPress site URL
5. Uncomment the `loadWordPressPosts()` call at the bottom

Make sure your WordPress site has the REST API enabled and is publicly accessible.

### Updating Contact Form

The contact form currently shows an alert on submission. To make it functional:

1. Set up a backend endpoint to handle form submissions
2. In `script.js`, uncomment the fetch code in the contact form handler
3. Update the endpoint URL to match your backend

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Optimize images before adding them
- Use a CDN for Bootstrap and icons (already configured)
- Consider minifying CSS and JavaScript for production
- Enable gzip compression on your web server

## License

This project is open source and available for personal and commercial use.

## Credits

- Bootstrap: https://getbootstrap.com/
- Bootstrap Icons: https://icons.getbootstrap.com/

## Support

For questions or issues, please refer to the code comments or create an issue in the repository.


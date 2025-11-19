// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initEnquiryForm();
    initGalleryLightbox();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'Index.html' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu toggle (if needed in future)
    // This is a placeholder for potential mobile menu functionality
}

// Enquiry form validation and submission
function initEnquiryForm() {
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // If validation passes, show success message
            alert('Thank you for your enquiry! We will get back to you soon.');
            enquiryForm.reset();
        });
    }
}

// Gallery Lightbox functionality
function initGalleryLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="" alt="">
            <div class="caption"></div>
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Get all product images
    const productImages = document.querySelectorAll('section img');
    let currentImageIndex = 0;
    const imagesArray = Array.from(productImages);
    
    // Add click event to each image
    productImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox(img.src, img.alt);
        });
    });
    
    // Open lightbox function
    function openLightbox(src, alt) {
        const lightboxImg = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.caption');
        
        lightbox.style.display = 'flex';
        lightboxImg.src = src;
        caption.textContent = alt;
        
        // Update navigation buttons state
        updateNavButtons();
    }
    
    // Close lightbox
    lightbox.querySelector('.close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
    
    // Navigation between images
    lightbox.querySelector('.prev').addEventListener('click', function() {
        navigate(-1);
    });
    
    lightbox.querySelector('.next').addEventListener('click', function() {
        navigate(1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            } else if (e.key === 'Escape') {
                lightbox.style.display = 'none';
            }
        }
    });
    
    // Navigate function
    function navigate(direction) {
        currentImageIndex += direction;
        
        // Loop around if at beginning or end
        if (currentImageIndex >= imagesArray.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = imagesArray.length - 1;
        }
        
        const newImg = imagesArray[currentImageIndex];
        openLightbox(newImg.src, newImg.alt);
    }
    
    // Update navigation buttons state
    function updateNavButtons() {
        const prevBtn = lightbox.querySelector('.prev');
        const nextBtn = lightbox.querySelector('.next');
        
        // Show/hide buttons based on current position
        // For single image, hide both buttons
        if (imagesArray.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
        }
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add some CSS for the lightbox via JavaScript
function addLightboxStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            margin: 0 auto;
        }
        
        .lightbox-content .close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .lightbox-content .caption {
            color: white;
            text-align: center;
            padding: 10px 0;
            font-size: 18px;
        }
        
        .lightbox-content .prev,
        .lightbox-content .next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 18px;
        }
        
        .lightbox-content .prev {
            left: 0;
        }
        
        .lightbox-content .next {
            right: 0;
        }
        
        .lightbox-content .prev:hover,
        .lightbox-content .next:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        /* Add cursor pointer to product images to indicate they're clickable */
        section img {
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        section img:hover {
            transform: scale(1.03);
        }
        
        /* Active navigation link styling */
        nav a.active {
            font-weight: bold;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
}

// Call the function to add lightbox styles
addLightboxStyles();

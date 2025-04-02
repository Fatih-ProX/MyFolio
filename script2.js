// Job Role Typing Animation
const jobRoles = [
    "ServiceNow Developer",
    "IT Support Specialist",
    "Software Engineer",
    "ITAM Specialist",
    "Cloud Solutions Engineer",
    "IT Operations Analyst",
    "UX Designer",
    "Data Analyst",
    "IT Consultant",
    "Technical Support Engineer"
];

const jobRoleElement = document.getElementById("job-role");
const cursor = document.querySelector('.cursor');

let currentRoleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeWriter() {
    const currentRole = jobRoles[currentRoleIndex];

    if (!isDeleting && !isPaused) {
        // Typing phase
        jobRoleElement.textContent = currentRole.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === currentRole.length) {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
            }, 2000);
        }
    } else if (isDeleting && !isPaused) {
        // Deleting phase
        jobRoleElement.textContent = currentRole.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % jobRoles.length;
        }
    }

    // Speed control
    let speed = 150;
    if (isDeleting) speed = 100;
    if (isPaused) speed = 2000;

    setTimeout(typeWriter, speed);
}

// Start animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeWriter, 1000);
});

// Tooltips for Tech Stack
document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', () => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = el.dataset.tooltip;
        document.body.appendChild(tooltip);

        const rect = el.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 30}px`;
    });

    el.addEventListener('mouseleave', () => {
        document.querySelector('.tooltip')?.remove();
    });
});

// Animate progress bars
document.querySelectorAll('.progress-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', `${progress}%`);
});

// Custom Cursor
const customCursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.pageX}px`;
    customCursor.style.top = `${e.pageY}px`;
});

// Add hover effect to interactive elements
const hoverElements = document.querySelectorAll('a, button, .hover-glow, .btn, .social-icon, .info-card, .skill-badge');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

// Smooth Scroll-to-Top Button
document.querySelector('.scroll-to-top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



// Background Image Carousel
const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;

const showNextImage = () => {
    // Hide the current image
    carouselItems[currentItem].classList.remove('active');

    // Move to the next image
    currentItem = (currentItem + 1) % carouselItems.length;

    // Show the next image
    carouselItems[currentItem].classList.add('active');
};

// Start the carousel
setInterval(showNextImage, 5000); // Change image every 5 seconds

// Initialize the first image
carouselItems[currentItem].classList.add('active');


//pie chart
document.querySelectorAll('.skill-badge').forEach(badge => {
    const progress = badge.dataset.progress;
    const pieChart = badge.querySelector('.pie-chart');
    pieChart.style.background = `conic-gradient(
        #00ff88 ${progress}%,
        rgba(255, 255, 255, 0.1) ${progress}% 100%
    )`;
});

// EmailJS Configuration
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your user ID
    emailjs.init("1JmKG3aVuI9IZU1Xm"); // Replace with your actual EmailJS user ID

    // Get the contact form
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Send the email
            emailjs.sendForm('service_zgw1rpy', 'template_sfb0d48', this)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    Swal.fire({
                        title: 'Message Sent!',
                        text: 'Thank you for reaching out. I will get back to you soon!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    contactForm.reset();
                }, function (error) {
                    console.log('FAILED...', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Something went wrong. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        });
    }
});

// ============================================
// Smooth Scrolling and Navigation
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    
    const navbar = document.getElementById('mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolling down
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const navbarHeight = navbar.offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // Contact Form Handling
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            
            // In a real application, you would use fetch or axios to send data:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            })
            .catch(error => {
                alert('Sorry, there was an error sending your message. Please try again.');
            });
            */
        });
    }

    // ============================================
    // Scroll Animations (Intersection Observer)
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.portfolio-card, .timeline-item, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // Portfolio Card Hover Effects Enhancement
    // ============================================
    
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // Initialize Active Nav Link on Page Load
    // ============================================
    
    updateActiveNavLink();
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };

}

// ============================================
// Interactive Code Editor Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('editBtn');
    const runBtn = document.getElementById('runBtn');
    const codeDisplay = document.getElementById('codeDisplay');
    const codeInput = document.getElementById('codeInput');
    const codeOutput = document.getElementById('codeOutput');
    const outputContent = document.getElementById('outputContent');
    
    let isEditing = false;
    
    // Default code content
    const defaultCode = `# About Me

class Developer:
    def __init__(self):
        self.name = 'HarrieHaran B'
        self.role = 'Full Stack Developer'
        self.skills = ['Python', 'JavaScript', 'React']
    
    def work(self):
        return 'Building amazing web apps'

# Create instance
dev = Developer()
print(dev.name)
print(dev.work())`;
    
    // Edit button functionality
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            if (!isEditing) {
                // Switch to edit mode
                isEditing = true;
                codeDisplay.style.display = 'none';
                codeInput.style.display = 'block';
                codeOutput.style.display = 'none';
                codeInput.value = codeInput.value || defaultCode;
                codeInput.focus();
                editBtn.innerHTML = '<i class="bi bi-check"></i> Save';
                editBtn.classList.add('code-btn-save');
            } else {
                // Save and switch back to view mode
                isEditing = false;
                codeDisplay.style.display = 'block';
                codeInput.style.display = 'none';
                // Update the display (you could add syntax highlighting here)
                codeDisplay.textContent = codeInput.value;
                editBtn.innerHTML = '<i class="bi bi-pencil"></i> Edit';
                editBtn.classList.remove('code-btn-save');
            }
        });
    }
    
    // Run button functionality
    if (runBtn) {
        runBtn.addEventListener('click', function() {
            const code = codeInput.value || defaultCode;
            
            // Show output
            codeOutput.style.display = 'block';
            
            // Simulate Python execution (mock output)
            // In a real implementation, you could use Pyodide to run actual Python
            const mockOutput = simulatePythonExecution(code);
            outputContent.textContent = mockOutput;
            
            // Add running animation
            runBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Running...';
            runBtn.disabled = true;
            
            setTimeout(() => {
                runBtn.innerHTML = '<i class="bi bi-play-fill"></i> Run';
                runBtn.disabled = false;
            }, 1000);
        });
    }
    
    // Function to simulate Python execution
    function simulatePythonExecution(code) {
        // Extract print statements and simulate output
        const printMatches = code.match(/print\([^)]+\)/g);
        let output = '';
        
        if (printMatches) {
            printMatches.forEach(printStmt => {
                // Extract content inside print()
                const content = printStmt.match(/print\((.+)\)/);
                if (content) {
                    const value = content[1].trim();
                    
                    // Simple simulation
                    if (value.includes('dev.name')) {
                        output += 'HarrieHaran B\n';
                    } else if (value.includes('dev.work()')) {
                        output += 'Building amazing web apps\n';
                    } else if (value.includes('dev.role')) {
                        output += 'Full Stack Developer\n';
                    } else if (value.includes('dev.skills')) {
                        output += "['Python', 'JavaScript', 'React']\n";
                    } else {
                        // Try to evaluate simple expressions
                        try {
                            const cleanValue = value.replace(/['"]/g, '');
                            output += cleanValue + '\n';
                        } catch (e) {
                            output += value + '\n';
                        }
                    }
                }
            });
        }
        
        return output || 'Code executed successfully!';
    }
    
    // Allow Enter key in textarea (but not submit)
    if (codeInput) {
        codeInput.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });
    }
});

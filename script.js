// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (mobileNav.classList.contains("active")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = mobileNav.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.replace("fa-times", "fa-bars");
    });
  });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Contact Form Submission with Animation
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Add loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      submitBtn.style.background =
        "linear-gradient(135deg, #28a745 0%, #20c997 100%)";

      alert(
        `Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`,
      );

      // Reset form
      setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
}

// Newsletter Form
// const newsletterForm = document.querySelector(".newsletter-form");
// if (newsletterForm) {
//   newsletterForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const input = newsletterForm.querySelector('input[type="email"]');
//     const email = input.value;

//     alert(`Thank you for subscribing with ${email}!`);
//     input.value = "";
//   });
// }

// Enhanced Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector(".header");

// Consolidated Scroll Handler
function handleScroll() {
  const currentScroll = window.pageYOffset;

  if (header) {
    if (currentScroll > 100) {
      header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.3)";
      header.style.padding = "0";
    } else {
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    }
  }

  // Back to Top visibility
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    if (currentScroll > 500) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  }

  // Parallax effect on hero
  const hero = document.querySelector(".hero");
  if (hero && currentScroll < hero.offsetHeight) {
    const heroBackground = hero.querySelector(".hero-background img");
    if (heroBackground) {
      heroBackground.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
  }

  // Active Navigation Link on Scroll
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute("id");

    // Check both desktop and mobile nav
    const desktopLink = document.querySelector(
      `.desktop-nav a[href="#${sectionId}"]`,
    );
    const mobileLink = document.querySelector(
      `.mobile-nav a[href="#${sectionId}"]`,
    );

    if (
      currentScroll > sectionTop &&
      currentScroll <= sectionTop + sectionHeight
    ) {
      if (desktopLink) {
        document.querySelectorAll(".desktop-nav a").forEach((link) => {
          link.style.color = "";
        });
        desktopLink.style.color = "#fffaeb";
      }
      if (mobileLink) {
        document.querySelectorAll(".mobile-nav a").forEach((link) => {
          link.style.color = "";
        });
        mobileLink.style.color = "#fffaeb";
      }
    }
  });

  lastScroll = currentScroll;
}

window.addEventListener("scroll", handleScroll);

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      // Add stagger effect for multiple elements
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.1}s`;
    }
  });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll(
  ".feature-card, .level-card, .value-card, .leadership-card, .blog-card, .info-card",
);

animatedElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(el);
});

// Back to Top Button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Scroll Indicator Click
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) {
  scrollIndicator.addEventListener("click", () => {
    const featuresSection = document.querySelector(".features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// Pause slider on hover
const sliderTrack = document.querySelector(".slider-track");
if (sliderTrack) {
  sliderTrack.addEventListener("mouseenter", () => {
    sliderTrack.style.animationPlayState = "paused";
  });

  sliderTrack.addEventListener("mouseleave", () => {
    sliderTrack.style.animationPlayState = "running";
  });
}

// Counter Animation for Statistics (if you want to add them)
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.floor(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// Form Input Animation
const formInputs = document.querySelectorAll(
  ".form-group input, .form-group textarea",
);
formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.parentElement.classList.remove("focused");
    }
  });
});

// Add ripple effect to buttons
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  ripple.style.width = ripple.style.height = `${diameter}px`;
  ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;
  ripple.classList.add("ripple");

  const existingRipple = button.getElementsByClassName("ripple")[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(ripple);
}

const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", createRipple);
});

// Add hover effect to cards
const cards = document.querySelectorAll(
  ".feature-card, .level-card, .blog-card, .value-card, .leadership-card",
);
cards.forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.setProperty("--mouse-x", `${x}px`);
    this.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Add loading animation on page load
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Animate hero text elements sequentially
  const heroElements = document.querySelectorAll(".hero-text > *");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Prevent flash of unstyled content
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth reveal animation
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Add mouse follow effect to large screens
if (window.innerWidth > 1024) {
  let mouseX = 0;
  let mouseY = 0;
  let ballX = 0;
  let ballY = 0;
  let speed = 0.2;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    let distX = mouseX - ballX;
    let distY = mouseY - ballY;

    ballX += distX * speed;
    ballY += distY * speed;

    requestAnimationFrame(animate);
  }

  animate();
}

// Blog read more links animation
const readMoreLinks = document.querySelectorAll(".blog-read-more");
readMoreLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Add your blog detail page logic here
    console.log("Read more clicked");
  });
});

// Add year to footer automatically
const currentYear = new Date().getFullYear();
const footerText = document.querySelector(".footer-bottom p");
if (footerText) {
  footerText.textContent = `© ${currentYear} Arya Vaidic Sr. Sec. School. All rights reserved.`;
}

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
  // Your scroll logic here
}, 10);

window.addEventListener("scroll", debouncedScroll);

console.log("Excellence School website loaded successfully! 🎓");
console.log("Enjoy the modern animations and interactive features! ✨");


// window.onload = function () {
//   if (sessionStorage.getItem("adShown")) {
//     document.getElementById("ad-popup").style.display = "none";
//   }
// };

// function closeAd() {
//   document.getElementById("ad-popup").style.display = "none";
//   sessionStorage.setItem("adShown", "true");
// }


// function closeAd() {
//   document.getElementById("ad-popup").style.display = "none";
// }

function closeAd() {
  const ad = document.getElementById("ad-popup");
  ad.classList.add("fade-out");

  setTimeout(() => {
    ad.style.display = "none";
  }, 300); // matches animation duration
}

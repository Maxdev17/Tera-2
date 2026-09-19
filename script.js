// ================================
// SCROLL PROGRESS BAR
// ================================
const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = progress + "%";
});

// ================================
// NAVBAR — SCROLL + ACTIVE LINKS
// ================================
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  // Scrolled class for background
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link based on current section
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ================================
// HAMBURGER MENU
// ================================
const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinksMenu.classList.toggle("open");
});

// Close menu when a link is clicked
navLinksMenu.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinksMenu.classList.remove("open");
  });
});

// ================================
// REVEAL ON SCROLL
// ================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ================================
// ANIMATED NUMBER COUNTERS
// ================================
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((el) => {
  counterObserver.observe(el);
});

// ================================
// PRODUCT TABS
// ================================
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-tab");

    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + target).classList.add("active");

    // Re-trigger reveal animations for newly shown cards
    document.querySelectorAll("#tab-" + target + " .reveal").forEach((el) => {
      el.classList.remove("visible");
      setTimeout(() => {
        const delay = el.getAttribute("data-delay") || 0;
        setTimeout(() => {
          el.classList.add("visible");
        }, parseInt(delay));
      }, 50);
    });
  });
});

// ================================
// PRODUCT ORDER BUTTON PRESELECTION
// ================================
document
  .querySelectorAll(".product-order-btn, .session-order-btn")
  .forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const product = btn.getAttribute("data-product");
      const select = document.getElementById("order-product");
      if (select && product) {
        Array.from(select.options).forEach((option) => {
          if (option.value === product) {
            option.selected = true;
          }
        });
      }
    });
  });

// ================================
// LIGHTBOX
// ================================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".testimonial-img-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector(".testimonial-img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }
});

// ================================
// ORDER FORM — WHATSAPP + EMAIL
// ================================
const whatsappBtn = document.getElementById("whatsappBtn");
const emailBtn = document.getElementById("emailBtn");

function getFormData() {
  return {
    product: document.getElementById("order-product").value,
    name: document.getElementById("order-name").value.trim(),
    phone: document.getElementById("order-phone").value.trim(),
    location: document.getElementById("order-location").value.trim(),
    notes: document.getElementById("order-notes").value.trim(),
  };
}

function validateForm(data) {
  if (!data.product) {
    alert("Please select a product.");
    return false;
  }
  if (!data.name) {
    alert("Please enter your full name.");
    return false;
  }
  if (!data.phone) {
    alert("Please enter your phone number.");
    return false;
  }
  if (!data.location) {
    alert("Please enter your location.");
    return false;
  }
  return true;
}

whatsappBtn.addEventListener("click", () => {
  const data = getFormData();
  if (!validateForm(data)) return;

  const message =
    `Hello, I would like to place an order:%0A%0A` +
    `*Product:* ${data.product}%0A` +
    `*Name:* ${data.name}%0A` +
    `*Phone:* ${data.phone}%0A` +
    `*Location:* ${data.location}%0A` +
    `*Notes:* ${data.notes || "None"}`;

  window.open(`https://wa.me/2348139285443?text=${message}`, "_blank");
});

emailBtn.addEventListener("click", () => {
  const data = getFormData();
  if (!validateForm(data)) return;

  const subject = `OlyLife Order — ${data.product}`;
  const body =
    `Hello,%0A%0A` +
    `I would like to place an order:%0A%0A` +
    `Product: ${data.product}%0A` +
    `Name: ${data.name}%0A` +
    `Phone: ${data.phone}%0A` +
    `Location: ${data.location}%0A` +
    `Notes: ${data.notes || "None"}%0A%0A` +
    `Thank you.`;

  window.open(
    `mailto:imghealthnwealth@gmail.com?subject=${subject}&body=${body}`,
    "_blank",
  );
});

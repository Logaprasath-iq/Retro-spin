/**
 * RetroSpin - Core Interactive Scripts
 * Handles sticky navbar, mobile drawer, search modal, toast alerts, and wishlist modal.
 */

// ------------------------------------
// Toast Notification Engine
// ------------------------------------
function showNotification(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  let iconSvg = "";
  if (type === "success") {
    iconSvg = `<svg class="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === "error") {
    iconSvg = `<svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
  } else {
    iconSvg = `<svg class="w-5 h-5 text-[#C77945] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="text-sm font-medium flex-1">${message}</div>
    <button class="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-xs ml-2" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Global showToast alias
window.showToast = showNotification;

// ------------------------------------
// Global Form Validation Rules
// ------------------------------------
const ValidationRules = {
  isValidName(name) {
    if (!name || typeof name !== "string") return false;
    const trimmed = name.trim();
    // Must be at least 2 characters, only letters, spaces, hyphens, periods, apostrophes, NO NUMBERS
    if (trimmed.length < 2 || trimmed.length > 60) return false;
    return /^[A-Za-z\s.'-]{2,60}$/.test(trimmed) && !/\d/.test(trimmed);
  },

  isValidEmail(email) {
    if (!email || typeof email !== "string") return false;
    const trimmed = email.trim();
    // Rejects single-label domain like "ice@g", requires valid domain with at least 2 alpha characters in TLD
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
  },

  isValidPhone(phone) {
    if (!phone || typeof phone !== "string") return false;
    const trimmed = phone.trim();
    // Strictly rejects alphabets
    if (/[a-zA-Z]/.test(trimmed)) return false;
    const digitsOnly = trimmed.replace(/\D/g, "");
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  }
};
window.ValidationRules = ValidationRules;

// ------------------------------------
// Real-time Form Field Input Guards
// ------------------------------------
function setupFormFieldGuards() {
  // 1. Phone fields: Prevent typing or pasting alphabets
  const phoneInputs = document.querySelectorAll("input[type='tel'], input#contact-phone, input#cust-phone, input#customer-phone");
  phoneInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      const original = e.target.value;
      const sanitized = original.replace(/[^0-9+\s()-]/g, "");
      if (original !== sanitized) {
        e.target.value = sanitized;
      }
    });
  });

  // 2. Name fields: Prevent typing or pasting numbers
  const nameInputs = document.querySelectorAll("input#contact-name, input#cust-name, input#customer-name, input#review-author");
  nameInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      const original = e.target.value;
      const sanitized = original.replace(/[0-9]/g, "");
      if (original !== sanitized) {
        e.target.value = sanitized;
      }
    });
  });

  // 3. Email fields: Clean trailing spaces on blur
  const emailInputs = document.querySelectorAll("input[type='email']");
  emailInputs.forEach(input => {
    input.addEventListener("blur", (e) => {
      e.target.value = e.target.value.trim().toLowerCase();
    });
  });
}

// ------------------------------------
// Sticky Navbar Scroll Listener
// ------------------------------------
function setupStickyNavbar() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ------------------------------------
// Highlight Active Nav Link
// ------------------------------------
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  let page = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (!page || page === "") page = "index.html";

  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === page || (page === "product-details.html" && (href === "shop.html" || href === "equipment.html"))) {
      link.classList.add("text-[#C77945]", "dark:text-[#D7A45B]", "font-semibold");
      link.classList.remove("text-stone-700", "dark:text-stone-300");
    }
  });

  // Highlight Home parent dropdown if on index.html or home2.html
  if (page === "index.html" || page === "home2.html") {
    const homeDropdownBtn = document.querySelector(".home-dropdown-trigger");
    if (homeDropdownBtn) {
      homeDropdownBtn.classList.add("text-[#C77945]", "dark:text-[#D7A45B]", "font-semibold");
      homeDropdownBtn.classList.remove("text-stone-700", "dark:text-stone-300");
    }
  }
}

// ------------------------------------
// Mobile Navigation Drawer
// ------------------------------------
function setupMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-menu-drawer");
  const backdrop = document.getElementById("mobile-menu-backdrop");
  const closeBtn = document.getElementById("mobile-menu-close");

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove("translate-x-full", "-translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    if (isRtl) {
      drawer.classList.add("-translate-x-full");
    } else {
      drawer.classList.add("translate-x-full");
    }
    if (backdrop) backdrop.classList.add("hidden");
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  document.querySelectorAll("#mobile-menu-drawer a").forEach(a => {
    a.addEventListener("click", closeDrawer);
  });
}

// ------------------------------------
// Global Search Modal
// ------------------------------------
function setupSearchModal() {
  const modal = document.getElementById("search-modal");
  const openBtns = document.querySelectorAll(".search-modal-trigger");
  const closeBtn = document.getElementById("search-modal-close");
  const input = document.getElementById("global-search-input");
  const resultsContainer = document.getElementById("search-results-list");

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
      renderSearchResults("");
    }
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      openModal();
    }
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  if (input) {
    input.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });
  }

  function renderSearchResults(query) {
    if (!resultsContainer) return;
    const q = query.trim().toLowerCase();

    if (!q) {
      // Suggest featured items
      const featured = PRODUCTS.slice(0, 4);
      resultsContainer.innerHTML = `
        <div class="px-4 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">Popular Searches & Featured Items</div>
        <div class="space-y-1">
          ${featured.map(item => `
            <a href="product-details.html?id=${item.id}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition">
              <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded object-cover">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">${item.title}</div>
                <div class="text-xs text-stone-500">${item.type === 'vinyl' ? item.artist : item.brand} • ${item.type.toUpperCase()}</div>
              </div>
              <div class="text-sm font-semibold text-[#C77945]">${formatPriceINR(item.price)}</div>
            </a>
          `).join('')}
        </div>
      `;
      return;
    }

    const matches = PRODUCTS.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        (p.artist && p.artist.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.genre && p.genre.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      );
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="text-center py-10">
          <p class="text-stone-500 dark:text-stone-400 text-sm">No records or equipment found matching "<span class="font-semibold">${query}</span>"</p>
          <a href="shop.html" class="mt-3 inline-block text-xs font-medium text-[#C77945] hover:underline">Explore full vinyl catalog &rarr;</a>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="px-4 py-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">Found ${matches.length} Results</div>
      <div class="space-y-1 max-h-96 overflow-y-auto">
        ${matches.map(item => `
          <a href="product-details.html?id=${item.id}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition">
            <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded object-cover">
            <div class="flex-1 min-w-0">
              <div class="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">${item.title}</div>
              <div class="text-xs text-stone-500">${item.type === 'vinyl' ? (item.artist + ' • ' + item.genre) : (item.brand + ' • ' + item.category)}</div>
            </div>
            <div class="text-right">
              <div class="text-sm font-bold text-[#C77945]">${formatPriceINR(item.price)}</div>
              <span class="text-[10px] uppercase px-1.5 py-0.5 rounded ${item.type === 'vinyl' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400' : 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'}">${item.type}</span>
            </div>
          </a>
        `).join('')}
      </div>
    `;
  }
}

// ------------------------------------
// Global Wishlist Quick Modal
// ------------------------------------
function setupWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  const openBtns = document.querySelectorAll(".wishlist-modal-trigger");
  const closeBtn = document.getElementById("wishlist-modal-close");
  const listContainer = document.getElementById("wishlist-items-list");

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
    renderWishlist();
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  openBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("wishlist:updated", () => {
    if (!modal.classList.contains("hidden")) {
      renderWishlist();
    }
  });

  function renderWishlist() {
    if (!listContainer) return;
    const wishlistIds = getWishlist();

    if (wishlistIds.length === 0) {
      listContainer.innerHTML = `
        <div class="text-center py-12 px-4">
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </div>
          <h4 class="font-serif-vintage text-lg font-bold text-stone-800 dark:text-stone-200">Your Wishlist is Empty</h4>
          <p class="text-xs text-stone-500 mt-1 max-w-xs mx-auto">Explore our vintage vinyl library and mark your favorite grails for later.</p>
          <a href="shop.html" class="mt-4 btn-primary text-xs px-5 py-2.5">Explore Vinyl Records</a>
        </div>
      `;
      return;
    }

    const items = wishlistIds.map(id => getProductById(id)).filter(Boolean);

    listContainer.innerHTML = `
      <div class="space-y-3 max-h-96 overflow-y-auto pr-1">
        ${items.map(item => `
          <div class="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200/60 dark:border-stone-700/60">
            <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-lg object-cover">
            <div class="flex-1 min-w-0">
              <a href="product-details.html?id=${item.id}" class="font-medium text-sm text-stone-900 dark:text-stone-100 hover:text-[#C77945] truncate block">${item.title}</a>
              <div class="text-xs text-stone-500">${item.type === 'vinyl' ? item.artist : item.brand}</div>
              <div class="text-sm font-bold text-[#C77945] mt-0.5">${formatPriceINR(item.price)}</div>
            </div>
            <div class="flex flex-col gap-1 items-end">
              <button onclick="addToCart('${item.id}'); toggleWishlist('${item.id}');" class="btn-primary text-xs px-3 py-1.5 whitespace-nowrap">Move to Cart</button>
              <button onclick="toggleWishlist('${item.id}')" class="text-[11px] text-stone-400 hover:text-rose-500 transition">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// ------------------------------------
// Newsletter Form Handlers
// ------------------------------------
function setupNewsletterForms() {
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input) {
        const email = input.value.trim();
        if (!ValidationRules.isValidEmail(email)) {
          showNotification("Please enter a valid email address with a domain extension (e.g. name@example.com).", "error");
          input.focus();
          return;
        }
        showNotification(`Thank you! You've joined the RetroSpin Collector's Circle with ${email}.`, "success");
        input.value = "";
      }
    });
  });
}

// ------------------------------------
// FAQ Accordion Engine
// ------------------------------------
function setupFaqAccordions() {
  document.querySelectorAll(".faq-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-accordion-item");
      if (!item) return;
      const content = item.querySelector(".faq-content");
      const arrow = item.querySelector(".faq-arrow-icon");
      
      const isExpanded = content && !content.classList.contains("hidden");
      
      if (isExpanded) {
        content.classList.add("hidden");
        if (arrow) arrow.classList.remove("rotate-180");
        btn.setAttribute("aria-expanded", "false");
      } else {
        content.classList.remove("hidden");
        if (arrow) arrow.classList.add("rotate-180");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ------------------------------------
// Animated Number Counters (e.g. 2,500+, 100%, ₹0)
// ------------------------------------
function setupCounterAnimations() {
  const counters = document.querySelectorAll(".stat-counter");
  if (!counters.length) return;

  const animateCounter = (el) => {
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const target = parseFloat(el.getAttribute("data-target") || "0");
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * ease;

      let formattedNumber;
      if (decimals > 0) {
        formattedNumber = currentVal.toFixed(decimals);
      } else {
        formattedNumber = Math.round(currentVal).toLocaleString();
      }

      el.textContent = `${prefix}${formattedNumber}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        const finalFormatted = decimals > 0 ? target.toFixed(decimals) : Math.round(target).toLocaleString();
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(animateCounter);
  }
}

// ------------------------------------
// Scroll Reveal Micro-Animations
// ------------------------------------
function setupScrollReveal() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  if (!elements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add("is-visible"));
  }
}

// ------------------------------------
// Home 2 Audition Booking Form Handler
// ------------------------------------
function setupAuditionBookingForm() {
  const form = document.getElementById("audition-booking-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = form.querySelector("#audition-name");
    const emailInput = form.querySelector("#audition-email");
    const phoneInput = form.querySelector("#audition-phone");
    const suiteSelect = form.querySelector("#audition-suite");

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";
    const suiteName = suiteSelect?.options[suiteSelect.selectedIndex]?.text || "Listening Suite";

    if (!ValidationRules.isValidName(name)) {
      showNotification("Please enter a valid full name (minimum 2 letters, no numbers allowed).", "error");
      nameInput?.focus();
      return;
    }

    if (!ValidationRules.isValidEmail(email)) {
      showNotification("Please enter a valid email address with a domain extension (e.g. name@example.com).", "error");
      emailInput?.focus();
      return;
    }

    if (!ValidationRules.isValidPhone(phone)) {
      showNotification("Please enter a valid phone number (10 digits, numbers only).", "error");
      phoneInput?.focus();
      return;
    }

    showNotification(`Audition session reserved! We look forward to welcoming you to ${suiteName.split('—')[0].trim()} at RetroSpin Chennai.`, "success");
    form.reset();
  });
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setupStickyNavbar();
  highlightActiveNav();
  setupMobileMenu();
  setupSearchModal();
  setupWishlistModal();
  setupNewsletterForms();
  setupFaqAccordions();
  setupCounterAnimations();
  setupScrollReveal();
  setupFormFieldGuards();
  setupAuditionBookingForm();
});

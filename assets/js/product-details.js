/**
 * RetroSpin - Product Details Dynamic Engine
 * Parses ?id= from URL, renders specifications, tracklists, gallery,
 * reviews, related products, and recently viewed products.
 */

const RECENT_STORAGE_KEY = "retrospin_recent";

function getUrlParameter(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function recordRecentlyViewed(productId) {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) || "[]");
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    if (recent.length > 6) recent = recent.slice(0, 6);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recent));
  } catch (e) {}
}

function getRecentlyViewed() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_STORAGE_KEY) || "[]");
  } catch (e) {
    return [];
  }
}

function initProductDetailsPage() {
  let productId = getUrlParameter("id");
  let product = productId ? getProductById(productId) : null;

  // Fallback to first item if none found
  if (!product) {
    product = PRODUCTS[0];
  }

  recordRecentlyViewed(product.id);
  renderProductDetails(product);
  renderRelatedProducts(product);
  renderRecentlyViewedSection(product.id);
}

function renderProductDetails(product) {
  document.title = `${product.title} — RetroSpin`;

  // Breadcrumbs
  const breadcrumbCategory = document.getElementById("pd-breadcrumb-category");
  const breadcrumbTitle = document.getElementById("pd-breadcrumb-title");
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = product.type === "vinyl" ? "Vinyl Records" : "Audio Equipment";
    breadcrumbCategory.href = product.type === "vinyl" ? "shop.html" : "equipment.html";
  }
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.title;

  // Primary Image & Gallery
  const primaryImg = document.getElementById("pd-primary-image");
  const galleryThumbs = document.getElementById("pd-gallery-thumbnails");

  if (primaryImg) {
    primaryImg.src = product.image;
    primaryImg.alt = product.title;
  }

  if (galleryThumbs) {
    const images = product.gallery && product.gallery.length ? product.gallery : [product.image];
    galleryThumbs.innerHTML = images.map((imgUrl, idx) => `
      <button type="button" class="pd-thumb-btn w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 ${idx === 0 ? 'border-[#C77945]' : 'border-transparent'} hover:border-[#D7A45B] transition shrink-0" data-img="${imgUrl}">
        <img src="${imgUrl}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-cover">
      </button>
    `).join('');

    galleryThumbs.querySelectorAll(".pd-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        galleryThumbs.querySelectorAll(".pd-thumb-btn").forEach(b => b.classList.replace("border-[#C77945]", "border-transparent"));
        btn.classList.replace("border-transparent", "border-[#C77945]");
        if (primaryImg) primaryImg.src = btn.getAttribute("data-img");
      });
    });
  }

  // Badges & Headers
  const badgeContainer = document.getElementById("pd-badge-container");
  if (badgeContainer) {
    badgeContainer.innerHTML = `
      <span class="px-3 py-1 rounded-full text-xs font-semibold badge-gold">${product.badge || 'Collector Grade'}</span>
      <span class="px-3 py-1 rounded-full text-xs font-semibold bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">${product.condition}</span>
      ${product.inStock ? '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">In Stock</span>' : '<span class="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">Sold Out</span>'}
    `;
  }

  const titleEl = document.getElementById("pd-title");
  const subtitleEl = document.getElementById("pd-subtitle");
  if (titleEl) titleEl.textContent = product.title;
  if (subtitleEl) {
    subtitleEl.textContent = product.type === "vinyl" ? `By ${product.artist} • Released ${product.releaseYear} • ${product.genre}` : `By ${product.brand} • ${product.category}`;
  }

  // Ratings
  const ratingEl = document.getElementById("pd-rating");
  const reviewsCountEl = document.getElementById("pd-review-count");
  if (ratingEl) ratingEl.textContent = product.rating.toFixed(1);
  if (reviewsCountEl) reviewsCountEl.textContent = `(${product.reviewCount} customer reviews)`;

  // Pricing
  const priceEl = document.getElementById("pd-price");
  const origPriceEl = document.getElementById("pd-original-price");
  const discountPillEl = document.getElementById("pd-discount-pill");

  if (priceEl) priceEl.textContent = formatPriceINR(product.price);
  if (origPriceEl && product.originalPrice) {
    origPriceEl.textContent = formatPriceINR(product.originalPrice);
  }
  if (discountPillEl && product.originalPrice) {
    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    discountPillEl.textContent = `SAVE ${pct}%`;
  }

  // Description
  const descEl = document.getElementById("pd-description");
  if (descEl) descEl.textContent = product.description;

  // Dynamic Specs or Tracklist
  const detailsTabContent = document.getElementById("pd-tab-details");
  if (detailsTabContent) {
    if (product.type === "vinyl") {
      detailsTabContent.innerHTML = `
        <div class="space-y-6">
          <div class="bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200 dark:border-stone-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span class="text-stone-500 block">Speed</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.speed || '33 1/3 RPM'}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Weight</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.weight || '180g Vinyl'}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Condition</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.condition}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Genre</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.genre}</span>
            </div>
          </div>

          <div>
            <h4 class="font-serif-vintage text-lg font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-[#C77945]" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#FAF5EB"/></svg>
              Complete Vinyl Tracklist
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${(product.tracklist || []).map(sideObj => `
                <div class="p-4 rounded-xl bg-white dark:bg-[#201D19] border border-stone-200 dark:border-stone-800 shadow-sm">
                  <div class="font-bold text-sm text-[#C77945] pb-2 border-b border-stone-100 dark:border-stone-800 uppercase tracking-wider">${sideObj.side}</div>
                  <ul class="divide-y divide-stone-100 dark:divide-stone-800 mt-2 text-xs">
                    ${sideObj.tracks.map(t => `<li class="py-2 text-stone-700 dark:text-stone-300">${t}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>

          ${product.pressInfo ? `
            <div class="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
              <strong class="block mb-1 font-semibold uppercase tracking-wider">Pressing & Mastering Heritage:</strong>
              ${product.pressInfo}
            </div>
          ` : ''}
        </div>
      `;
    } else {
      // Equipment Specs
      detailsTabContent.innerHTML = `
        <div class="space-y-6">
          <div class="bg-stone-50 dark:bg-stone-800/40 p-4 rounded-xl border border-stone-200 dark:border-stone-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span class="text-stone-500 block">Brand</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.brand}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Category</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.category}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Condition</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">${product.condition}</span>
            </div>
            <div>
              <span class="text-stone-500 block">Warranty</span>
              <span class="font-bold text-stone-900 dark:text-stone-100">1 Year Comprehensive</span>
            </div>
          </div>

          <div>
            <h4 class="font-serif-vintage text-lg font-bold text-stone-900 dark:text-stone-100 mb-3">Technical Specifications</h4>
            <div class="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-[#201D19]">
              <table class="w-full text-xs divide-y divide-stone-100 dark:divide-stone-800">
                ${Object.entries(product.specs || {}).map(([key, val]) => `
                  <tr class="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition">
                    <td class="px-4 py-3 font-semibold text-stone-600 dark:text-stone-400 w-1/3 bg-stone-50/50 dark:bg-stone-800/30">${key}</td>
                    <td class="px-4 py-3 text-stone-900 dark:text-stone-100 font-medium">${val}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Buttons & Quantity
  const qtyInput = document.getElementById("pd-quantity");
  const qtyDecBtn = document.getElementById("pd-qty-dec");
  const qtyIncBtn = document.getElementById("pd-qty-inc");
  const addToCartBtn = document.getElementById("pd-add-to-cart-btn");
  const wishlistBtn = document.getElementById("pd-wishlist-btn");

  if (qtyDecBtn && qtyInput) {
    qtyDecBtn.onclick = () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = val - 1;
    };
  }
  if (qtyIncBtn && qtyInput) {
    qtyIncBtn.onclick = () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    };
  }

  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      const q = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
      addToCart(product.id, q);
    };
  }

  if (wishlistBtn) {
    updateWishlistButtonState(wishlistBtn, product.id);
    wishlistBtn.onclick = () => {
      toggleWishlist(product.id);
      updateWishlistButtonState(wishlistBtn, product.id);
    };
  }

  // Review submission
  const reviewForm = document.getElementById("pd-review-form");
  if (reviewForm) {
    reviewForm.onsubmit = (e) => {
      e.preventDefault();
      const authorInput = reviewForm.querySelector("#review-author");
      const name = authorInput?.value.trim();
      const text = reviewForm.querySelector("#review-comment")?.value.trim();
      if (!name || !text) {
        showNotification("Please provide both your name and review remarks.", "error");
        return;
      }

      if (name.length < 2 || !/^[A-Za-z\s.'-]{2,50}$/.test(name) || /\d/.test(name)) {
        showNotification("Please enter a valid name (minimum 2 letters, no numbers allowed).", "error");
        authorInput?.focus();
        return;
      }

      const reviewsList = document.getElementById("pd-reviews-list");
      if (reviewsList) {
        const newReview = document.createElement("div");
        newReview.className = "p-4 rounded-xl bg-white dark:bg-[#201D19] border border-stone-200 dark:border-stone-800 shadow-sm space-y-2";
        newReview.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-bold text-sm text-stone-900 dark:text-stone-100">${name}</span>
            <span class="text-xs text-stone-400">Just now • Verified Buyer</span>
          </div>
          <div class="text-amber-500 text-xs">★★★★★</div>
          <p class="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">${text}</p>
        `;
        reviewsList.prepend(newReview);
      }

      reviewForm.reset();
      showNotification("Thank you! Your verified review has been posted.", "success");
    };
  }
}

function updateWishlistButtonState(btn, productId) {
  const isWish = isInWishlist(productId);
  const heartPath = btn.querySelector("svg path");
  if (isWish) {
    btn.classList.add("is-active", "border-rose-500", "text-rose-500");
    btn.setAttribute("data-wishlist-active", "true");
    if (heartPath) heartPath.setAttribute("fill", "#E11D48");
  } else {
    btn.classList.remove("is-active", "border-rose-500", "text-rose-500");
    btn.setAttribute("data-wishlist-active", "false");
    if (heartPath) heartPath.setAttribute("fill", "none");
  }
}

// ------------------------------------
// Related Products
// ------------------------------------
function renderRelatedProducts(currentProduct) {
  const container = document.getElementById("pd-related-grid");
  if (!container) return;

  let related = PRODUCTS.filter(p => p.id !== currentProduct.id && (p.type === currentProduct.type || p.genre === currentProduct.genre));
  if (related.length < 4) {
    related = PRODUCTS.filter(p => p.id !== currentProduct.id);
  }
  related = related.slice(0, 4);

  container.innerHTML = related.map(item => `
    <div class="product-card rounded-2xl overflow-hidden flex flex-col justify-between group p-3.5">
      <div>
        <div class="relative overflow-hidden rounded-xl aspect-square bg-stone-100 dark:bg-stone-800 mb-3">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
          <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full badge-gold">${item.badge || 'Vintage'}</span>
          <button type="button" onclick="event.stopPropagation(); toggleWishlist('${item.id}')" data-wishlist-id="${item.id}" class="wishlist-btn absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition" title="Add to Wishlist">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          </button>
        </div>
        <a href="product-details.html?id=${item.id}" class="font-serif-vintage font-bold text-sm text-stone-900 dark:text-stone-100 hover:text-[#C77945] block truncate">${item.title}</a>
        <p class="text-xs text-stone-500 truncate mt-0.5">${item.type === 'vinyl' ? item.artist : item.brand}</p>
      </div>
      <div class="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <span class="text-sm font-bold text-[#C77945]">${formatPriceINR(item.price)}</span>
        <button onclick="addToCart('${item.id}')" class="btn-primary text-xs px-3 py-1.5">Add</button>
      </div>
    </div>
  `).join('');

  if (typeof updateWishlistButtons === 'function') {
    updateWishlistButtons();
  }
}

// ------------------------------------
// Recently Viewed Products
// ------------------------------------
function renderRecentlyViewedSection(currentId) {
  const container = document.getElementById("pd-recent-grid");
  const wrapper = document.getElementById("pd-recent-wrapper");
  if (!container || !wrapper) return;

  const recentIds = getRecentlyViewed().filter(id => id !== currentId);
  if (recentIds.length === 0) {
    wrapper.classList.add("hidden");
    return;
  }

  wrapper.classList.remove("hidden");
  const items = recentIds.map(id => getProductById(id)).filter(Boolean).slice(0, 4);

  container.innerHTML = items.map(item => `
    <a href="product-details.html?id=${item.id}" class="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#201D19] border border-stone-200 dark:border-stone-800 hover:border-[#D7A45B] transition shadow-sm">
      <img src="${item.image}" alt="${item.title}" class="w-14 h-14 rounded-lg object-cover">
      <div class="flex-1 min-w-0">
        <h5 class="font-medium text-xs text-stone-900 dark:text-stone-100 truncate">${item.title}</h5>
        <div class="text-[11px] text-stone-500">${item.type === 'vinyl' ? item.artist : item.brand}</div>
        <div class="text-xs font-bold text-[#C77945] mt-0.5">${formatPriceINR(item.price)}</div>
      </div>
    </a>
  `).join('');
}

document.addEventListener("DOMContentLoaded", initProductDetailsPage);

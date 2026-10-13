/**
 * RetroSpin - Cart & Wishlist Storage Engine
 * Manages shopping cart, wishlist, coupon codes, and local persistence.
 */

const CART_STORAGE_KEY = "retrospin_cart";
const WISHLIST_STORAGE_KEY = "retrospin_wishlist";
const COUPON_STORAGE_KEY = "retrospin_applied_coupon";

// Coupon definitions
const VALID_COUPONS = {
  "RETRO10": { code: "RETRO10", type: "percent", value: 10, minSpend: 0, description: "10% off entire order" },
  "VINYL20": { code: "VINYL20", type: "percent", value: 20, minSpend: 5000, description: "20% off orders above ₹5,000" },
  "VINTAGE500": { code: "VINTAGE500", type: "flat", value: 500, minSpend: 2500, description: "₹500 flat off orders above ₹2,500" }
};

// ------------------------------------
// Cart Operations
// ------------------------------------
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart } }));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
}

function addToCart(productId, quantity = 1, showToast = true) {
  const product = getProductById(productId);
  if (!product) {
    console.warn("Product not found:", productId);
    return false;
  }

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity: Math.max(1, quantity),
      addedAt: new Date().toISOString()
    });
  }

  saveCart(cart);

  if (showToast && typeof showNotification === "function") {
    showNotification(`Added "${product.title}" to your cart!`, "success");
  }
  return true;
}

function updateCartQuantity(productId, quantity) {
  let cart = getCart();
  const qty = parseInt(quantity, 10);

  if (qty <= 0) {
    removeFromCart(productId);
    return;
  }

  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = qty;
    saveCart(cart);
  }
}

function removeFromCart(productId, showToast = true) {
  let cart = getCart();
  const product = getProductById(productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);

  if (showToast && typeof showNotification === "function" && product) {
    showNotification(`Removed "${product.title}" from cart.`, "info");
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  localStorage.removeItem(COUPON_STORAGE_KEY);
  updateCartBadges();
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: [] } }));
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

// ------------------------------------
// Totals & Pricing Calculations
// ------------------------------------
function calculateCartTotals() {
  const cart = getCart();
  let subtotal = 0;
  let itemCount = 0;

  const detailedItems = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return null;
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    itemCount += item.quantity;
    return {
      ...item,
      product,
      itemTotal
    };
  }).filter(Boolean);

  // Coupons
  let discount = 0;
  let appliedCoupon = getAppliedCoupon();

  if (appliedCoupon && VALID_COUPONS[appliedCoupon]) {
    const coupon = VALID_COUPONS[appliedCoupon];
    if (subtotal >= coupon.minSpend) {
      if (coupon.type === "percent") {
        discount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.type === "flat") {
        discount = Math.min(coupon.value, subtotal);
      }
    } else {
      // Not meeting minimum spend
      removeCoupon();
      appliedCoupon = null;
    }
  }

  // Shipping policy: Free for orders ₹4,999+, otherwise ₹250 flat standard insured rate
  const shipping = subtotal === 0 ? 0 : (subtotal >= 4999 ? 0 : 250);
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    items: detailedItems,
    itemCount,
    subtotal,
    discount,
    appliedCoupon,
    shipping,
    total
  };
}

function applyCoupon(code) {
  const cleanCode = (code || "").trim().toUpperCase();
  if (!VALID_COUPONS[cleanCode]) {
    return { success: false, message: "Invalid coupon code. Try 'RETRO10' or 'VINYL20'." };
  }

  const totals = calculateCartTotals();
  const coupon = VALID_COUPONS[cleanCode];

  if (totals.subtotal < coupon.minSpend) {
    return { 
      success: false, 
      message: `Coupon requires minimum order of ₹${coupon.minSpend.toLocaleString('en-IN')}.` 
    };
  }

  localStorage.setItem(COUPON_STORAGE_KEY, cleanCode);
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: getCart() } }));
  return { 
    success: true, 
    message: `Coupon '${cleanCode}' applied! Saved ${coupon.description}.` 
  };
}

function removeCoupon() {
  localStorage.removeItem(COUPON_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: getCart() } }));
}

function getAppliedCoupon() {
  return localStorage.getItem(COUPON_STORAGE_KEY) || null;
}

// ------------------------------------
// Wishlist Operations
// ------------------------------------
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadges();
    updateWishlistButtons();
    window.dispatchEvent(new CustomEvent("wishlist:updated", { detail: { wishlist: list } }));
  } catch (e) {
    console.error("Error saving wishlist", e);
  }
}

function isInWishlist(productId) {
  const list = getWishlist();
  return list.includes(productId);
}

function toggleWishlist(productId) {
  let list = getWishlist();
  const product = getProductById(productId);
  let added = false;

  if (list.includes(productId)) {
    list = list.filter(id => id !== productId);
    if (typeof showNotification === "function" && product) {
      showNotification(`Removed "${product.title}" from your wishlist.`, "info");
    }
  } else {
    list.push(productId);
    added = true;
    if (typeof showNotification === "function" && product) {
      showNotification(`Added "${product.title}" to your wishlist!`, "success");
    }
  }

  saveWishlist(list);
  updateWishlistButtons();
  return added;
}

// ------------------------------------
// Badge & Button Updates
// ------------------------------------
function updateCartBadges() {
  const count = getCartCount();
  const badges = document.querySelectorAll(".cart-count-badge");
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

function updateWishlistBadges() {
  const list = getWishlist();
  const count = list.length;
  const badges = document.querySelectorAll(".wishlist-count-badge");
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  });
}

function updateWishlistButtons() {
  const wishlist = getWishlist();
  const buttons = document.querySelectorAll("[data-wishlist-id], button[onclick*='toggleWishlist'], .wishlist-btn");

  buttons.forEach(btn => {
    let id = btn.getAttribute("data-wishlist-id");
    if (!id) {
      const onclickAttr = btn.getAttribute("onclick") || "";
      const match = onclickAttr.match(/toggleWishlist\(['"]([^'"]+)['"]\)/);
      if (match) {
        id = match[1];
        btn.setAttribute("data-wishlist-id", id);
      }
    }
    if (!id) return;

    btn.classList.add("wishlist-btn");
    const inWish = wishlist.includes(id);
    const heartPath = btn.querySelector("svg path");
    const heartSvg = btn.querySelector("svg");

    if (inWish) {
      btn.classList.add("is-active");
      btn.setAttribute("data-wishlist-active", "true");
      btn.setAttribute("title", "Remove from Wishlist");
      btn.setAttribute("aria-label", "Remove from Wishlist");
      if (heartPath) heartPath.setAttribute("fill", "currentColor");
      if (heartSvg) {
        heartSvg.setAttribute("fill", "currentColor");
        heartSvg.classList.add("text-rose-600", "dark:text-rose-400");
      }
    } else {
      btn.classList.remove("is-active");
      btn.setAttribute("data-wishlist-active", "false");
      btn.setAttribute("title", "Add to Wishlist");
      btn.setAttribute("aria-label", "Add to Wishlist");
      if (heartPath) heartPath.setAttribute("fill", "none");
      if (heartSvg) {
        heartSvg.setAttribute("fill", "none");
        heartSvg.classList.remove("text-rose-600", "dark:text-rose-400");
      }
    }
  });
}
window.updateWishlistButtons = updateWishlistButtons;

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  updateCartBadges();
  updateWishlistBadges();
  updateWishlistButtons();
});

window.addEventListener("wishlist:updated", () => {
  updateWishlistButtons();
});

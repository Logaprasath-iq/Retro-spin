/**
 * RetroSpin - Orders & Checkout Engine
 * Manages shopping bag rendering, coupon discounts, checkout validation,
 * sample order creation, localStorage persistence, and order history management.
 */

const ORDERS_STORAGE_KEY = "retrospin_orders";

// Initial sample orders for realistic demo feel
const DEFAULT_SAMPLE_ORDERS = [
  {
    id: "RS-ORD-91024",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: "Delivered",
    items: [
      { id: "vinyl-001", title: "Kind of Blue (180g Audiophile Pressing)", artist: "Miles Davis", price: 3499, quantity: 1, image: "https://i.pinimg.com/1200x/8d/74/a5/8d74a5f7b686207247eae84f6e292668.jpg" },
      { id: "eq-007", title: "Master Vinyl Care Kit (Anti-Static Brush & Cleaner)", artist: "RetroSpin Labs", price: 1899, quantity: 1, image: "https://i.pinimg.com/1200x/f2/da/70/f2da70ca61b60277c25887316ef64379.jpg" }
    ],
    subtotal: 5398,
    discount: 540,
    coupon: "RETRO10",
    shipping: 0,
    total: 4858,
    shippingInfo: {
      name: "Arjun Verma",
      email: "arjun.verma@example.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Vintage Groves, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      notes: "Please call on arrival, ring doorbell twice."
    },
    trackingNumber: "DEL-IND-9874129"
  },
  {
    id: "RS-ORD-92850",
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
    status: "Processing",
    items: [
      { id: "vinyl-002", title: "The Dark Side of the Moon (50th Anniversary Remaster)", artist: "Pink Floyd", price: 4199, quantity: 1, image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=800&q=80" }
    ],
    subtotal: 4199,
    discount: 0,
    coupon: null,
    shipping: 250,
    total: 4449,
    shippingInfo: {
      name: "Neha Sundaram",
      email: "neha.sundaram@example.com",
      phone: "+91 98111 22334",
      address: "12/A Indiranagar 100ft Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      notes: "Leave with security if not at home."
    },
    trackingNumber: "DEL-IND-9874831"
  }
];

// Initialize sample orders if empty
function getStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(DEFAULT_SAMPLE_ORDERS));
      return DEFAULT_SAMPLE_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return DEFAULT_SAMPLE_ORDERS;
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Error saving orders", e);
  }
}

// ------------------------------------
// Shopping Bag View Rendering
// ------------------------------------
function renderCartSection() {
  const cartContainer = document.getElementById("cart-items-container");
  const emptyContainer = document.getElementById("cart-empty-state");
  const checkoutContainer = document.getElementById("checkout-section-wrapper");
  const subtotalEl = document.getElementById("summary-subtotal");
  const discountEl = document.getElementById("summary-discount");
  const discountRow = document.getElementById("summary-discount-row");
  const couponTagEl = document.getElementById("summary-coupon-tag");
  const shippingEl = document.getElementById("summary-shipping");
  const totalEl = document.getElementById("summary-total");
  const itemCountBadge = document.getElementById("bag-items-count-badge");

  if (!cartContainer) return;

  const totals = calculateCartTotals();

  if (itemCountBadge) {
    itemCountBadge.textContent = `${totals.itemCount} ${totals.itemCount === 1 ? 'item' : 'items'}`;
  }

  if (totals.items.length === 0) {
    cartContainer.innerHTML = "";
    if (emptyContainer) emptyContainer.classList.remove("hidden");
    if (checkoutContainer) checkoutContainer.classList.add("hidden");
    return;
  }

  if (emptyContainer) emptyContainer.classList.add("hidden");
  if (checkoutContainer) checkoutContainer.classList.remove("hidden");

  // Render bag items
  cartContainer.innerHTML = totals.items.map(item => `
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#201D19] border border-stone-200/80 dark:border-stone-800 shadow-sm transition hover:border-[#D7A45B]/60">
      <div class="flex items-center gap-4 min-w-0">
        <a href="product-details.html?id=${item.product.id}" class="shrink-0 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-700 w-20 h-20 sm:w-24 sm:h-24 bg-stone-100 dark:bg-stone-800">
          <img src="${item.product.image}" alt="${item.product.title}" class="w-full h-full object-cover hover:scale-105 transition duration-300">
        </a>
        <div class="min-w-0">
          <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${item.product.type === 'vinyl' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400' : 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400'}">
            ${item.product.type === 'vinyl' ? item.product.genre : item.product.category}
          </span>
          <a href="product-details.html?id=${item.product.id}" class="block font-serif-vintage text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 hover:text-[#C77945] truncate mt-1">
            ${item.product.title}
          </a>
          <p class="text-xs text-stone-500 mt-0.5">${item.product.type === 'vinyl' ? item.product.artist : item.product.brand} • <span class="text-stone-600 dark:text-stone-400">${item.product.condition}</span></p>
          <div class="text-sm font-bold text-[#C77945] mt-1 sm:hidden">
            ${formatPriceINR(item.product.price)} each
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between w-full sm:w-auto gap-3 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800">
        <!-- Quantity control -->
        <div class="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg overflow-hidden bg-stone-50 dark:bg-stone-800">
          <button type="button" onclick="updateCartQuantity('${item.product.id}', ${item.quantity - 1})" class="px-3 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition font-bold" title="Decrease Quantity">&minus;</button>
          <span class="px-3 py-1 text-sm font-semibold text-stone-900 dark:text-stone-100 min-w-[32px] text-center">${item.quantity}</span>
          <button type="button" onclick="updateCartQuantity('${item.product.id}', ${item.quantity + 1})" class="px-3 py-1 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition font-bold" title="Increase Quantity">&plus;</button>
        </div>

        <!-- Total Price -->
        <div class="text-right">
          <div class="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100">${formatPriceINR(item.itemTotal)}</div>
          <div class="text-xs text-stone-400 hidden sm:block">${formatPriceINR(item.product.price)} each</div>
        </div>

        <!-- Remove -->
        <button type="button" onclick="removeFromCart('${item.product.id}')" class="text-stone-400 hover:text-rose-500 transition p-1" title="Remove Item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Update summary fields
  if (subtotalEl) subtotalEl.textContent = formatPriceINR(totals.subtotal);
  if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : formatPriceINR(totals.shipping);
  if (totalEl) totalEl.textContent = formatPriceINR(totals.total);

  if (totals.discount > 0) {
    if (discountRow) discountRow.classList.remove("hidden");
    if (discountEl) discountEl.textContent = `- ${formatPriceINR(totals.discount)}`;
    if (couponTagEl) couponTagEl.textContent = `Coupon: ${totals.appliedCoupon}`;
  } else {
    if (discountRow) discountRow.classList.add("hidden");
  }
}

// ------------------------------------
// Order History Rendering
// ------------------------------------
function renderOrderHistory() {
  const container = document.getElementById("order-history-list");
  const emptyState = document.getElementById("order-history-empty");
  if (!container) return;

  const orders = getStoredOrders();

  if (orders.length === 0) {
    container.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  container.innerHTML = orders.map(order => {
    let statusClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
    if (order.status === "Delivered") statusClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
    if (order.status === "Shipped") statusClass = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
    if (order.status === "Cancelled") statusClass = "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";

    const formattedDate = new Date(order.date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    const isCancelable = order.status === "Processing";

    return `
      <div class="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#201D19] p-5 sm:p-6 shadow-sm">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <div class="text-xs uppercase tracking-wider text-stone-500">Order Reference</div>
            <div class="font-mono font-bold text-base text-stone-900 dark:text-stone-100">${order.id}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-stone-500">Placed On</div>
            <div class="text-sm font-medium text-stone-700 dark:text-stone-300">${formattedDate}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-wider text-stone-500">Status</div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClass}">
              ${order.status}
            </span>
          </div>
          <div class="text-right">
            <div class="text-xs uppercase tracking-wider text-stone-500">Total Paid</div>
            <div class="font-serif-vintage text-lg font-bold text-[#C77945]">${formatPriceINR(order.total)}</div>
          </div>
        </div>

        <!-- Items preview -->
        <div class="py-4 space-y-3">
          ${order.items.map(item => `
            <div class="flex items-center gap-3">
              <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded-lg object-cover border border-stone-200 dark:border-stone-700">
              <div class="flex-1 min-w-0">
                <div class="font-medium text-sm text-stone-900 dark:text-stone-100 truncate">${item.title}</div>
                <div class="text-xs text-stone-500">Qty: ${item.quantity} • ${formatPriceINR(item.price)}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Bottom Controls -->
        <div class="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div class="text-stone-500">
            ${order.trackingNumber ? `Tracking No: <span class="font-mono text-stone-700 dark:text-stone-300">${order.trackingNumber}</span>` : 'Order logged in store history'}
          </div>
          <div class="flex items-center gap-2">
            <button onclick="viewOrderDetails('${order.id}')" class="btn-secondary px-4 py-1.5 text-xs">
              View Details
            </button>
            ${isCancelable ? `
              <button onclick="cancelSampleOrder('${order.id}')" class="px-3 py-1.5 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900 transition font-medium">
                Cancel Order
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ------------------------------------
// Order Details Modal
// ------------------------------------
function viewOrderDetails(orderId) {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById("order-details-modal");
  const content = document.getElementById("order-details-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="space-y-4">
      <div class="flex justify-between items-center pb-3 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h4 class="font-serif-vintage text-xl font-bold text-stone-900 dark:text-stone-100">${order.id}</h4>
          <p class="text-xs text-stone-500">Placed on ${new Date(order.date).toLocaleString('en-IN')}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : (order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800')}">
          ${order.status}
        </span>
      </div>

      <!-- Shipping address -->
      <div class="bg-stone-50 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200 dark:border-stone-700 text-xs space-y-1">
        <div class="font-bold text-stone-700 dark:text-stone-200 uppercase tracking-wide">Delivery Destination</div>
        <p class="font-medium text-stone-900 dark:text-stone-100 text-sm">${order.shippingInfo.name}</p>
        <p class="text-stone-600 dark:text-stone-400">${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${order.shippingInfo.pincode}</p>
        <p class="text-stone-600 dark:text-stone-400">Phone: ${order.shippingInfo.phone} | Email: ${order.shippingInfo.email}</p>
        ${order.shippingInfo.notes ? `<p class="italic text-stone-500 mt-1">Instructions: "${order.shippingInfo.notes}"</p>` : ''}
      </div>

      <!-- Items breakdown -->
      <div class="space-y-2">
        <div class="font-bold text-xs uppercase text-stone-500 tracking-wide">Items Purchased</div>
        ${order.items.map(item => `
          <div class="flex items-center justify-between text-sm py-1.5 border-b border-stone-100 dark:border-stone-800">
            <div>
              <span class="font-medium text-stone-900 dark:text-stone-100">${item.title}</span>
              <span class="text-xs text-stone-500 block">Qty: ${item.quantity}</span>
            </div>
            <span class="font-semibold text-stone-900 dark:text-stone-100">${formatPriceINR(item.price * item.quantity)}</span>
          </div>
        `).join('')}
      </div>

      <!-- Payment Breakdown -->
      <div class="space-y-1 text-xs pt-2 text-stone-600 dark:text-stone-400 border-t border-stone-200 dark:border-stone-800">
        <div class="flex justify-between">
          <span>Subtotal</span>
          <span class="font-medium text-stone-900 dark:text-stone-100">${formatPriceINR(order.subtotal)}</span>
        </div>
        ${order.discount > 0 ? `
          <div class="flex justify-between text-emerald-600">
            <span>Discount (${order.coupon || 'Promo'})</span>
            <span>- ${formatPriceINR(order.discount)}</span>
          </div>
        ` : ''}
        <div class="flex justify-between">
          <span>Shipping & Insured Delivery</span>
          <span class="font-medium text-stone-900 dark:text-stone-100">${order.shipping === 0 ? 'FREE' : formatPriceINR(order.shipping)}</span>
        </div>
        <div class="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-700">
          <span>Total Paid</span>
          <span class="text-[#C77945]">${formatPriceINR(order.total)}</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeOrderDetailsModal() {
  const modal = document.getElementById("order-details-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

// ------------------------------------
// Cancel Sample Order
// ------------------------------------
function cancelSampleOrder(orderId) {
  if (!confirm(`Are you sure you want to cancel order ${orderId}?`)) return;

  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (order && order.status === "Processing") {
    order.status = "Cancelled";
    saveOrders(orders);
    renderOrderHistory();
    if (typeof showNotification === "function") {
      showNotification(`Order ${orderId} has been cancelled.`, "info");
    }
  }
}

// ------------------------------------
// Checkout Form Submission & Validation
// ------------------------------------
function setupCheckoutForm() {
  const form = document.getElementById("checkout-form");
  const couponForm = document.getElementById("coupon-form");

  if (couponForm) {
    couponForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const codeInput = document.getElementById("coupon-input");
      if (!codeInput) return;
      const res = applyCoupon(codeInput.value);
      if (res.success) {
        showNotification(res.message, "success");
      } else {
        showNotification(res.message, "error");
      }
    });
  }

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const totals = calculateCartTotals();
    if (totals.items.length === 0) {
      showNotification("Your cart is empty! Add items before placing an order.", "error");
      return;
    }

    // Read form input elements
    const nameInput = form.querySelector("#cust-name") || form.querySelector("#customer-name");
    const emailInput = form.querySelector("#cust-email") || form.querySelector("#customer-email");
    const phoneInput = form.querySelector("#cust-phone") || form.querySelector("#customer-phone");
    const addressInput = form.querySelector("#cust-address") || form.querySelector("#customer-address");
    const cityInput = form.querySelector("#cust-city") || form.querySelector("#customer-city");
    const stateInput = form.querySelector("#cust-state") || form.querySelector("#customer-state");
    const pincodeInput = form.querySelector("#cust-pincode") || form.querySelector("#customer-pincode");
    const notesInput = form.querySelector("#cust-notes") || form.querySelector("#customer-notes");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const city = cityInput ? cityInput.value.trim() : "";
    const state = stateInput ? stateInput.value.trim() : "";
    const pincode = pincodeInput ? pincodeInput.value.trim() : "";
    const notes = notesInput ? notesInput.value.trim() : "";

    // 1. Required fields check
    if (!name || !email || !phone || !address || !city || !state || !pincode) {
      showNotification("Please fill in all required delivery fields.", "error");
      return;
    }

    // 2. Name validation: minimum 2 letters, alphabets only, no numbers
    if (name.length < 2 || !/^[A-Za-z\s.'-]{2,50}$/.test(name) || /\d/.test(name)) {
      showNotification("Please enter a valid full name (minimum 2 letters, no numbers allowed).", "error");
      nameInput?.focus();
      return;
    }

    // 3. Email validation: reject invalid formats like "ice@g"
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address with a domain extension (e.g. name@example.com).", "error");
      emailInput?.focus();
      return;
    }

    // 4. Phone validation: reject alphabets, require valid 10 digits
    if (/[a-zA-Z]/.test(phone)) {
      showNotification("Phone number must contain only numbers. Alphabets are not allowed.", "error");
      phoneInput?.focus();
      return;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      showNotification("Please enter a valid 10-digit mobile number.", "error");
      phoneInput?.focus();
      return;
    }

    // 5. PIN code validation
    const pinDigits = pincode.replace(/\D/g, "");
    if (pinDigits.length !== 6) {
      showNotification("Please enter a valid 6-digit postal PIN code.", "error");
      pincodeInput?.focus();
      return;
    }

    // Create Order
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrderId = `RS-ORD-${randomSuffix}`;

    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      status: "Processing",
      items: totals.items.map(it => ({
        id: it.product.id,
        title: it.product.title,
        artist: it.product.type === "vinyl" ? it.product.artist : it.product.brand,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.image
      })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      coupon: totals.appliedCoupon,
      shipping: totals.shipping,
      total: totals.total,
      shippingInfo: {
        name,
        email,
        phone,
        address,
        city,
        state,
        pincode,
        notes
      },
      trackingNumber: `DEL-IND-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    // Save order
    const orders = getStoredOrders();
    orders.unshift(newOrder);
    saveOrders(orders);

    // Clear cart & coupons
    clearCart();

    // Show Confirmation Banner
    showOrderSuccessBanner(newOrder);

    // Refresh views
    renderCartSection();
    renderOrderHistory();

    // Reset Form
    form.reset();

    showNotification(`Congratulations! Order #${newOrderId} placed successfully.`, "success");
  });
}

function showOrderSuccessBanner(order) {
  const confirmationModal = document.getElementById("order-confirmation-banner");
  if (!confirmationModal) return;

  const orderIdSpan = document.getElementById("confirmed-order-id");
  const orderTotalSpan = document.getElementById("confirmed-order-total");
  const orderItemsSpan = document.getElementById("confirmed-order-items-count");
  const orderAddressSpan = document.getElementById("confirmed-order-address");

  if (orderIdSpan) orderIdSpan.textContent = order.id;
  if (orderTotalSpan) orderTotalSpan.textContent = formatPriceINR(order.total);
  if (orderItemsSpan) orderItemsSpan.textContent = `${order.items.length} ${order.items.length === 1 ? 'item' : 'items'}`;
  if (orderAddressSpan) orderAddressSpan.textContent = `${order.shippingInfo.name}, ${order.shippingInfo.city} (${order.shippingInfo.pincode})`;

  confirmationModal.classList.remove("hidden");
  confirmationModal.scrollIntoView({ behavior: "smooth" });
}

// Global listeners
document.addEventListener("DOMContentLoaded", () => {
  renderCartSection();
  renderOrderHistory();
  setupCheckoutForm();

  window.addEventListener("cart:updated", () => {
    renderCartSection();
  });
});

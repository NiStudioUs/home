/**
 * KS Foodie - Core Application Logic
 * Handles Dashboard rendering, Infinite Scroll, and Cart Management.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Check Authentication
    checkAuth();

    // 2. Initialize Dashboard
    initDashboard();
});

// State
let isLoading = false;
let cart = JSON.parse(localStorage.getItem('ksFoodieCart')) || [];
let currentMode = 'feed'; // 'feed', 'search', 'filter'
let currentQuery = '';
let currentFilter = 'all';

function initDashboard() {
    // Set User Name
    const session = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (session && session.username) {
        document.getElementById('welcomeMsg').textContent = `Hello, ${session.username}`;
        // Set Initials
        const initials = window.getUserInitials(session.displayName || session.username);
        const avatar = document.getElementById('userAvatar');
        if (avatar) avatar.textContent = initials;
    }

    // Load initial feed
    loadFoodFeed();

    // Setup Infinite Scroll
    window.addEventListener('scroll', handleScroll);

    // Setup Cart Button
    updateCartUI();
    document.getElementById('cartBtn').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Setup Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('ksFoodieUser');
        window.location.href = '../index.html';
    });

    // Setup Search (Debounced)
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim();
            if (query.length > 0) {
                performSearch(query);
            } else {
                resetToFeed();
            }
        }, 500));
    }

    // Setup Filters
    const filterBtns = document.querySelectorAll('.filter-chip');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            if (category === 'all') {
                resetToFeed();
            } else {
                performFilter(category);
            }
        });
    });
}

// --- Feed & Search Logic ---

async function loadFoodFeed() {
    if (isLoading || currentMode !== 'feed') return;
    isLoading = true;
    toggleLoader(true);

    // Fetch 9 random meals
    const meals = await fetchRandomMeals(9);

    if (meals && meals.length > 0) {
        renderCards(meals, true); // true = append
    }

    isLoading = false;
    toggleLoader(false);
}

async function performSearch(query) {
    isLoading = true;
    currentMode = 'search';
    currentQuery = query;
    toggleLoader(true);

    // Clear current grid
    document.getElementById('foodGrid').innerHTML = '';

    const meals = await searchMeals(query);

    if (meals && meals.length > 0) {
        renderCards(meals, false); // false = replace
    } else {
        document.getElementById('foodGrid').innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 2rem;">No results found.</div>';
    }

    isLoading = false;
    toggleLoader(false);
}

async function performFilter(category) {
    isLoading = true;
    currentMode = 'filter';
    currentFilter = category;
    toggleLoader(true);

    // Clear current grid
    document.getElementById('foodGrid').innerHTML = '';

    const meals = await filterMealsByArea(category);

    if (meals && meals.length > 0) {
        renderCards(meals, false); // false = replace
    } else {
        document.getElementById('foodGrid').innerHTML = '<div class="text-center" style="grid-column: 1/-1; padding: 2rem;">No items found for this category.</div>';
    }

    isLoading = false;
    toggleLoader(false);
}

function resetToFeed() {
    currentMode = 'feed';
    document.getElementById('foodGrid').innerHTML = '';
    const allBtn = document.querySelector('.filter-chip[data-category="all"]');
    if (allBtn) {
        const filterBtns = document.querySelectorAll('.filter-chip');
        filterBtns.forEach(b => b.classList.remove('active'));
        allBtn.classList.add('active');
    }
    loadFoodFeed();
}

function renderCards(meals, append = true) {
    const grid = document.getElementById('foodGrid');

    if (!append) {
        grid.innerHTML = '';
    }

    meals.forEach(meal => {
        const price = getPriceForMeal(meal.idMeal);
        const card = document.createElement('div');
        card.className = 'food-card';

        // Check if item in cart
        const cartItem = cart.find(i => i.id === meal.idMeal);
        const qty = cartItem ? cartItem.quantity : 0;

        let actionHTML = '';
        if (qty > 0) {
            actionHTML = `
                <div class="card-qty-control" id="qty-${meal.idMeal}">
                    <button class="card-qty-btn" onclick="updateCardQty('${meal.idMeal}', -1, '${meal.strMeal.replace(/'/g, "\\'")}', ${price})">−</button>
                    <span class="card-qty-val">${qty}</span>
                    <button class="card-qty-btn" onclick="updateCardQty('${meal.idMeal}', 1, '${meal.strMeal.replace(/'/g, "\\'")}', ${price})">+</button>
                </div>
            `;
        } else {
            actionHTML = `
                <button class="btn-primary btn-sm" id="add-${meal.idMeal}" onclick="updateCardQty('${meal.idMeal}', 1, '${meal.strMeal.replace(/'/g, "\\'")}', ${price})">
                    Add +
                </button>
            `;
        }

        card.innerHTML = `
            <div class="card-img-container">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img" loading="lazy">
            </div>
            <div class="card-body">
                <div class="card-category">${meal.strCategory || 'Dish'}</div>
                <h3 class="card-title">${meal.strMeal}</h3>
                <div class="card-footer">
                    <div class="card-price">₹${price}</div>
                    <div class="card-action-box" id="action-${meal.idMeal}">
                        ${actionHTML}
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function toggleLoader(show) {
    const loader = document.getElementById('loader');
    loader.style.display = show ? 'flex' : 'none';
}

// --- Infinite Scroll Logic ---

function handleScroll() {
    if (currentMode !== 'feed') return; // Only infinite scroll on feed

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Check if near bottom (within 100px)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
        loadFoodFeed();
    }
}

// --- Utils ---

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// --- Cart Logic ---

// Unified function to handle Add or Update Qty from Card
window.updateCardQty = function (id, change, name, price) {
    // Check if item exists
    const existingItem = cart.find(item => item.id === id);
    let newQty = 0;

    if (existingItem) {
        existingItem.quantity += change;
        newQty = existingItem.quantity;

        // Remove if 0
        if (existingItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
            newQty = 0;
        }
    } else if (change > 0) {
        // Add new
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
        newQty = 1;
    }

    saveCart();
    updateCartUI();
    renderActionBtn(id, newQty, name, price);
};

function renderActionBtn(id, qty, name, price) {
    const container = document.getElementById(`action-${id}`);
    if (!container) return; // Might be filtered out or not visible

    if (qty > 0) {
        container.innerHTML = `
            <div class="card-qty-control" id="qty-${id}">
                <button class="card-qty-btn" onclick="updateCardQty('${id}', -1, '${name.replace(/'/g, "\\'")}', ${price})">−</button>
                <span class="card-qty-val">${qty}</span>
                <button class="card-qty-btn" onclick="updateCardQty('${id}', 1, '${name.replace(/'/g, "\\'")}', ${price})">+</button>
            </div>
        `;
    } else {
        container.innerHTML = `
            <button class="btn-primary btn-sm" id="add-${id}" onclick="updateCardQty('${id}', 1, '${name.replace(/'/g, "\\'")}', ${price})">
                Add +
            </button>
        `;
    }
}

function saveCart() {
    localStorage.setItem('ksFoodieCart', JSON.stringify(cart));
}

function updateCartUI() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.innerText = count;
    }
}

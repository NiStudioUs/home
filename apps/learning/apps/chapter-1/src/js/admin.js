/**
 * KS Foodie - Admin Logic
 * Handles adding custom food items locally.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Admin Login Gate
    // 1. Strict Admin Auth Check
    checkAdminAuth();

    // 2. Initialize Panels
    loadCustomItems();
    loadOrders();

    // 3. Setup Logic
    document.getElementById('addItemForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addCustomItem();
    });

    document.getElementById('adminLogoutBtn').addEventListener('click', () => {
        localStorage.removeItem('ksFoodieUser');
        window.location.href = '../index.html';
    });
});

function checkAdminAuth() {
    const session = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (!session || !session.isLoggedIn || session.role !== 'admin') {
        alert('Access Denied. Admins only.');
        window.location.href = '../index.html';
    }
}

// --- Order Management ---
function loadOrders() {
    const tableBody = document.getElementById('adminOrdersTable');
    if (!tableBody) return;

    // Check for real orders (not implemented fully in app yet, so we'll mock if empty)
    // In a real app, this would be an API call
    let orders = JSON.parse(localStorage.getItem('ksFoodieOrders')) || [];

    if (orders.length === 0) {
        // Generate Mock Data for Admin to see
        orders = [
            { id: '#9921', user: 'demo', items: '2x Spicy Burger, 1x Fries', total: 650, status: 'Pending', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80' },
            { id: '#9920', user: 'John Doe', items: '1x Butter Chicken', total: 350, status: 'Delivered', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=100&q=80' },
            { id: '#9919', user: 'Guest', items: '3x Veg Pizza', total: 1200, status: 'Delivering', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=100&q=80' }
        ];
    }

    tableBody.innerHTML = orders.map(order => {
        let statusClass = 'status-pending';
        if (order.status === 'Delivered') statusClass = 'status-delivered';
        if (order.status === 'Delivering') statusClass = 'status-delivering';
        if (order.status === 'Cancelled') statusClass = 'status-cancelled';

        // Use a default image if none provided
        const imgUrl = order.img || 'https://via.placeholder.com/50';

        return `
        <tr>
            <td style="font-weight:bold; color:#555;">${order.id}</td>
            <td>
                <div style="font-weight: 500;">${order.user || 'Unknown'}</div>
                <div style="font-size: 0.75rem; color: #999;">Today, 12:30 PM</div>
            </td>
            <td>
                <div class="order-item-flex">
                    <img src="${imgUrl}" class="order-thumbnail" alt="Food">
                    <div class="order-details-text">
                        <span class="order-main-text">${order.items.split(',')[0]}</span>
                        <span class="order-sub-text">${order.items.split(',').length > 1 ? '+ more items' : ''}</span>
                    </div>
                </div>
            </td>
            <td style="font-weight:bold; color: var(--primary-color);">₹${order.total}</td>
            <td>
                <span class="status-badge ${statusClass}">
                    ${order.status}
                </span>
            </td>
            <td>
                <button class="action-btn" onclick="updateOrderStatus('${order.id}', 'Delivered')" title="Mark Delivered" style="margin-right: 5px;">
                    <span class="btn-icon">✅</span>
                </button>
                <button class="action-btn" onclick="updateOrderStatus('${order.id}', 'Cancelled')" title="Cancel Order" style="color: #dc3545;">
                    <span class="btn-icon">❌</span>
                </button>
            </td>
        </tr>
    `}).join('');

    if (orders.length === 0) {
        document.getElementById('noOrdersMsg').style.display = 'block';
    }
}

// --- Custom Item Management ---
function loadCustomItems() {
    const items = JSON.parse(localStorage.getItem('ksFoodieCustomItems')) || [];
    const tableBody = document.getElementById('customItemsTable');
    const noItemsMsg = document.getElementById('noItemsMsg');

    if (items.length === 0) {
        tableBody.innerHTML = '';
        noItemsMsg.style.display = 'block';
        return;
    }

    noItemsMsg.style.display = 'none';
    tableBody.innerHTML = items.map((item, index) => `
        <tr>
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;" loading="lazy"></td>
            <td style="font-weight: 500;">${item.name}</td>
            <td>${item.category}</td>
            <td>₹${item.price}</td>
            <td>
                <button class="btn-primary" style="padding: 5px 10px; font-size: 0.8rem; background: #dc3545;" onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function addCustomItem() {
    const name = document.getElementById('itemName').value;
    const price = document.getElementById('itemPrice').value;
    const category = document.getElementById('itemCategory').value;
    const image = document.getElementById('itemImage').value;

    if (name && price && image) {
        const newItem = { name, price, category, image, idMeal: 'custom_' + Date.now() };

        const items = JSON.parse(localStorage.getItem('ksFoodieCustomItems')) || [];
        items.push(newItem);
        localStorage.setItem('ksFoodieCustomItems', JSON.stringify(items));

        alert('Item added successfully!');
        document.getElementById('addItemForm').reset();
        loadCustomItems();
    }
}

// --- Helper: Update Status (Mock) ---
window.updateOrderStatus = function (orderId, newStatus) {
    if (confirm(`Mark Order ${orderId} as ${newStatus}?`)) {
        // In a real app, update localStorage or API
        alert(`Order ${orderId} updated to ${newStatus}`);

        // Refresh to show updates (mocking the update by modifying logic or just reloading)
        // Since we are using hardcoded mocks for empty storage, we can't easily persist changes to them without populating storage.
        // Let's populate storage if it's empty to allow "persisting" these changes in this session.
        let orders = JSON.parse(localStorage.getItem('ksFoodieOrders')) || [];
        if (orders.length === 0) {
            orders = [
                { id: '#9921', user: 'demo', items: '2x Spicy Burger, 1x Fries', total: 650, status: 'Pending', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=100&q=80' },
                { id: '#9920', user: 'John Doe', items: '1x Butter Chicken', total: 350, status: 'Delivered', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=100&q=80' },
                { id: '#9919', user: 'Guest', items: '3x Veg Pizza', total: 1200, status: 'Delivering', img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=100&q=80' }
            ];
        }

        const orderIndex = orders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = newStatus;
            localStorage.setItem('ksFoodieOrders', JSON.stringify(orders));
            loadOrders(); // Reload UI
        }
    }
};

window.deleteItem = function (index) {
    if (confirm('Are you sure you want to delete this item?')) {
        const items = JSON.parse(localStorage.getItem('ksFoodieCustomItems')) || [];
        items.splice(index, 1);
        localStorage.setItem('ksFoodieCustomItems', JSON.stringify(items));
        loadCustomItems();
    }
};

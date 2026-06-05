/**
 * KS Foodie - Cart Page Logic
 * Handles rendering items, updating quantities, and calculating totals.
 */

document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadCart();

    document.getElementById('checkoutBtn').addEventListener('click', checkout);
});

let cart = JSON.parse(localStorage.getItem('ksFoodieCart')) || [];

function loadCart() {
    const container = document.getElementById('cartItemsContainer');
    const layout = document.getElementById('cartLayout');
    const emptyState = document.getElementById('emptyCartState');

    if (cart.length === 0) {
        layout.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    layout.style.display = 'grid';
    emptyState.style.display = 'none';
    container.innerHTML = '';

    cart.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <div class="qty-controls">
                <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">−</button>
                <span style="font-weight: 500; min-width: 20px; text-align: center;">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
        `;
        container.appendChild(itemEl);
    });

    calculateTotal();
}

window.updateQuantity = function (id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            // Remove item if quantity becomes 0
            if (confirm('Remove this item from cart?')) {
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = 1; // Revert
            }
        }

        saveCartItems();
        loadCart(); // Re-render
    }
};

function calculateTotal() {
    const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subTotal * 0.05); // 5% Tax
    const delivery = 40; // Flat fee
    const grandTotal = subTotal + tax + delivery;

    document.getElementById('subTotal').innerText = `₹${subTotal}`;
    document.getElementById('taxAmount').innerText = `₹${tax}`;
    document.getElementById('deliveryFee').innerText = `₹${delivery}`;
    document.getElementById('grandTotal').innerText = `₹${grandTotal}`;
}

function saveCartItems() {
    localStorage.setItem('ksFoodieCart', JSON.stringify(cart));
}

function checkout() {
    if (cart.length === 0) return;

    // In a real app, this would redirect to payment
    alert('🎉 Order Placed Successfully!\n\nYour food will arrive in 30 mins.');

    // Clear cart
    cart = [];
    saveCartItems();

    // Redirect to Order Tracking
    window.location.href = 'order-tracking.html';
}

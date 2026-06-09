/**
 * KS Foodie - Profile Page Logic
 * Handles loading user data and updating profile details.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Load User Data
    loadUserData();

    // Load Mock Orders
    loadMockOrders();

    // Form Submit
    const form = document.getElementById('profileForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveProfile();
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('ksFoodieUser');
            window.location.href = '../index.html';
        });
    }

    // Initialize tab to 'details'
    switchTab('details');
});

function loadUserData() {
    const session = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (!session) {
        window.location.href = '../index.html';
        return;
    }

    document.getElementById('displayUsername').textContent = session.displayName || session.username || 'User';
    document.getElementById('usernameField').value = session.username || '';
    document.getElementById('displayNameField').value = session.displayName || '';
    document.getElementById('emailField').value = session.email || '';

    // Update Nav Avatar text too
    const navAvatar = document.getElementById('navUserAvatar');
    if (navAvatar) {
        navAvatar.textContent = window.getUserInitials(session.displayName || session.username);
    }

    // Update Profile Avatar
    const profileAvatar = document.getElementById('profileAvatar');
    if (profileAvatar) {
        profileAvatar.textContent = window.getUserInitials(session.displayName || session.username);
    }
}

function saveProfile() {
    const displayName = document.getElementById('displayNameField').value;
    const email = document.getElementById('emailField').value;

    const updatedData = {
        displayName: displayName,
        email: email
    };

    // Assuming updateProfile is a globally available function or imported
    // For this example, we'll simulate it and update local storage
    let user = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (user) {
        user.displayName = updatedData.displayName;
        user.email = updatedData.email;
        localStorage.setItem('ksFoodieUser', JSON.stringify(user));
    }

    // updateProfile(updatedData); // If an actual backend call is needed

    // Update UI immediately
    document.getElementById('displayUsername').textContent = displayName || 'User';
    alert('Profile updated successfully!');
}

// --- Tab Logic ---
window.switchTab = function (tabName) {
    // Update Buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(tabName === 'details' ? 'details' : 'history')) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Handle Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('ksFoodieUser');
        window.location.href = '../index.html';
    });
};

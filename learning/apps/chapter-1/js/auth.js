/**
 * KS Foodie - Auth Logic
 * Handles login simulation and simple session storage.
 */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            if (validateCredentials(username, password)) {
                // Successful Login
                loginUser(username);
            } else {
                // Failed Login
                showError();
            }
        });
    }
});

function validateCredentials(user, pass) {
    // Demo User
    if (user === 'demo' && pass === 'demo') return 'user';
    // Admin User
    if (user === 'admin' && pass === 'admin') return 'admin';

    return false;
}

function loginUser(username) {
    const role = username === 'admin' ? 'admin' : 'user';

    // Save session
    const userSession = {
        username: username,
        role: role,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('ksFoodieUser', JSON.stringify(userSession));

    if (role === 'admin') {
        alert(`Welcome Admin! Redirecting to panel...`);
        window.location.href = 'pages/admin.html';
    } else {
        alert(`Welcome back, ${username}! Redirecting to dashboard...`);
        window.location.href = 'pages/dashboard.html';
    }
}

function showError() {
    alert('Invalid Credentials! Try demo/demo or admin/admin');
}

// Function to check auth on protected pages (to be used later)
function checkAuth() {
    const session = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (!session || !session.isLoggedIn) {
        window.location.href = '../index.html';
    }
    return session;
}

function updateProfile(data) {
    const user = JSON.parse(localStorage.getItem('ksFoodieUser'));
    if (user) {
        const updatedUser = { ...user, ...data };
        localStorage.setItem('ksFoodieUser', JSON.stringify(updatedUser));
        return updatedUser;
    }
    return null;
}

// --- Helper: Get User Initials ---
window.getUserInitials = function (name) {
    if (!name) return 'U';

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }

    // First char of first name + First char of last name
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

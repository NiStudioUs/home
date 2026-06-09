/**
 * KS Foodie - Order Tracking Simulation with Minimap
 * Simulates order progress from Placed -> Delivered using Leaflet.js
 */

let map, restaurantMarker, customerMarker, deliveryMarker, routeLine;
let currentStep = 0;

const steps = ['step1', 'step2', 'step3', 'step4'];
const messages = [
    "We have received your order!",
    "Chef is preparing your food...",
    "Rider has picked up your order!",
    "Enjoy your meal! Delivered."
];
const stepperClasses = ['', 'step-2', 'step-3', 'step-4'];

// Mock Coordinates (e.g. London area)
const restaurantLatLng = [51.505, -0.09];
const customerLatLng = [51.515, -0.1];
// Simple straight line path interpolation for demo
const pathSteps = 10;
let currentPathStep = 0;
let deliveryInterval;

document.addEventListener('DOMContentLoaded', () => {
    // Mock Order ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('orderId').innerText = randomId;

    initMap();
    startTrackingSimulation();
});

function initMap() {
    // Initialize Leaflet Map
    map = L.map('map').setView(restaurantLatLng, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons (using emojis for simplicity)
    const createEmojiIcon = (emoji) => {
        return L.divIcon({
            html: `<div style="font-size: 24px; background: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); border: 2px solid #ef4f5f;">${emoji}</div>`,
            className: 'custom-emoji-icon',
            iconSize: [36, 36],
            iconAnchor: [18, 18]
        });
    };

    // Add Restaurant Marker
    restaurantMarker = L.marker(restaurantLatLng, { icon: createEmojiIcon('🏪') })
        .addTo(map)
        .bindPopup('Restaurant');

    // Add Customer Marker
    customerMarker = L.marker(customerLatLng, { icon: createEmojiIcon('🏠') })
        .addTo(map)
        .bindPopup('Delivery Address');

    // Fit map bounds to show both
    const bounds = L.latLngBounds([restaurantLatLng, customerLatLng]);
    map.fitBounds(bounds, { padding: [50, 50] });

    // Draw dashed line for route
    routeLine = L.polyline([restaurantLatLng, customerLatLng], {
        color: '#ef4f5f',
        dashArray: '5, 10',
        weight: 3,
        opacity: 0.7
    }).addTo(map);
}

function startTrackingSimulation() {
    // Step 1 is already active by HTML default
    
    const interval = setInterval(() => {
        currentStep++;

        if (currentStep >= steps.length) {
            clearInterval(interval);
            celebrate();
            return;
        }

        updateUI(currentStep);

        // Map Actions based on step
        if (currentStep === 2) { // Step 3: On the way
            startDeliveryMovement();
        }

    }, 4000); // Advance every 4 seconds for demo
}

function startDeliveryMovement() {
    // Add delivery marker at restaurant
    const createDeliveryIcon = () => {
        return L.divIcon({
            html: `<div style="font-size: 28px; transform: scaleX(-1);">🛵</div>`, // Flipped scooter
            className: 'delivery-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    };

    deliveryMarker = L.marker(restaurantLatLng, { icon: createDeliveryIcon(), zIndexOffset: 1000 }).addTo(map);

    // Calculate movement steps
    const latDiff = (customerLatLng[0] - restaurantLatLng[0]) / pathSteps;
    const lngDiff = (customerLatLng[1] - restaurantLatLng[1]) / pathSteps;

    deliveryInterval = setInterval(() => {
        currentPathStep++;
        
        if (currentPathStep >= pathSteps) {
            clearInterval(deliveryInterval);
            deliveryMarker.setLatLng(customerLatLng);
            return;
        }

        const newLat = restaurantLatLng[0] + (latDiff * currentPathStep);
        const newLng = restaurantLatLng[1] + (lngDiff * currentPathStep);
        
        deliveryMarker.setLatLng([newLat, newLng]);
        
    }, 4000 / pathSteps); // Fit the movement within the 4-second step duration
}

function updateUI(index) {
    // Update Stepper Progress Line
    const stepper = document.getElementById('stepper');
    stepper.className = `tracking-stepper ${stepperClasses[index]}`;

    // Update Active Step Circle
    document.getElementById(steps[index]).classList.add('active');

    // Update Message
    const msg = document.getElementById('statusMsg');
    msg.style.opacity = 0;

    setTimeout(() => {
        msg.innerText = messages[index];
        msg.style.opacity = 1;
    }, 300);
}

function celebrate() {
    // Clear delivery interval just in case
    if (deliveryInterval) clearInterval(deliveryInterval);
    if (deliveryMarker) deliveryMarker.setLatLng(customerLatLng);

    const msg = document.getElementById('statusMsg');
    msg.innerHTML = "🎉 Order Delivered! <br><span style='font-size: 1rem; color: #555;'>Redirecting to home in 3s...</span>";

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
}

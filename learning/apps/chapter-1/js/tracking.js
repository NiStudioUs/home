/**
 * KS Foodie - Order Tracking Simulation
 * Simulates order progress from Placed -> Delivered.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mock Order ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('orderId').innerText = randomId;

    startTrackingSimulation();
});

const steps = ['step1', 'step2', 'step3', 'step4'];
const messages = [
    "We have received your order!",
    "Chef is preparing your food...",
    "Rider has picked up your order!",
    "Enjoy your meal! Delivered."
];
const stepperClasses = ['', 'step-2', 'step-3', 'step-4'];

let currentStep = 0;

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

    }, 3000); // Advance every 3 seconds for demo (fast)
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
    // Simple confetti effect (emoji rain) or just a final alert
    const msg = document.getElementById('statusMsg');
    msg.innerHTML = "🎉 Order Delivered! <br><span style='font-size: 1rem; color: #555;'>Redirecting to home in 3s...</span>";

    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 3000);
}

/**
 * KS Foodie - API Handler
 * Handles interactions with TheMealDB API.
 */

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Fetches a single random meal from the API.
 * @returns {Promise<Object>} The meal object.
 */
async function fetchRandomMeal() {
    try {
        const response = await fetch(`${API_BASE_URL}/random.php`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error("Error fetching random meal:", error);
        return null;
    }
}

/**
 * Fetches multiple random meals.
 * Also mixes in Custom Items from LocalStorage if requesting the initial load.
 * @param {number} count Number of meals to fetch.
 * @returns {Promise<Array>} Array of meal objects.
 */
async function fetchRandomMeals(count = 9) {
    // 1. Get Custom Items (only if this is an "initial" style load, logic simplified for MVP)
    const customItems = JSON.parse(localStorage.getItem('ksFoodieCustomItems') || '[]');

    // Determine how many API calls we need
    // If we have 2 custom items, we fetch count - 2 API items
    let apiCount = count;

    // MVP logic: If custom items exist, just show them all + remaining slots filled by API
    if (customItems.length > 0) {
        apiCount = Math.max(0, count - customItems.length);
    }

    const promises = [];
    for (let i = 0; i < apiCount; i++) {
        promises.push(
            fetch(`${API_BASE_URL}/random.php`)
                .then(res => res.json())
                .then(data => data.meals[0])
                .catch(err => console.error("Error fetching meal:", err))
        );
    }

    const apiMeals = await Promise.all(promises);
    const validApiMeals = apiMeals.filter(meal => meal !== null);

    // Combine: Custom Items first, then API Valid Meals
    return [...customItems, ...validApiMeals];
}

/**
 * Generates a random price between ₹100 and ₹500 based on Meal ID.
 * @param {string} id The meal ID.
 * @returns {number} The generated price.
 */
function getPriceForMeal(id) {
    // Handle custom item price which is already set
    if (typeof id === 'string' && id.startsWith('custom_')) {
        const items = JSON.parse(localStorage.getItem('ksFoodieCustomItems') || '[]');
        const item = items.find(i => i.id === id);
        return item ? item.price : 250;
    }

    // Simple hash function to generate a pseudo-random number from string ID
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Normalize to a price range (e.g., ₹150 - ₹650)
    const minPrice = 150;
    const maxPrice = 650;
    const range = maxPrice - minPrice;

    const normalizedHash = Math.abs(hash);
    const price = minPrice + (normalizedHash % range);

    // Return rounded to nearest 10
    return Math.ceil(price / 10) * 10;
}

/**
 * Searches for meals by name.
 * @param {string} query The search query.
 * @returns {Promise<Array>} Array of meal objects.
 */
async function searchMeals(query) {
    if (!query) return [];
    try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${query}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error searching meals:", error);
        return [];
    }
}

/**
 * Filters meals by area (cuisine).
 * @param {string} area The area to filter by (e.g., Indian, Italian).
 * @returns {Promise<Array>} Array of meal objects.
 */
async function filterMealsByArea(area) {
    try {
        const response = await fetch(`${API_BASE_URL}/filter.php?a=${area}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error("Error filtering meals:", error);
        return [];
    }
}

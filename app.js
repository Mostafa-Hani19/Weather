// --- DOM Element References ---
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const locationBtn = document.getElementById('location-btn');
const refreshBtn = document.getElementById('refresh-btn');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const weatherContent = document.getElementById('weather-content');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

const cityNameEl = document.getElementById('city-name');
const lastUpdatedTimeEl = document.getElementById('last-updated-time');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const celsiusBtn = document.getElementById('celsius-btn');
const fahrenheitBtn = document.getElementById('fahrenheit-btn');
const weatherDescriptionEl = document.getElementById('weather-description');
const windSpeedEl = document.getElementById('wind-speed');
const humidityEl = document.getElementById('humidity');
const dailyForecastContainer = document.getElementById('daily-forecast-container');
const hourlyForecastContainer = document.getElementById('hourly-forecast-container');
const extraDetailsContainer = document.getElementById('extra-details-container');
const extraDetailsEl = document.getElementById('extra-details');
const newsContainer = document.getElementById('news-container');
const newsContentEl = document.getElementById('news-content');
const dailyForecastEl = document.getElementById('daily-forecast');
const hourlyForecastEl = document.getElementById('hourly-forecast');
const tabButtons = document.querySelectorAll('.tab-btn');

// --- App State ---
const appState = {
    unit: 'celsius', // 'celsius' or 'fahrenheit'
    forecast: null,
    currentWeather: null,
};

// --- Icon Definitions ---
// Centralizing SVG icons for easier management and cleaner code.
const icons = {
    // Main weather icons (80x80)
    sun: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/></svg>`,
    cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"><path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.728C1.67 13 0 11.328 0 9.25c0-1.762 1.224-3.223 2.882-3.695l.02-.011C3.226 4.29 3.754 3.6 4.406 3.342z"/></svg>`,
    rain: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"><path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/></svg>`,
    snow: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 1.25a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zM2.5 5.25a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zM13.5 9.25a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm-2 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zM8 16a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zm-2 0a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zm-2 0a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5-.5zm6 0a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5zm2 0a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5-.5z"/></svg>`,
    thunderstorm: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" viewBox="0 0 16 16"><path d="M5.525 5.034a.5.5 0 0 1 .29.662l-2.5 5a.5.5 0 0 1-.93-.332l2.5-5a.5.5 0 0 1 .64-.33zM8.5 3.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5a.5.5 0 0 1 .5-.5zm2.975 1.534a.5.5 0 0 1 .64.33l2.5 5a.5.5 0 1 1-.93.332l-2.5-5a.5.5 0 0 1 .29-.662z"/><path d="M13.5 2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm-11 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5zm5.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5z"/></svg>`,
    // Detail icons (16x16)
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>`,
    precipitation: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/></svg>`,
    wind: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 0 1 12.5 1a.5.5 0 0 1 0 1zM10 15a.5.5 0 0 1-.5-.5V9.707l-1.646 1.647a.5.5 0 0 1-.708-.708l2.5-2.5a.5.5 0 0 1 .708 0l2.5 2.5a.5.5 0 0 1-.708.708L10.5 9.707V14.5a.5.5 0 0 1-.5.5zM5 6.5A1.5 1.5 0 1 1 3.5 5a.5.5 0 0 1 1 0 2.5 2.5 0 0 0-2.5 2.5.5.5 0 0 1-1 0A3.5 3.5 0 0 1 5 3a.5.5 0 0 1 0 1z"/><path d="M.5 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/></svg>`,
    uv: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707z"/></svg>`,
};

const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes
const DEFAULT_LOCALE = 'ar-EG';

// --- Robust fetch helper with timeout & retries ---
async function fetchJson(url, { timeoutMs = 12000, retries = 1, headers } = {}) {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, { signal: controller.signal, headers });
            clearTimeout(timer);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            clearTimeout(timer);
            lastError = err;
            if (attempt === retries) throw lastError;
        }
    }
}

// --- API Configuration ---
// This structure allows for easy swapping of API providers.
// To use a different provider, create a similar object and assign it to `apiService`.
const openMeteoService = {
    // Step 1: Get coordinates for a city name
    async getCoords(city) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=ar`;
        const data = await fetchJson(url, { retries: 1 });
        if (!data.results || data.results.length === 0) {
            throw new Error(`City "${city}" not found. Please try again.`);
        }
        const { latitude, longitude, name } = data.results[0];
        return { lat: latitude, lon: longitude, name };
    },

    // Step 2: Get weather for given coordinates
    async getWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,visibility&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset&timezone=auto`;
        return await fetchJson(url, { retries: 1 });
    },

    // Step 3: Get city name from coordinates (Reverse Geocoding)
    async getCityFromCoords(lat, lon) {
        // Prefer Open-Meteo reverse for consistency and CORS friendliness
        const url = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}&language=ar`;
        const data = await fetchJson(url, { retries: 1 });
        const r = (data.results && data.results[0]) || {};
        return r.name || r.admin1 || r.country || 'Current Location';
    }
};

const apiService = openMeteoService;

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Setup ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.querySelector('.theme-icon-sun').classList.remove('hidden');
        themeToggleBtn.querySelector('.theme-icon-moon').classList.add('hidden');
    } else {
        document.body.classList.remove('dark-theme');
        themeToggleBtn.querySelector('.theme-icon-sun').classList.add('hidden');
        themeToggleBtn.querySelector('.theme-icon-moon').classList.remove('hidden');
    }


    // Load last known city or a default on startup
    const lastCity = localStorage.getItem('lastCity');
    const savedUnit = localStorage.getItem('unit');
    if (savedUnit === 'fahrenheit') setUnit('fahrenheit');
    fetchWeatherByCity(lastCity || 'Cairo');

    // Auto refresh every 5 minutes
    startAutoRefresh();
    // Refresh on return to tab or online
    window.addEventListener('focus', softRefresh);
    window.addEventListener('online', softRefresh);

    // Tabs switching: show chosen section without hiding data permanently
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn));
    });
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
        cityInput.value = '';
    }
});

locationBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        },
        () => {
            showError('Unable to retrieve your location. Please grant permission.');
        }
    );
});

refreshBtn.addEventListener('click', () => {
    softRefresh(true);
});

celsiusBtn.addEventListener('click', () => setUnit('celsius'));
fahrenheitBtn.addEventListener('click', () => setUnit('fahrenheit'));

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Toggle icon visibility
    const sunIcon = themeToggleBtn.querySelector('.theme-icon-sun');
    const moonIcon = themeToggleBtn.querySelector('.theme-icon-moon');
    sunIcon.classList.toggle('hidden', !isDark);
    moonIcon.classList.toggle('hidden', isDark);
});



// --- Core Functions ---

/**
 * Fetches weather data for a given city name.
 * Manages caching and UI updates.
 */
async function fetchWeatherByCity(city) {
    appState.lastQuery = { type: 'city', value: city };
    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedData = getFromCache(cacheKey);

    if (cachedData) {
        console.log('Loading from cache for', city);
        // getFromCache already populates the app state.
        // We just need to update the UI.
        updateUI();
        return;
    }

    showLoader();
    try {
        const { lat, lon, name } = await apiService.getCoords(city);
        const apiResponse = await apiService.getWeather(lat, lon);
        
        appState.currentWeather = { ...apiResponse.current, name };
        appState.forecast = apiResponse.daily;
        appState.hourlyData = apiResponse.hourly; // store hourly
        
        // Cache both current weather and forecast
        setCache(cacheKey, { currentWeather: appState.currentWeather, forecast: appState.forecast, hourly: appState.hourlyData });
        localStorage.setItem('lastCity', name); // Save last successfully searched city

        updateUI();
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoader();
    }
}

/**
 * Fetches weather data for given latitude and longitude.
 * Used for "Use My Location" feature.
 */
async function fetchWeatherByCoords(lat, lon) {
    appState.lastQuery = { type: 'coords', value: { lat, lon } };
    showLoader();
    try {
        const [cityName, apiResponse] = await Promise.all([
            apiService.getCityFromCoords(lat, lon),
            apiService.getWeather(lat, lon)
        ]);

        appState.currentWeather = { ...apiResponse.current, name: cityName };
        appState.forecast = apiResponse.daily;
        appState.hourlyData = apiResponse.hourly;

        localStorage.setItem('lastCity', cityName);

        updateUI();
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoader();
    }
}

// Soft refresh uses cache if fresh, otherwise fetches. Forced refresh bypasses cache expiration.
function softRefresh(force = false) {
    const q = appState.lastQuery;
    if (!q) return;
    if (q.type === 'city') {
        if (force) {
            localStorage.removeItem(`weather_${(q.value || '').toLowerCase()}`);
        }
        fetchWeatherByCity(q.value);
    } else if (q.type === 'coords') {
        fetchWeatherByCoords(q.value.lat, q.value.lon);
    }
}

let autoRefreshTimer;
function startAutoRefresh() {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = setInterval(() => softRefresh(false), 5 * 60 * 1000);
}

/**
 * Updates the entire UI with data from the appState.
 */
function updateUI() {
    if (!appState.currentWeather || !appState.forecast) return;

    const { name, temperature_2m, weather_code, wind_speed_10m, relative_humidity_2m, time, apparent_temperature, surface_pressure, visibility } = appState.currentWeather;

    // Update text content
    cityNameEl.textContent = name;
    lastUpdatedTimeEl.textContent = formatTime(time);
    weatherDescriptionEl.textContent = getWeatherDescription(weather_code);
    windSpeedEl.textContent = `${wind_speed_10m} km/h`;
    humidityEl.textContent = `${relative_humidity_2m}%`;

    // Update temperature based on selected unit
    if (appState.unit === 'celsius') {
        temperatureEl.textContent = `${Math.round(temperature_2m)}°`;
    } else {
        temperatureEl.textContent = `${Math.round(celsiusToFahrenheit(temperature_2m))}°`;
    }

    // Update weather icon
    weatherIconEl.innerHTML = getWeatherIcon(weather_code);

    // Update background image based on weather
    const backgroundImageUrl = getWeatherBackground(weather_code);
    document.body.style.backgroundImage = `url('${backgroundImageUrl}')`;
    // Add some basic styling for the background to make it look good
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.transition = 'background-image 0.5s ease-in-out';

    // Update daily forecast
    updateDailyForecastUI();

    // Update hourly forecast
    updateHourlyForecastUI();

    // Update extra details
    updateExtraDetailsUI();

    // Update weather news
    updateWeatherNewsUI();
    loadNews();
}

/**
 * Sets the temperature unit and updates the UI.
 */
function setUnit(unit) {
    if (appState.unit === unit) return;
    appState.unit = unit;

    celsiusBtn.classList.toggle('active', unit === 'celsius');
    celsiusBtn.setAttribute('aria-pressed', unit === 'celsius');
    fahrenheitBtn.classList.toggle('active', unit === 'fahrenheit');
    fahrenheitBtn.setAttribute('aria-pressed', unit === 'fahrenheit');

    localStorage.setItem('unit', unit);
    updateUI(); // Re-render temperature
}

// --- UI Helper Functions ---
function showLoader() {
    // Keep all content visible; just show overlay loader and hide error
    errorMessage.classList.add('hidden');
    loader.classList.remove('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
    // Content stays visible at all times
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    // Do not hide existing content; keep previous data on screen
    loader.classList.add('hidden');
}

function switchTab(btn) {
    // Deactivate all buttons and activate the clicked one
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.target;

    // Map data-target values to their corresponding section elements
    const sections = {
        overview: [weatherContent, dailyForecastContainer, hourlyForecastContainer, extraDetailsContainer, newsContainer],
        hourly: [hourlyForecastContainer],
        daily: [dailyForecastContainer],
        details: [extraDetailsContainer],
        news: [newsContainer]
    };

    // Get a unique list of all manageable sections
    const allSections = [...new Set(Object.values(sections).flat())];

    // Determine which sections to show for the active tab
    const sectionsToShow = sections[target] || [];

    // Toggle visibility for all sections
    allSections.forEach(section => {
        if (!section) return; // Skip if an element is not found
        const shouldShow = sectionsToShow.includes(section);
        section.classList.toggle('hidden', !shouldShow);
    });
}

// --- Data and Formatting Helpers ---
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString(DEFAULT_LOCALE, { hour: 'numeric', minute: '2-digit', hour12: true });
}

function getFromCache(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const isExpired = (Date.now() - item.timestamp) > CACHE_DURATION_MS;

    if (isExpired) {
        localStorage.removeItem(key); // Clean up expired cache
        return null;
    }

    // Populate app state from cache
    appState.currentWeather = item.data.currentWeather;
    appState.forecast = item.data.forecast;
    appState.hourlyData = item.data.hourly;
    return item.data;
}

function updateExtraDetailsUI() {
    if (!appState.currentWeather || !appState.forecast) return;
    const { apparent_temperature, surface_pressure, visibility } = appState.currentWeather;
    const { uv_index_max = [], sunrise = [], sunset = [] } = appState.forecast;

    const feelsLikeTemp = appState.unit === 'celsius' 
        ? Math.round(apparent_temperature) 
        : Math.round(celsiusToFahrenheit(apparent_temperature));

    const details = [
        {
            label: 'Feels Like',
            value: `${feelsLikeTemp}°`
        },
        {
            label: 'UV Index',
            value: `${uv_index_max.length ? Math.round(uv_index_max[0]) : '--'}`
        },
        {
            label: 'Pressure',
            value: `${Math.round(surface_pressure)} hPa`
        },
        {
            label: 'Visibility',
            value: `${(visibility / 1000).toFixed(1)} km`
        },
        {
            label: 'Sunrise',
            value: sunrise.length ? new Date(sunrise[0]).toLocaleTimeString(DEFAULT_LOCALE, { hour: '2-digit', minute: '2-digit' }) : '--'
        },
        {
            label: 'Sunset',
            value: sunset.length ? new Date(sunset[0]).toLocaleTimeString(DEFAULT_LOCALE, { hour: '2-digit', minute: '2-digit' }) : '--'
        },
    ];

    extraDetailsEl.innerHTML = details.map(detail => `
        <div class="extra-detail-item">
            <div class="label">${detail.label}</div>
            <div class="value">${detail.value}</div>
        </div>
    `).join('');
}

function updateWeatherNewsUI() {
    const { time, weather_code, wind_speed_10m_max, precipitation_probability_max } = appState.forecast;
    const newsItems = [];
    const MAX_NEWS = 3;

    // Check for significant weather events in the next 5 days
    for (let i = 1; i < time.length && newsItems.length < MAX_NEWS; i++) {
        const day = new Date(time[i]).toLocaleDateString('en-US', { weekday: 'long' });
        const code = weather_code[i];

        // Thunderstorm
        if (code >= 95) {
            newsItems.push(`Potential for thunderstorms on ${day}.`);
            continue;
        }
        // Heavy Rain/Snow
        if (code === 65 || code === 75 || code === 82) {
            newsItems.push(`Heavy precipitation expected on ${day}.`);
            continue;
        }
        // High wind speed
        if (wind_speed_10m_max[i] > 40) { // e.g., > 40 km/h
            newsItems.push(`Strong winds forecast for ${day}.`);
            continue;
        }
        // High chance of rain
        if (precipitation_probability_max[i] > 75) {
            newsItems.push(`High probability of rain on ${day} (${precipitation_probability_max[i]}%).`);
            continue;
        }
    }

    if (newsItems.length === 0) {
        newsContentEl.innerHTML = `<div class="news-item" style="background-color: rgba(0,0,0,0.02); border-left-color: #2ecc71;">No significant weather events expected.</div>`;
    } else {
        newsContentEl.innerHTML = newsItems.map(item => `
            <div class="news-item">
                ${icons.warning}
                <span>${item}</span>
            </div>
        `).join('');
    }
}

// Fetch Arabic weather news for current city using Google News RSS via AllOrigins (no API key)
async function loadNews() {
    try {
        if (!appState?.currentWeather?.name) return;
        const city = appState.currentWeather.name;
        const q = encodeURIComponent(`طقس ${city}`);
        const rss = `https://news.google.com/rss/search?q=${q}&hl=ar&gl=EG&ceid=EG:ar`;
        const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('RSS fetch failed');
        const xml = await res.text();
        const doc = new DOMParser().parseFromString(xml, 'application/xml');
        const items = Array.from(doc.querySelectorAll('item')).slice(0, 5);
        if (!items.length) throw new Error('No RSS items');
        newsContentEl.innerHTML = items.map(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '#';
            const pub = item.querySelector('pubDate')?.textContent || '';
            const when = pub ? new Date(pub).toLocaleString('ar-EG') : '';
            return `
                <a class="news-item" href="${link}" target="_blank" rel="noopener">
                    ${icons.warning}
                    <span>${title}</span>
                    <span style="margin-inline-start:auto; color: var(--secondary-text); font-size:.8rem;">${when}</span>
                </a>
            `;
        }).join('');
    } catch (e) {
        // Fallback to synthesized highlights if RSS fails
        updateWeatherNewsUI();
    }
}

function updateHourlyForecastUI() {
    // Use hourly data from state directly; fallback to forecast.hourly if available
    const h = appState.hourlyData || appState.forecast?.hourly;
    if (!h) { hourlyForecastEl.innerHTML = ''; return; }
    const times = Array.isArray(h.time) ? h.time : [];
    const temps = Array.isArray(h.temperature_2m) ? h.temperature_2m : [];
    const codes = Array.isArray(h.weather_code) ? h.weather_code : [];

    hourlyForecastEl.innerHTML = '';
    const MAX = Math.min(12, times.length);
    for (let i = 0; i < MAX; i++) {
        const time = new Date(times[i]).toLocaleTimeString(DEFAULT_LOCALE, { hour: '2-digit' });
        const tempC = Math.round(temps[i]);
        const temp = appState.unit === 'celsius' ? tempC : Math.round(celsiusToFahrenheit(tempC));
        const icon = getWeatherIcon(codes[i]);
        const item = `
            <div class="hour">
                <div class="t">${time}</div>
                <div class="i">${icon}</div>
                <div class="d">${temp}°</div>
            </div>
        `;
        hourlyForecastEl.innerHTML += item;
    }
}

function updateDailyForecastUI() {
    const { time = [], temperature_2m_max = [], temperature_2m_min = [], weather_code = [], precipitation_probability_max = [], wind_speed_10m_max = [], uv_index_max = [] } = appState.forecast || {};
    dailyForecastEl.innerHTML = ''; // Clear previous forecast

    // Show forecast for the next 5 days (index 1 to 5)
    for (let i = 1; i < Math.min(6, time.length); i++) {
        const day = new Date(time[i]).toLocaleDateString(DEFAULT_LOCALE, { weekday: 'short' });

        const maxTempC = Math.round(temperature_2m_max[i]);
        const minTempC = Math.round(temperature_2m_min[i]);

        const maxTemp = appState.unit === 'celsius' ? maxTempC : Math.round(celsiusToFahrenheit(maxTempC));
        const minTemp = appState.unit === 'celsius' ? minTempC : Math.round(celsiusToFahrenheit(minTempC));

        const precipProb = precipitation_probability_max[i] ?? 0;
        const windSpeed = Math.round(wind_speed_10m_max[i] ?? 0);
        const uvIndex = Math.round(uv_index_max[i] ?? 0);

        const forecastItemHTML = `
            <div class="forecast-item">
                <div class="day">${day}</div>
                ${getWeatherIcon(weather_code[i])}
                <div class="temps">${maxTemp}° / ${minTemp}°</div>
                <div class="forecast-details-extra">
                    <div class="forecast-detail-item" title="Precipitation Probability">
                        ${icons.precipitation}
                        <span>${precipProb}%</span>
                    </div>
                    <div class="forecast-detail-item" title="Max Wind Speed">
                        ${icons.wind}
                        <span>${windSpeed} km/h</span>
                    </div>
                    <div class="forecast-detail-item" title="Max UV Index">
                        ${icons.uv}
                        <span>${uvIndex}</span>
                    </div>
                </div>
            </div>
        `;
        dailyForecastEl.innerHTML += forecastItemHTML;
    }
}

function setCache(key, data) {
    const item = {
        data: data,
        timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWeatherDescription(code) {
    const descriptions = {
        0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
        45: 'Fog', 48: 'Depositing rime fog',
        51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
        61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
        71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
        80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
        95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
    };
    return descriptions[code] || 'Unknown weather';
}

function getWeatherBackground(code) {
    // Using Unsplash for dynamic background images based on weather.
    const baseUrl = 'https://source.unsplash.com/1920x1080/?';
    const backgrounds = {
        clear: `${baseUrl}clear,sky`,
        cloudy: `${baseUrl}cloudy,sky`,
        rain: `${baseUrl}rain,storm`,
        snow: `${baseUrl}snow,winter`,
        thunderstorm: `${baseUrl}thunderstorm,lightning`,
        fog: `${baseUrl}fog,mist`,
        default: `${baseUrl}weather`
    };

    if ([0, 1].includes(code)) return backgrounds.clear;
    if ([2, 3].includes(code)) return backgrounds.cloudy;
    if ([45, 48].includes(code)) return backgrounds.fog;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return backgrounds.rain; // Rain, Drizzle, Showers
    if (code >= 71 && code <= 77) return backgrounds.snow; // Snow
    if (code >= 95 && code <= 99) return backgrounds.thunderstorm;
    return backgrounds.default;
}

function getWeatherIcon(code) {
    if ([0, 1].includes(code)) return icons.sun;
    if ([2, 3].includes(code)) return icons.cloud;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return icons.rain;
    if (code >= 71 && code <= 77) return icons.snow;
    if (code >= 95 && code <= 99) return icons.thunderstorm;
    return icons.cloud; // Default
}
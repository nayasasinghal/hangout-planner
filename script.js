// ===================================================
// OUTSY HANGOUT FINDER - CORE SCRIPT
// Real Location Search, Distance, Maps Directions,
// Persistent Auth, Favourites & Hangout Plans
// ===================================================

// Default user coordinates (Bandra, Mumbai) if GPS is pending
let userCoords = {
    lat: 19.0596,
    lon: 72.8295,
    isLive: false
};

// ===================================================
// 1. DATA REPOSITORY & CURATED PLACES
// ===================================================

const CURATED_PLACES = [
    {
        id: "p1",
        name: "Subko Coffee Roastery & Craft Bakehouse",
        category: "cafe",
        categoryLabel: "☕ Café",
        location: "Chapel Road, Bandra West, Mumbai",
        price: "₹350 - ₹700",
        rating: "4.8",
        reviews: "340",
        lat: 19.0544,
        lon: 72.8286,
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80",
        description: "Artisan specialty roastery with fresh baked sourdough, warm rustic wooden vibes, and cozy seating."
    },
    {
        id: "p2",
        name: "The Gourmet Burger Club & Bistro",
        category: "food",
        categoryLabel: "🍔 Food",
        location: "Lokhandwala, Andheri West, Mumbai",
        price: "₹400 - ₹850",
        rating: "4.7",
        reviews: "215",
        lat: 19.1416,
        lon: 72.8252,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
        description: "Juicy handcrafted smash burgers, loaded truffle fries, craft shakes, and energetic youth vibes."
    },
    {
        id: "p3",
        name: "Smaaash Neon Arena & Laser Tag",
        category: "gaming",
        categoryLabel: "🎮 Gaming",
        location: "Kamala Mills, Lower Parel, Mumbai",
        price: "₹700 - ₹1600",
        rating: "4.6",
        reviews: "490",
        lat: 18.9986,
        lon: 72.8286,
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
        description: "Multi-level arcade wonderland, neon bowling alleys, VR rollercoasters, and high-energy laser tag."
    },
    {
        id: "p4",
        name: "PVR Superplex & Gourmet Cinema Lounge",
        category: "movies",
        categoryLabel: "🎬 Movies",
        location: "Hiranandani Gardens, Powai, Mumbai",
        price: "₹450 - ₹1200",
        rating: "4.9",
        reviews: "310",
        lat: 19.1197,
        lon: 72.9051,
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",
        description: "Ultra-luxurious recliners, IMAX laser screen, gourmet caramel popcorn, and top blockbuster premieres."
    },
    {
        id: "p5",
        name: "Sanjay Gandhi National Park & Kanheri Trail",
        category: "outdoors",
        categoryLabel: "🌳 Outdoors",
        location: "Borivali East, Mumbai",
        price: "Under ₹300",
        rating: "4.7",
        reviews: "820",
        lat: 19.2312,
        lon: 72.8687,
        image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=700&q=80",
        description: "Bicycle trails through lush greenery, ancient rock-cut Kanheri caves, deer spotting, and fresh air picnic lawns."
    },
    {
        id: "p6",
        name: "Phoenix Palladium & Sky Terrace",
        category: "shopping",
        categoryLabel: "🛍️ Shopping",
        location: "Lower Parel, Mumbai",
        price: "₹800 - ₹2500",
        rating: "4.8",
        reviews: "640",
        lat: 18.9953,
        lon: 72.8242,
        image: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=700&q=80",
        description: "Premium retail shops, international fashion flagships, open-air cafes, and vibrant weekend popups."
    },
    {
        id: "p7",
        name: "AntiSocial Underground & Live Gigs",
        category: "music",
        categoryLabel: "🎵 Music",
        location: "Todi Mill, Lower Parel, Mumbai",
        price: "₹600 - ₹1500",
        rating: "4.7",
        reviews: "380",
        lat: 18.9926,
        lon: 72.8258,
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=700&q=80",
        description: "The capital of indie gigs, electronic DJs, vibrant youth crowd, and lively acoustic open mic nights."
    },
    {
        id: "p8",
        name: "Carter Road Promenade & Sunset Seaface",
        category: "outdoors",
        categoryLabel: "🌳 Outdoors",
        location: "Bandra West Seaface, Mumbai",
        price: "Under ₹300",
        rating: "4.9",
        reviews: "1200",
        lat: 19.0673,
        lon: 72.8228,
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=700&q=80",
        description: "Seafront breeze, sunset views, skateboard park, street musicians, and cold coffee stands."
    },
    {
        id: "p9",
        name: "Timezone VR & Bowling Center",
        category: "gaming",
        categoryLabel: "🎮 Gaming",
        location: "Inorbit Mall, Malad West, Mumbai",
        price: "₹500 - ₹1200",
        rating: "4.6",
        reviews: "350",
        lat: 19.1860,
        lon: 72.8485,
        image: "https://images.unsplash.com/photo-1545640129-3733ef52f36f?auto=format&fit=crop&w=700&q=80",
        description: "Glow bowling, virtual reality simulators, prize redemption tickets, and interactive fun with friends."
    },
    {
        id: "p10",
        name: "Le 15 Pâtisserie & French Macaron Parlour",
        category: "cafe",
        categoryLabel: "☕ Café",
        location: "Colaba Causeway, South Mumbai",
        price: "₹350 - ₹750",
        rating: "4.8",
        reviews: "290",
        lat: 18.9220,
        lon: 72.8320,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80",
        description: "Pastel Parisian aesthetics, award-winning macarons, sea salt hot chocolate, and Instagram-worthy corners."
    }
];

let activePlacesList = [...CURATED_PLACES];
let currentFilterCategory = "all";

// ===================================================
// 2. DISTANCE (HAVERSINE) & GOOGLE MAPS DIRECTIONS
// ===================================================

function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return "Near you";
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;

    if (dist < 1) {
        return `${Math.round(dist * 1000)} m away`;
    }
    return `${dist.toFixed(1)} km away`;
}

function getGoogleMapsUrl(place) {
    if (userCoords.isLive && userCoords.lat && userCoords.lon) {
        return `https://www.google.com/maps/dir/?api=1&origin=${userCoords.lat},${userCoords.lon}&destination=${place.lat},${place.lon}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place.name + ', ' + place.location)}`;
}

// Request real browser geolocation
function initGeolocation() {
    const btnGetLocation = document.getElementById("btnGetLocation");
    const locationStatus = document.getElementById("locationStatus");

    if (!btnGetLocation) return;

    btnGetLocation.addEventListener("click", function() {
        if (!navigator.geolocation) {
            showToast("Geolocation is not supported by your browser.", "error");
            return;
        }

        btnGetLocation.innerHTML = `<span>⏳</span> Detecting location...`;

        navigator.geolocation.getCurrentPosition(
            function(position) {
                userCoords.lat = position.coords.latitude;
                userCoords.lon = position.coords.longitude;
                userCoords.isLive = true;

                btnGetLocation.innerHTML = `<span>📍</span> Using Live GPS`;
                btnGetLocation.style.background = "#ecfdf5";
                btnGetLocation.style.borderColor = "#10b981";
                btnGetLocation.style.color = "#047857";

                if (locationStatus) {
                    locationStatus.innerHTML = `<span>✅</span> Live GPS detected (${userCoords.lat.toFixed(2)}°, ${userCoords.lon.toFixed(2)}°)`;
                }

                showToast("📍 Location detected! Places sorted by nearest.", "success");
                sortAndRenderPlaces();
            },
            function(error) {
                btnGetLocation.innerHTML = `<span>📍</span> Use My Current Location`;
                let msg = "Could not detect location. Please check browser permissions.";
                if (error.code === error.PERMISSION_DENIED) {
                    msg = "Location permission was denied. Using default area.";
                }
                showToast(msg, "info");
            },
            { timeout: 8000 }
        );
    });
}

function sortAndRenderPlaces() {
    // Sort activePlacesList by calculated distance to userCoords
    activePlacesList.sort(function(a, b) {
        const distA = getNumericDistance(userCoords.lat, userCoords.lon, a.lat, a.lon);
        const distB = getNumericDistance(userCoords.lat, userCoords.lon, b.lat, b.lon);
        return distA - distB;
    });

    renderPlaces(activePlacesList);
}

function getNumericDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 99999;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// ===================================================
// 3. STORAGE & STATE HELPERS (USERS, FAVOURITES, PLANS)
// ===================================================

function getStorage(key, defaultVal) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultVal;
    } catch (e) {
        return defaultVal;
    }
}

function setStorage(key, val) {
    try {
        localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
        console.error("Storage write error", e);
    }
}

// Pre-seed demo user if none exists
(function initDefaultUsers() {
    const users = getStorage("outsy_users", []);
    if (!users.some(u => u.email === "demo@outsy.com")) {
        users.push({
            id: "u_demo",
            name: "Alex Demo",
            email: "demo@outsy.com",
            password: "password123"
        });
        setStorage("outsy_users", users);
    }
})();

function getCurrentUser() {
    return getStorage("outsy_currentUser", null);
}

function getFavourites() {
    return getStorage("outsy_favourites", []);
}

function getPlans() {
    return getStorage("outsy_plans", []);
}

// Update badges in navbar on every page load
function updateNavStatus() {
    const favs = getFavourites();
    const plans = getPlans();
    const user = getCurrentUser();

    const navFavCount = document.getElementById("navFavCount");
    if (navFavCount) {
        if (favs.length > 0) {
            navFavCount.textContent = favs.length;
            navFavCount.style.display = "inline-flex";
        } else {
            navFavCount.style.display = "none";
        }
    }

    const navPlanCount = document.getElementById("navPlanCount");
    if (navPlanCount) {
        if (plans.length > 0) {
            navPlanCount.textContent = plans.length;
            navPlanCount.style.display = "inline-flex";
        } else {
            navPlanCount.style.display = "none";
        }
    }

    const authContainer = document.getElementById("navAuthContainer");
    if (authContainer) {
        if (user) {
            const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";
            authContainer.innerHTML = `
                <div class="nav-auth-user">
                    <div class="user-avatar-badge">${initial}</div>
                    <span>${user.name}</span>
                    <button type="button" class="btn-nav-logout" onclick="logoutUser()">Log Out</button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn-nav-login">Sign In</a>
            `;
        }
    }
}

function logoutUser() {
    localStorage.removeItem("outsy_currentUser");
    showToast("Signed out successfully", "info");
    updateNavStatus();
    if (window.location.pathname.includes("login.html")) {
        window.location.reload();
    }
}

// Floating Toast Notification
function showToast(message, type = "info") {
    let container = document.getElementById("toastContainer");
    if (!container) {
        container = document.createElement("div");
        container.id = "toastContainer";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "success" : ""}`;
    toast.innerHTML = `<span>${type === "success" ? "✅" : "💡"}</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.style.transition = "0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}

// ===================================================
// 4. EXPLORE PAGE & REAL SEARCH (OPENSTREETMAP NOMINATIM)
// ===================================================

function renderPlaces(places) {
    const container = document.getElementById("placesContainer");
    if (!container) return;

    if (!places || places.length === 0) {
        container.innerHTML = `
            <div class="empty-places">
                <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
                <h3>No places match your search</h3>
                <p style="color: var(--text-muted); margin-top: 6px;">Try a different search term or select "ALL".</p>
            </div>
        `;
        return;
    }

    const favourites = getFavourites();

    container.innerHTML = places.map(place => {
        const isFav = favourites.some(f => f.id === place.id || f.name === place.name);
        const distanceStr = calculateDistance(userCoords.lat, userCoords.lon, place.lat, place.lon);
        const directionsUrl = getGoogleMapsUrl(place);

        return `
            <article class="place-card" data-category="${place.category}" data-id="${place.id}">
                <div class="place-image-wrap">
                    <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80'">
                    <span class="place-category-badge">${place.categoryLabel || place.category}</span>
                    <span class="place-rating-badge">⭐ ${place.rating || "4.7"}</span>
                    <span class="place-distance-badge">📍 ${distanceStr}</span>
                </div>

                <div class="place-info">
                    <h3>${place.name}</h3>
                    <div class="place-location-line">📍 ${place.location}</div>
                    <span class="place-price-tag">💰 ${place.price}</span>
                    <p class="place-desc">${place.description}</p>

                    <div class="place-actions">
                        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-directions">
                            🗺️ Directions
                        </a>
                        <button type="button" class="fav-btn ${isFav ? 'favorited' : ''}" onclick="toggleFavouritePlace('${place.id}')">
                            ${isFav ? '❤️ Saved' : '🤍 Favourite'}
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

// Category Filtering
function filterPlaces(category) {
    currentFilterCategory = category;

    // Update active filter button
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if ((category === "all" && text.includes("all")) || text.includes(category)) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    const searchInput = document.getElementById("searchInput");
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    applyFiltersAndSearch(query, category);
}

function applyFiltersAndSearch(query, category) {
    let filtered = activePlacesList.filter(p => {
        const matchCategory = (category === "all" || p.category === category);
        const matchQuery = !query ||
            p.name.toLowerCase().includes(query) ||
            p.location.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query);
        return matchCategory && matchQuery;
    });

    renderPlaces(filtered);
}

// Real Place Search using OpenStreetMap Nominatim API
async function performRealLocationSearch(query) {
    if (!query) return;

    const container = document.getElementById("placesContainer");
    if (container) {
        container.innerHTML = `
            <div class="loading-places">
                <div class="loading-spinner"></div>
                <h3>Searching live places for "${query}"...</h3>
                <p style="color: var(--text-muted); font-size: 13px; margin-top: 6px;">Querying real location coordinates & maps</p>
            </div>
        `;
    }

    try {
        // OpenStreetMap Nominatim API endpoint
        const endpoint = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=8`;
        const res = await fetch(endpoint, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!res.ok) throw new Error("Search service unavailable");

        const data = await res.json();

        if (data && data.length > 0) {
            // Map live OSM places into our card format
            const categoryImages = {
                cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=700&q=80",
                food: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80",
                restaurant: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
                movies: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",
                cinema: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",
                gaming: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=700&q=80",
                outdoors: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=700&q=80",
                park: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=700&q=80",
                shopping: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=700&q=80",
                mall: "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=700&q=80"
            };

            const livePlaces = data.map((item, idx) => {
                const type = (item.type || item.class || "place").toLowerCase();
                let cat = "food";
                let catLabel = "🍔 Food";
                let img = categoryImages.food;

                if (type.includes("cafe") || type.includes("coffee")) {
                    cat = "cafe"; catLabel = "☕ Café"; img = categoryImages.cafe;
                } else if (type.includes("cinema") || type.includes("theatre")) {
                    cat = "movies"; catLabel = "🎬 Movies"; img = categoryImages.cinema;
                } else if (type.includes("game") || type.includes("arcade")) {
                    cat = "gaming"; catLabel = "🎮 Gaming"; img = categoryImages.gaming;
                } else if (type.includes("park") || type.includes("garden") || type.includes("leisure")) {
                    cat = "outdoors"; catLabel = "🌳 Outdoors"; img = categoryImages.park;
                } else if (type.includes("shop") || type.includes("mall")) {
                    cat = "shopping"; catLabel = "🛍️ Shopping"; img = categoryImages.mall;
                }

                // Clean name
                const shortName = item.name || item.display_name.split(",")[0];
                const addressSnippet = item.display_name.split(",").slice(0, 3).join(",");

                return {
                    id: `osm_${item.place_id || idx}`,
                    name: shortName,
                    category: cat,
                    categoryLabel: catLabel,
                    location: addressSnippet,
                    price: "₹300 - ₹800",
                    rating: "4.7",
                    reviews: "Real OSM Location",
                    lat: parseFloat(item.lat),
                    lon: parseFloat(item.lon),
                    image: img,
                    description: `Real location discovered via OpenStreetMap: ${item.display_name}`
                };
            });

            // Merge with matching curated places
            const localMatches = CURATED_PLACES.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.location.toLowerCase().includes(query.toLowerCase())
            );

            activePlacesList = [...localMatches, ...livePlaces];
            showToast(`Found ${activePlacesList.length} real locations!`, "success");
            renderPlaces(activePlacesList);
        } else {
            // Fallback to local curated search
            fallbackLocalSearch(query);
        }
    } catch (err) {
        console.warn("Live API error, falling back to local database:", err);
        fallbackLocalSearch(query);
    }
}

function fallbackLocalSearch(query) {
    const matches = CURATED_PLACES.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );
    activePlacesList = matches.length > 0 ? matches : CURATED_PLACES;
    renderPlaces(matches);
    if (matches.length > 0) {
        showToast(`Showing ${matches.length} curated matches`, "info");
    }
}

// Initialise Explore Page
function initExplorePage() {
    const searchInput = document.getElementById("searchInput");
    const searchSubmitBtn = document.getElementById("searchSubmitBtn");

    if (!searchInput) return;

    // Check URL parameters for ?q= or ?category=
    const urlParams = new URLSearchParams(window.location.search);
    const paramQ = urlParams.get("q");
    const paramCategory = urlParams.get("category");

    if (paramQ) {
        searchInput.value = paramQ;
        performRealLocationSearch(paramQ);
    } else if (paramCategory) {
        filterPlaces(paramCategory);
    } else {
        renderPlaces(CURATED_PLACES);
    }

    // Input listeners
    let debounceTimer;
    searchInput.addEventListener("input", function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const val = searchInput.value.trim();
            if (val.length >= 2) {
                applyFiltersAndSearch(val, currentFilterCategory);
            } else if (val.length === 0) {
                activePlacesList = [...CURATED_PLACES];
                filterPlaces(currentFilterCategory);
            }
        }, 300);
    });

    searchInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const val = searchInput.value.trim();
            if (val) performRealLocationSearch(val);
        }
    });

    if (searchSubmitBtn) {
        searchSubmitBtn.addEventListener("click", function() {
            const val = searchInput.value.trim();
            if (val) performRealLocationSearch(val);
        });
    }

    initGeolocation();
}

// ===================================================
// 5. PERSISTENT FAVOURITES
// ===================================================

function toggleFavouritePlace(placeId) {
    const place = activePlacesList.find(p => p.id === placeId) ||
                  CURATED_PLACES.find(p => p.id === placeId);
    if (!place) return;

    let favs = getFavourites();
    const existingIndex = favs.findIndex(f => f.id === place.id || f.name === place.name);

    if (existingIndex !== -1) {
        favs.splice(existingIndex, 1);
        setStorage("outsy_favourites", favs);
        showToast(`Removed "${place.name}" from Favourites 💔`, "info");
    } else {
        favs.push(place);
        setStorage("outsy_favourites", favs);
        showToast(`Saved "${place.name}" to Favourites! ❤️`, "success");
    }

    updateNavStatus();

    // Re-render if on Explore page
    if (document.getElementById("placesContainer")) {
        renderPlaces(activePlacesList);
    }

    // Re-render if on Favourites page
    if (document.getElementById("favContainer")) {
        renderFavourites();
    }
}

function renderFavourites() {
    const favContainer = document.getElementById("favContainer");
    if (!favContainer) return;

    const favs = getFavourites();

    if (favs.length === 0) {
        favContainer.innerHTML = `
            <div class="empty-fav">
                <div class="empty-icon">💔</div>
                <h3>No favourites saved yet!</h3>
                <p>
                    Browse trending spots on Explore and click "Favourite" to save them to your permanent list.
                </p>
                <a href="explore.html" class="main-button">
                    🔍 EXPLORE PLACES
                </a>
            </div>
        `;
        return;
    }

    favContainer.innerHTML = favs.map((place, idx) => {
        const directionsUrl = getGoogleMapsUrl(place);
        const distanceStr = calculateDistance(userCoords.lat, userCoords.lon, place.lat, place.lon);

        return `
            <article class="saved-card" data-id="${place.id}">
                <div class="saved-image-wrap">
                    <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=80'">
                    <span class="place-category-badge">${place.categoryLabel || place.category}</span>
                    <span class="place-distance-badge">📍 ${distanceStr}</span>
                </div>

                <div class="saved-info">
                    <h3>${place.name}</h3>
                    <div class="place-location-line">📍 ${place.location}</div>
                    <span class="place-price-tag">💰 ${place.price}</span>
                    <p class="place-desc">${place.description}</p>

                    <div class="place-actions">
                        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-directions">
                            🗺️ Directions
                        </a>
                        <button type="button" class="remove-fav" onclick="removeFavouriteByIndex(${idx})">
                            ❌ Remove
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function removeFavouriteByIndex(index) {
    let favs = getFavourites();
    if (index >= 0 && index < favs.length) {
        const removed = favs.splice(index, 1);
        setStorage("outsy_favourites", favs);
        showToast(`Removed "${removed[0].name}"`, "info");
        updateNavStatus();
        renderFavourites();
    }
}

// Backwards compatibility
function removeFavourite(index) {
    removeFavouriteByIndex(index);
}

// ===================================================
// 6. PERSISTENT HANGOUT PLANS
// ===================================================

function initPlanner() {
    const planForm = document.getElementById("planForm");
    const planResult = document.getElementById("planResult");

    renderSavedPlans();

    if (!planForm) return;

    planForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const planName = document.getElementById("planName").value.trim();
        const planPlace = document.getElementById("planPlace").value.trim();
        const planDate = document.getElementById("planDate").value;
        const planTime = document.getElementById("planTime").value;
        const people = document.getElementById("people").value;
        const budget = document.getElementById("planBudget").value;
        const notes = document.getElementById("notes").value.trim();

        if (!planName || !planPlace || !planDate || !planTime || !people || !budget) {
            showToast("Please fill in all required fields.", "error");
            return;
        }

        const newPlan = {
            id: "plan_" + Date.now(),
            name: planName,
            place: planPlace,
            date: planDate,
            time: planTime,
            people: people,
            budget: budget,
            notes: notes,
            createdAt: new Date().toISOString()
        };

        const plans = getPlans();
        plans.unshift(newPlan);
        setStorage("outsy_plans", plans);

        showToast("✨ Hangout Plan saved successfully!", "success");
        planForm.reset();
        updateNavStatus();
        renderSavedPlans();
    });
}

function renderSavedPlans() {
    const container = document.getElementById("planResult");
    if (!container) return;

    const plans = getPlans();

    if (plans.length === 0) {
        container.innerHTML = `
            <div class="empty-fav">
                <div class="empty-icon">📅</div>
                <h3>No hangout plans scheduled yet!</h3>
                <p>Fill in the form on the left to coordinate your date, venue, budget, and squad.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="plans-list-container">
            ${plans.map((p, idx) => {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.place)}`;
                return `
                    <div class="plan-item-card" data-plan-id="${p.id}">
                        <div class="plan-item-header">
                            <div>
                                <span class="plan-date-badge">📅 ${formatPlanDate(p.date)} at ${p.time}</span>
                                <h3 class="plan-item-title" style="margin-top: 8px;">${p.name}</h3>
                            </div>
                        </div>

                        <div class="plan-meta-grid">
                            <div class="plan-meta-item">
                                <strong>Venue</strong>
                                📍 ${p.place}
                            </div>
                            <div class="plan-meta-item">
                                <strong>Squad Size</strong>
                                👥 ${p.people} Friends
                            </div>
                            <div class="plan-meta-item">
                                <strong>Budget / Person</strong>
                                💰 ${p.budget}
                            </div>
                        </div>

                        ${p.notes ? `<div class="plan-notes-snippet">📝 "${p.notes}"</div>` : ''}

                        <div class="plan-card-actions">
                            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-plan-action btn-plan-directions">
                                🗺️ Directions
                            </a>
                            <button type="button" class="btn-plan-action btn-plan-share" onclick="sharePlan('${p.id}')">
                                📱 Share Plan
                            </button>
                            <button type="button" class="btn-plan-action btn-plan-delete" onclick="deletePlan('${p.id}')">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

function formatPlanDate(dateStr) {
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch (e) {
        return dateStr;
    }
}

function sharePlan(planId) {
    const plans = getPlans();
    const p = plans.find(plan => plan.id === planId);
    if (!p) return;

    const text = `🎉 Hey squad! Here's our Hangout Plan:\n` +
                 `📍 Place: ${p.place}\n` +
                 `📅 Date: ${p.date} at ${p.time}\n` +
                 `👥 Friends: ${p.people} people\n` +
                 `💰 Budget: ${p.budget}\n` +
                 (p.notes ? `📝 Note: ${p.notes}\n` : '') +
                 `🗺️ Maps: https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(p.place)}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast("Plan details copied to clipboard! Share on WhatsApp 📱", "success");
        }).catch(() => {
            alert(text);
        });
    } else {
        alert(text);
    }
}

function deletePlan(planId) {
    let plans = getPlans();
    plans = plans.filter(p => p.id !== planId);
    setStorage("outsy_plans", plans);
    showToast("Plan deleted", "info");
    updateNavStatus();
    renderSavedPlans();
}

// ===================================================
// 7. AUTH (LOGIN, SIGNUP & FORGOT PASSWORD)
// ===================================================

function switchAuthTab(tab) {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const forgotForm = document.getElementById("forgotForm");
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabSignupBtn = document.getElementById("tabSignupBtn");

    if (!loginForm || !signupForm || !forgotForm) return;

    if (tab === "login") {
        loginForm.style.display = "block";
        signupForm.style.display = "none";
        forgotForm.style.display = "none";
        if (tabLoginBtn) tabLoginBtn.classList.add("active");
        if (tabSignupBtn) tabSignupBtn.classList.remove("active");
    } else if (tab === "signup") {
        loginForm.style.display = "none";
        signupForm.style.display = "block";
        forgotForm.style.display = "none";
        if (tabSignupBtn) tabSignupBtn.classList.add("active");
        if (tabLoginBtn) tabLoginBtn.classList.remove("active");
    } else if (tab === "forgot") {
        loginForm.style.display = "none";
        signupForm.style.display = "none";
        forgotForm.style.display = "block";
        if (tabLoginBtn) tabLoginBtn.classList.remove("active");
        if (tabSignupBtn) tabSignupBtn.classList.remove("active");
    }
}

function initAuth() {
    // 1. Sign In
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("email").value.trim().toLowerCase();
            const password = document.getElementById("password").value;
            const remember = document.getElementById("remember") ? document.getElementById("remember").checked : false;
            const loginMessage = document.getElementById("loginMessage");

            const users = getStorage("outsy_users", []);
            const user = users.find(u => u.email.toLowerCase() === email && u.password === password);

            if (user) {
                setStorage("outsy_currentUser", { id: user.id, name: user.name, email: user.email });
                if (loginMessage) {
                    loginMessage.textContent = `Welcome back, ${user.name}! Redirecting...`;
                    loginMessage.style.color = "var(--brand-emerald)";
                }
                showToast(`Welcome back, ${user.name}!`, "success");
                updateNavStatus();
                setTimeout(() => {
                    window.location.href = "explore.html";
                }, 900);
            } else {
                if (loginMessage) {
                    loginMessage.textContent = "Invalid email or password. Try demo@outsy.com / password123";
                    loginMessage.style.color = "#ef4444";
                }
                showToast("Invalid credentials", "error");
            }
        });
    }

    // 2. Sign Up
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const password = document.getElementById("signupPassword").value;
            const signupMessage = document.getElementById("signupMessage");

            if (!name || !email || !password) {
                if (signupMessage) {
                    signupMessage.textContent = "Please fill in all fields.";
                    signupMessage.style.color = "#ef4444";
                }
                return;
            }

            if (password.length < 6) {
                if (signupMessage) {
                    signupMessage.textContent = "Password must be at least 6 characters.";
                    signupMessage.style.color = "#ef4444";
                }
                return;
            }

            const users = getStorage("outsy_users", []);
            if (users.some(u => u.email.toLowerCase() === email)) {
                if (signupMessage) {
                    signupMessage.textContent = "An account with this email already exists.";
                    signupMessage.style.color = "#ef4444";
                }
                return;
            }

            const newUser = {
                id: "u_" + Date.now(),
                name: name,
                email: email,
                password: password
            };

            users.push(newUser);
            setStorage("outsy_users", users);
            setStorage("outsy_currentUser", { id: newUser.id, name: newUser.name, email: newUser.email });

            if (signupMessage) {
                signupMessage.textContent = `Account created! Welcome ${name}. Redirecting...`;
                signupMessage.style.color = "var(--brand-emerald)";
            }
            showToast(`Account created! Welcome, ${name}!`, "success");
            updateNavStatus();
            setTimeout(() => {
                window.location.href = "explore.html";
            }, 900);
        });
    }

    // 3. Forgot Password
    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.getElementById("forgotEmail").value.trim().toLowerCase();
            const newPassword = document.getElementById("forgotNewPassword").value;
            const forgotMessage = document.getElementById("forgotMessage");

            const users = getStorage("outsy_users", []);
            const userIndex = users.findIndex(u => u.email.toLowerCase() === email);

            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                setStorage("outsy_users", users);
                if (forgotMessage) {
                    forgotMessage.textContent = "Password updated successfully! You can now sign in.";
                    forgotMessage.style.color = "var(--brand-emerald)";
                }
                showToast("Password updated successfully!", "success");
                setTimeout(() => {
                    switchAuthTab("login");
                    document.getElementById("email").value = email;
                    document.getElementById("password").value = newPassword;
                }, 1200);
            } else {
                if (forgotMessage) {
                    forgotMessage.textContent = "No account found with this email. Please check spelling or create an account.";
                    forgotMessage.style.color = "#ef4444";
                }
            }
        });
    }
}

// ===================================================
// 8. VIBEFIND INTERACTIVE QUIZ
// ===================================================

function initVibeFind() {
    const findBtn = document.getElementById("findBtn");
    if (!findBtn) return;

    const optionContainers = document.querySelectorAll(".finder .option-container");
    let selectedCategory = "";
    let selectedBudget = "";
    let selectedMood = "";

    if (optionContainers.length >= 3) {
        // Category options
        const catButtons = optionContainers[0].querySelectorAll(".option");
        catButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                catButtons.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedCategory = btn.textContent.trim();
            });
        });

        // Budget options
        const budgetButtons = optionContainers[1].querySelectorAll(".option");
        budgetButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                budgetButtons.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedBudget = btn.textContent.trim();
            });
        });

        // Mood options
        const moodButtons = optionContainers[2].querySelectorAll(".option");
        moodButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                moodButtons.forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedMood = btn.textContent.trim();
            });
        });
    }

    findBtn.addEventListener("click", function() {
        const result = document.getElementById("result");
        const resultText = document.getElementById("resultText");
        const vibeMatchedPlaces = document.getElementById("vibeMatchedPlaces");

        if (!selectedCategory || !selectedBudget || !selectedMood) {
            showToast("Please pick one option from each of the 3 questions!", "info");
            return;
        }

        result.style.display = "block";
        result.scrollIntoView({ behavior: "smooth" });

        // Map category keyword
        let catKey = "food";
        if (selectedCategory.includes("Café")) catKey = "cafe";
        else if (selectedCategory.includes("Movies")) catKey = "movies";
        else if (selectedCategory.includes("Gaming")) catKey = "gaming";
        else if (selectedCategory.includes("Outdoors")) catKey = "outdoors";
        else if (selectedCategory.includes("Shopping")) catKey = "shopping";
        else if (selectedCategory.includes("Music")) catKey = "music";

        const matches = CURATED_PLACES.filter(p => p.category === catKey);

        resultText.innerHTML = `
            <h3>✨ Your Match: ${selectedCategory} for a ${selectedMood} Vibe!</h3>
            <p>Budget Target: <strong>${selectedBudget}</strong></p>
            <p>Here are top spots recommended for this exact energy:</p>
        `;

        if (vibeMatchedPlaces) {
            vibeMatchedPlaces.innerHTML = matches.map(place => {
                const directionsUrl = getGoogleMapsUrl(place);
                return `
                    <div class="place-card" style="background: white; border-radius: 16px; overflow: hidden;">
                        <div style="height: 140px; overflow: hidden;">
                            <img src="${place.image}" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div style="padding: 16px; color: var(--text-primary);">
                            <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">${place.name}</h4>
                            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">📍 ${place.location}</p>
                            <span class="place-price-tag">💰 ${place.price}</span>
                            <div style="margin-top: 12px; display: flex; gap: 8px;">
                                <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="btn-directions">
                                    🗺️ Directions
                                </a>
                                <a href="explore.html?category=${catKey}" class="main-button" style="padding: 6px 12px; font-size: 11px;">
                                    View in Explore
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }).join("");
        }
    });
}

// ===================================================
// 9. GLOBAL DOM INITIALISATION
// ===================================================

document.addEventListener("DOMContentLoaded", function() {
    updateNavStatus();
    initExplorePage();
    renderFavourites();
    initPlanner();
    initAuth();
    initVibeFind();
});
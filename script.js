
// =========================
// VIBEFIND PAGE
// =========================

const findBtn = document.getElementById("findBtn");

if (findBtn) {

    const optionContainers = document.querySelectorAll(
        ".finder .option-container"
    );

    let selectedCategory = "";
    let selectedBudget = "";
    let selectedMood = "";


    // CATEGORY OPTIONS
    const categoryButtons = optionContainers[0].querySelectorAll(".option");

    categoryButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            categoryButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedCategory = button.textContent.trim();

        });

    });


    // BUDGET OPTIONS
    const budgetButtons = optionContainers[1].querySelectorAll(".option");

    budgetButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            budgetButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedBudget = button.textContent.trim();

        });

    });


    // MOOD OPTIONS
    const moodButtons = optionContainers[2].querySelectorAll(".option");

    moodButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            moodButtons.forEach(function(btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            selectedMood = button.textContent.trim();

        });

    });


    // FIND MY VIBE
    findBtn.addEventListener("click", function() {

        const result = document.getElementById("result");
        const resultText = document.getElementById("resultText");


        // Check if all options are selected
        if (
            selectedCategory === "" ||
            selectedBudget === "" ||
            selectedMood === ""
        ) {

            result.style.display = "block";

            resultText.textContent =
                "Please select your vibe, budget and mood first.";

            return;
        }


        // Suggestions
        let suggestion = "";


        if (selectedCategory.includes("Food")) {

            suggestion =
                "🍔 Try a casual food place with your friends!";

        }
        else if (selectedCategory.includes("Café")) {

            suggestion =
                "☕ A cozy café would be perfect for your hangout!";

        }
        else if (selectedCategory.includes("Movies")) {

            suggestion =
                "🎬 How about watching a movie together?";

        }
        else if (selectedCategory.includes("Gaming")) {

            suggestion =
                "🎮 A gaming zone sounds perfect for some fun!";

        }
        else if (selectedCategory.includes("Outdoors")) {

            suggestion =
                "🌳 Plan an outdoor hangout and enjoy some fresh air!";

        }
        else if (selectedCategory.includes("Shopping")) {

            suggestion =
                "🛍️ Go shopping and grab some food afterwards!";

        }
        else if (selectedCategory.includes("Music")) {

            suggestion =
                "🎵 Find a music spot and enjoy the vibe!";

        }


        // Display result
        result.style.display = "block";

        resultText.innerHTML = `
            <h3>${suggestion}</h3>

            <p>💰 Budget: ${selectedBudget}</p>

            <p>😎 Mood: ${selectedMood}</p>
        `;

    });

}


// =========================
// EXPLORE PAGE
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function() {

        const searchValue = searchInput.value.toLowerCase();

        const places = document.querySelectorAll(".place-card");

        places.forEach(function(place) {

            const placeName = place
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (placeName.includes(searchValue)) {
                place.style.display = "block";
            }
            else {
                place.style.display = "none";
            }

        });

    });

}


// FILTER PLACES

function filterPlaces(category) {

    const places = document.querySelectorAll(".place-card");

    places.forEach(function(place) {

        if (
            category === "all" ||
            place.dataset.category === category
        ) {
            place.style.display = "block";
        }
        else {
            place.style.display = "none";
        }

    });

}


// =========================
// FAVOURITES
// =========================

let favourites =
    JSON.parse(localStorage.getItem("favourites")) || [];


// ADD TO FAVOURITES

const favouriteButtons =
    document.querySelectorAll(".fav-btn");

favouriteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const card = button.closest(".place-card");

        const name =
            card.querySelector("h3").textContent;

        const paragraphs =
            card.querySelectorAll("p");

        const place = {

            name: name,

            category: paragraphs[0].textContent,

            location: paragraphs[1].textContent,

            price: paragraphs[2].textContent,

            description: paragraphs[3].textContent,

            image:
                card.querySelector(".place-image").textContent

        };


        const alreadySaved =
            favourites.some(function(item) {
                return item.name === name;
            });


        if (!alreadySaved) {

            favourites.push(place);

            localStorage.setItem(
                "favourites",
                JSON.stringify(favourites)
            );

            button.textContent = "❤️ Added!";

        }
        else {

            button.textContent =
                "❤️ Already Added";

        }

    });

});


// DISPLAY FAVOURITES

const favContainer =
    document.getElementById("favContainer");

if (favContainer) {

    if (favourites.length === 0) {

        favContainer.innerHTML = `
            <div class="empty-fav">

                <div class="empty-icon">💔</div>

                <h3>No favourites yet!</h3>

                <p>
                    Explore some places and add
                    your favourites to see them here.
                </p>

                <a href="explore.html" class="main-button">
                    🔍 EXPLORE PLACES
                </a>

            </div>
        `;

    }
    else {

        favContainer.innerHTML = "";

        favourites.forEach(function(place, index) {

            const card =
                document.createElement("div");

            card.className = "saved-card";

            card.innerHTML = `
                <div class="saved-image">
                    ${place.image}
                </div>

                <div class="saved-info">

                    <h3>${place.name}</h3>

                    <p>${place.category}</p>
                    <p>${place.location}</p>
                    <p>${place.price}</p>
                    <p>${place.description}</p>

                    <button
                        class="remove-fav"
                        onclick="removeFavourite(${index})">
                        ❌ Remove
                    </button>

                </div>
            `;

            favContainer.appendChild(card);

        });

    }

}


// REMOVE FAVOURITE

function removeFavourite(index) {

    favourites.splice(index, 1);

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    location.reload();

}


// =========================
// LOGIN PAGE
// =========================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const loginMessage =
            document.getElementById("loginMessage");


        if (email === "" || password === "") {

            loginMessage.textContent =
                "Please enter your email and password.";

            loginMessage.style.color = "red";

        }
        else {

            loginMessage.textContent =
                "Login successful! Welcome to VibeFind.";

            loginMessage.style.color = "green";

        }

    });

}


// =========================
// CREATE PLAN
// =========================

const planForm =
    document.getElementById("planForm");

if (planForm) {

    planForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const planName =
            document.getElementById("planName").value;

        const planPlace =
            document.getElementById("planPlace").value;

        const planDate =
            document.getElementById("planDate").value;

        const planTime =
            document.getElementById("planTime").value;

        const people =
            document.getElementById("people").value;

        const budget =
            document.getElementById("planBudget").value;

        const notes =
            document.getElementById("notes").value;

        const planResult =
            document.getElementById("planResult");


        planResult.innerHTML = `

            <div class="saved-card">

                <div class="saved-info">

                    <h3>✨ ${planName}</h3>

                    <p>
                        📍 <strong>Place:</strong>
                        ${planPlace}
                    </p>

                    <p>
                        📅 <strong>Date:</strong>
                        ${planDate}
                    </p>

                    <p>
                        ⏰ <strong>Time:</strong>
                        ${planTime}
                    </p>

                    <p>
                        👥 <strong>People:</strong>
                        ${people}
                    </p>

                    <p>
                        💰 <strong>Budget:</strong>
                        ${budget}
                    </p>

                    <p>
                        📝 <strong>Notes:</strong>
                        ${notes || "No notes added."}
                    </p>

                </div>

            </div>

        `;

    });

}
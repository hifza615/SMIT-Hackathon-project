// QuickServe JavaScript
// Data is stored in LocalStorage.

const providers = [
    {
        name: "TechCare Pro",
        service: "Tech Support",
        location: "DHA Karachi",
        experience: "5 years",
        price: "Rs. 1,500",
        rating: 4.9,
        icon: "💻",
        image: "images/tech.webp"
    },
    {
        name: "LearnWith Sara",
        service: "Home Tutor",
        location: "Clifton Karachi",
        experience: "6 years",
        price: "Rs. 1,200",
        rating: 4.8,
        icon: "📚",
        image: "images/tutor.webp"
    },
    {
        name: "Lens & Light",
        service: "Photographer",
        location: "PECHS Karachi",
        experience: "7 years",
        price: "Rs. 5,000",
        rating: 4.9,
        icon: "📸",
        image: "images/lens.webp"
    },
    {
        name: "FreshNest",
        service: "Home Cleaning",
        location: "Gulshan Karachi",
        experience: "4 years",
        price: "Rs. 1,000",
        rating: 4.7,
        icon: "🧹",
        image: "images/homecleaner.webp"
    },
    {
        name: "ShineRide",
        service: "Car Wash",
        location: "Bahadurabad Karachi",
        experience: "5 years",
        price: "Rs. 800",
        rating: 4.8,
        icon: "🚗",
        image: "images/carwash.webp"
    },
    {
        name: "ColorCraft",
        service: "Painter",
        location: "North Nazimabad",
        experience: "8 years",
        price: "Rs. 2,500",
        rating: 4.8,
        icon: "🎨",
        image: "images/painter.webp"
    }
];

function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function getBookings() {
    return JSON.parse(localStorage.getItem("bookings")) || [];
}

function saveBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function getReviews() {
    return JSON.parse(localStorage.getItem("reviews")) || [];
}

function statusClass(status) {
    return status.toLowerCase().replaceAll(" ", "-");
}

function showAlert(title, text, icon) {

    if (typeof Swal !== "undefined") {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: "Okay"
        });
    }

    alert(title + "\n\n" + text);
    return Promise.resolve();
}


// HERO SLIDER

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

if (slides.length > 0) {

    let currentSlide = 0;

    function showSlide(number) {
        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        slides[number].classList.add("active");
        dots[number].classList.add("active");
    }

    document.getElementById("nextSlide").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.getElementById("prevSlide").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    setInterval(function () {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 4000);
}


// HOME PAGE
const providersBox = document.getElementById("providers");

if (providersBox) {

    const search = document.getElementById("search");
    const category = document.getElementById("category");

    function displayProviders() {

        const searchText = search.value.toLowerCase();
        const selectedCategory = category.value;

        const filteredProviders = providers.filter(function (provider) {

            const matchesSearch =
                provider.name.toLowerCase().includes(searchText) ||
                provider.service.toLowerCase().includes(searchText) ||
                provider.location.toLowerCase().includes(searchText);

            const matchesCategory =
                selectedCategory === "" ||
                provider.service === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        providersBox.innerHTML = "";

        if (filteredProviders.length === 0) {
            providersBox.innerHTML =
                "<div class='empty'>No services found.</div>";
            return;
        }

        filteredProviders.forEach(function (provider) {

            const index = providers.indexOf(provider);

            providersBox.innerHTML += `
                <div class="card">

                    <img class="service-image" src="${provider.image}" alt="${provider.service}">

                    <h3>${provider.name}</h3>

                    <p class="muted">
                        ${provider.service}
                    </p>

                    <p class="muted">
                        📍 ${provider.location}
                    </p>

                    <p>
                        ⭐ ${provider.rating}
                        • ${provider.experience}
                    </p>

                    <p class="price">
                        ${provider.price}
                    </p>

                    <a
                        href="provider-details.html?provider=${index}"
                        class="btn"
                    >
                        View Details
                    </a>

                </div>
            `;
        });
    }

    search.addEventListener("input", displayProviders);
    category.addEventListener("change", displayProviders);

    displayProviders();
}


// PROVIDER DETAILS
const providerDetails = document.getElementById("providerDetails");

if (providerDetails) {

    const params = new URLSearchParams(window.location.search);
    const index = Number(params.get("provider"));

    const provider = providers[index] || providers[0];

    providerDetails.innerHTML = `

        <div class="detail-icon">
            ${provider.icon}
        </div>

        <p class="tag">
            ${provider.service}
        </p>

        <h1>
            ${provider.name}
        </h1>

        <p class="muted">
            📍 ${provider.location}
        </p>

        <div class="stats">

            <div>
                <b>${provider.experience}</b>
                <span>Experience</span>
            </div>

            <div>
                <b>${provider.price}</b>
                <span>Starting Price</span>
            </div>

            <div>
                <b>⭐ ${provider.rating}</b>
                <span>Rating</span>
            </div>

        </div>

        <p>
            Professional ${provider.service.toLowerCase()}
            service with reliable and friendly support.
        </p>

        <a
            href="booking.html?provider=${index}"
            class="btn"
        >
            Book This Provider
        </a>
    `;
}


// SIGNUP

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        const message = document.getElementById("message");

        const users = getUsers();

        const existingUser = users.find(function (user) {
            return user.email === email;
        });

        if (existingUser) {
            message.textContent = "This email is already registered.";
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password,
            role: role
        });

        localStorage.setItem("users", JSON.stringify(users));

        showAlert(
            "Account Created!",
            "Your QuickServe account has been created successfully.",
            "success"
        ).then(function () {
            window.location.href = "login.html";
        });
    });
}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const message = document.getElementById("message");
        const users = getUsers();

        const foundUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!foundUser) {
            message.textContent = "Invalid email or password.";
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(foundUser));

        showAlert(
            "Login Successful!",
            "Welcome to QuickServe.",
            "success"
        ).then(function () {

            if (foundUser.role === "provider") {
                window.location.href = "provider-dashboard.html";
            } else {
                window.location.href = "customer-dashboard.html";
            }
        });
    });
}


// BOOKING
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Please login first.");
        window.location.href = "login.html";
    }

    const params = new URLSearchParams(
        window.location.search
    );

    const index = Number(params.get("provider"));

    const provider = providers[index] || providers[0];

    document.getElementById("bookingTitle").textContent =
        "Book " + provider.name;

    document.getElementById("providerInfo").textContent =
        provider.service +
        " • " +
        provider.location +
        " • ⭐ " +
        provider.rating;

    document.getElementById("service").value =
        provider.service;

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const bookingList = getBookings();

        const bookingId =
            "QS-" + Date.now();

        const newBooking = {

            id: bookingId,

            customer: currentUser.name,

            customerEmail: currentUser.email,

            provider: provider.name,

            service:
                document.getElementById("service").value,

            date:
                document.getElementById("date").value,

            time:
                document.getElementById("time").value,

            location:
                document.getElementById("location").value,

            description:
                document.getElementById("description").value,

            status: "Pending"
        };

        bookingList.push(newBooking);

        saveBookings(bookingList);

        showAlert(
            "Booking Created!",
            "Booking created successfully! Booking ID: " + bookingId,
            "success"
        ).then(function () {
            window.location.href = "customer-dashboard.html";
        });
    });
}


// CUSTOMER DASHBOARD
function customerDashboard() {

    const bookingsBox =
        document.getElementById("customerBookings");

    if (!bookingsBox) {
        return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {

        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcome").textContent =
        "Welcome, " + currentUser.name;

    const customerBookings =
        getBookings().filter(function (booking) {

            return booking.customerEmail ===
                currentUser.email;
        });

    const stats =
        document.getElementById("customerStats");

    stats.innerHTML = `

        <div>
            <b>${customerBookings.length}</b>
            <span>Total Bookings</span>
        </div>

        <div>
            <b>
                ${
                    customerBookings.filter(
                        booking => booking.status === "Pending"
                    ).length
                }
            </b>
            <span>Pending</span>
        </div>

        <div>
            <b>
                ${
                    customerBookings.filter(
                        booking => booking.status === "Completed"
                    ).length
                }
            </b>
            <span>Completed</span>
        </div>
    `;

    if (customerBookings.length === 0) {

        bookingsBox.innerHTML = `
            <div class="empty">
                No bookings yet.
                <a href="index.html">Find a service</a>
            </div>
        `;

        return;
    }

    const reviews = getReviews();

    bookingsBox.innerHTML = "";

    customerBookings.forEach(function (booking) {

        const alreadyReviewed =
            reviews.some(function (review) {
                return review.bookingId === booking.id;
            });

        let reviewHTML = "";

        if (
            booking.status === "Completed" &&
            !alreadyReviewed
        ) {

            reviewHTML = `

                <div class="review">

                    <select id="rating-${booking.id}">
                        <option value="5">★★★★★ 5</option>
                        <option value="4">★★★★ 4</option>
                        <option value="3">★★★ 3</option>
                        <option value="2">★★ 2</option>
                        <option value="1">★ 1</option>
                    </select>

                    <input
                        id="review-${booking.id}"
                        placeholder="Write your review"
                    >

                    <button
                        class="btn"
                        onclick="submitReview('${booking.id}')"
                    >
                        Submit Review
                    </button>

                </div>
            `;

        } else if (alreadyReviewed) {

            reviewHTML = `
                <p class="success">
                    Review submitted ✓
                </p>
            `;
        }

        bookingsBox.innerHTML += `

            <div class="card booking">

                <div>

                    <p class="tag">
                        ${booking.service}
                    </p>

                    <h3>
                        ${booking.provider}
                    </h3>

                    <p class="muted">
                        ${booking.date}
                        •
                        ${booking.time}
                        •
                        ${booking.location}
                    </p>

                    <p>
                        ${booking.description}
                    </p>

                    <p>
                        <b>Booking ID:</b>
                        ${booking.id}
                    </p>

                    <span class="status ${statusClass(booking.status)}">
                        ${booking.status}
                    </span>

                    ${reviewHTML}

                </div>

            </div>
        `;
    });
}


// REVIEW
function submitReview(bookingId) {

    const reviews = getReviews();

    const alreadyReviewed =
        reviews.some(function (review) {
            return review.bookingId === bookingId;
        });

    if (alreadyReviewed) {

        alert("You already reviewed this booking.");
        return;
    }

    const text =
        document.getElementById(
            "review-" + bookingId
        ).value.trim();

    if (!text) {

        alert("Please write a review.");
        return;
    }

    const rating =
        document.getElementById(
            "rating-" + bookingId
        ).value;

    reviews.push({

        bookingId: bookingId,

        rating: Number(rating),

        text: text
    });

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    customerDashboard();
}


// PROVIDER DASHBOARD
function providerDashboard() {

    const bookingsBox =
        document.getElementById("providerBookings");

    if (!bookingsBox) {
        return;
    }

    const currentUser = getCurrentUser();

    if (!currentUser) {

        window.location.href = "login.html";
        return;
    }

    const bookingList = getBookings();

    const stats =
        document.getElementById("providerStats");

    stats.innerHTML = `

        <div>
            <b>${bookingList.length}</b>
            <span>Total Requests</span>
        </div>

        <div>
            <b>
                ${
                    bookingList.filter(
                        booking => booking.status === "Pending"
                    ).length
                }
            </b>
            <span>Pending</span>
        </div>

        <div>
            <b>
                ${
                    bookingList.filter(
                        booking => booking.status === "Completed"
                    ).length
                }
            </b>
            <span>Completed</span>
        </div>
    `;

    if (bookingList.length === 0) {

        bookingsBox.innerHTML = `
            <div class="empty">
                No booking requests yet.
            </div>
        `;

        return;
    }

    bookingsBox.innerHTML = "";

    bookingList.forEach(function (booking) {

        let buttons = "";

        if (booking.status === "Pending") {

            buttons = `
                <button
                    class="btn"
                    onclick="changeStatus(
                        '${booking.id}',
                        'Accepted'
                    )"
                >
                    Accept
                </button>

                <button
                    class="danger"
                    onclick="changeStatus(
                        '${booking.id}',
                        'Rejected'
                    )"
                >
                    Reject
                </button>
            `;
        }

        if (booking.status === "Accepted") {

            buttons = `
                <button
                    class="btn"
                    onclick="changeStatus(
                        '${booking.id}',
                        'In Progress'
                    )"
                >
                    Start Work
                </button>
            `;
        }

        if (booking.status === "In Progress") {

            buttons = `
                <button
                    class="btn"
                    onclick="changeStatus(
                        '${booking.id}',
                        'Completed'
                    )"
                >
                    Mark Completed
                </button>
            `;
        }

        bookingsBox.innerHTML += `

            <div class="card booking">

                <div>

                    <p class="tag">
                        ${booking.service}
                    </p>

                    <h3>
                        ${booking.provider} Request
                    </h3>

                    <p>
                        <b>Customer:</b>
                        ${booking.customer}
                    </p>

                    <p class="muted">
                        ${booking.date}
                        •
                        ${booking.time}
                        •
                        ${booking.location}
                    </p>

                    <p>
                        ${booking.description}
                    </p>

                    <p>
                        <b>Booking ID:</b>
                        ${booking.id}
                    </p>

                    <span class="status ${statusClass(booking.status)}">
                        ${booking.status}
                    </span>

                </div>

                <div class="actions">
                    ${buttons}
                </div>

            </div>
        `;
    });
}


// CHANGE BOOKING STATUS
function changeStatus(bookingId, newStatus) {

    const bookingList = getBookings();

    const booking = bookingList.find(function (item) {
        return item.id === bookingId;
    });

    if (!booking) {
        return;
    }

    if (
        booking.status === "Completed" ||
        booking.status === "Rejected"
    ) {
        return;
    }

    if (
        newStatus === "In Progress" &&
        booking.status !== "Accepted"
    ) {
        return;
    }

    if (
        newStatus === "Completed" &&
        booking.status !== "In Progress"
    ) {
        return;
    }

    booking.status = newStatus;

    saveBookings(bookingList);

    providerDashboard();
}


// LOGOUT
const logoutButtons =
    document.querySelectorAll("#logout");

logoutButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";
    });
});

customerDashboard();
providerDashboard();

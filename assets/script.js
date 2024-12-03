document.addEventListener("DOMContentLoaded", () => {
    // Find the carousel element in your HTML
    const carouselElement = document.querySelector("#carouselExampleControls");

    // Initialize Bootstrap's carousel with the necessary options
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: 3000,  // 3 seconds for auto-slide
            ride: "carousel", // Automatically start
            keyboard: true,   // Allow keyboard interaction
        });
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const goToRegisterLink = document.getElementById("goToRegister");
    const goToLoginLink = document.getElementById("goToLogin");

    goToRegisterLink.addEventListener("click", () => {
        const registerTab = new bootstrap.Tab(document.getElementById("register-tab"));
        registerTab.show();
    });

    goToLoginLink.addEventListener("click", () => {
        const loginTab = new bootstrap.Tab(document.getElementById("login-tab"));
        loginTab.show();
    });
});

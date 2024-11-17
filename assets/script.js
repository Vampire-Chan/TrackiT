document.addEventListener("DOMContentLoaded", () => {
    // Carousel configuration
    const carouselElement = document.querySelector("#imageCarousel");
    const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // 5 seconds
        ride: "carousel"
    });

    console.log("Website Initialized!");
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

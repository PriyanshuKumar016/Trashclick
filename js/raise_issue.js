document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const mapFrame = document.getElementById("mapFrame");

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Default location: Delhi
    const defaultLat = 28.6139;
    const defaultLng = 77.2090;

    function loadMap(lat, lng) {
        const mapURL = `https://www.google.com/maps?q=${lat},${lng}&markers=${lat},${lng}&z=15&output=embed`;
        mapFrame.src = mapURL;
    }

    // Try getting user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                loadMap(latitude, longitude);
            },
            () => {
                // Permission denied or error
                loadMap(defaultLat, defaultLng);
            }
        );
    } else {
        loadMap(defaultLat, defaultLng);
    }
});

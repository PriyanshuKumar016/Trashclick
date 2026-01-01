document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const mapFrame = document.getElementById("mapFrame");
    const form = document.querySelector(".hero-form form");

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

    // Form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const res = await fetch("http://localhost:5000/api/issues", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                form.reset();
            } else {
                alert(data.error || "Failed to raise issue");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    });
});

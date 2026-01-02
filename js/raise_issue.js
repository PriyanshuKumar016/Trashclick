document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const form = document.querySelector(".form-section form");

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Default location: Delhi
    const defaultLat = 28.6139;
    const defaultLng = 77.2090;

    // Initialize map
    const map = L.map("map").setView([defaultLat, defaultLng], 15);

    // Load OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    // Marker
    let marker = L.marker([defaultLat, defaultLng]).addTo(map);

    // Try getting user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                map.setView([latitude, longitude], 16);
                marker.setLatLng([latitude, longitude]);
            },
            () => {
                // Permission denied → keep default
                map.setView([defaultLat, defaultLng], 15);
            }
        );
    }

    // Form submission (unchanged logic)
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

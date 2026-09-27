document.addEventListener("DOMContentLoaded", () => {

    let selectedMovie = dashboardData?.trending?.[0] || {};
    document.getElementById("movie-title").innerText = selectedMovie.title;
    document.getElementById("movie-genre").innerText = `${selectedMovie.rating || "R"} • ${selectedMovie.duration || "2 jam"}`;
    let price = 50000;
    document.getElementById("movie-price").innerText = "Rp " + price.toLocaleString("id-ID");
    if (selectedMovie.poster) {
        document.getElementById("movie-poster").src = "../../../" + selectedMovie.poster.replace("../../../", "");
    }

    const dates = ["1 Okt", "2 Okt", "3 Okt"];
    const studios = ["Studio 1", "Studio 2", "Studio 3"];
    const times = ["09:00", "13:00", "16:00", "19:00"];
    let selectedDate = "";
    let selectedStudio = "";
    let selectedTime = "";
    const btnNext = document.getElementById("next-button");

    const renderOptions = (containerId, optionsList, onSelect) => {
        const container = document.getElementById(containerId);
        optionsList.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.innerText = item;
            btn.onclick = () => {
                container.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                onSelect(item);
                if (selectedDate && selectedStudio && selectedTime) {
                    btnNext.disabled = false;
                }
            };
            container.appendChild(btn);
        });
    };

    renderOptions("date-list", dates, val => selectedDate = val);
    renderOptions("studio-list", studios, val => selectedStudio = val);
    renderOptions("time-list", times, val => selectedTime = val);
    btnNext.onclick = () => {
        const bookingData = {
            movieTitle: selectedMovie.title,
            moviePrice: price,
            moviePoster: selectedMovie.poster,
            date: selectedDate,
            studio: selectedStudio,
            time: selectedTime
        };
        localStorage.setItem("cinebook_booking", JSON.stringify(bookingData));
        window.location.href = "movie-seats.html";
    };
});
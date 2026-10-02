document.addEventListener("DOMContentLoaded", () => {

    let selectedMovie = dashboardData?.trending?.[0] || {};
    document.getElementById("movie-title").innerText = selectedMovie.title;
    document.getElementById("movie-genre").innerText = `${selectedMovie.rating || "R"} • ${selectedMovie.duration || "2 jam"}`;
    let price = 50000;
    document.getElementById("movie-price").innerText = "Rp " + price.toLocaleString("id-ID");
    if (selectedMovie.poster) {
        document.getElementById("movie-poster").src = "../../../" + selectedMovie.poster.replace("../../../", "");
    }

    const dates = ["4 Okt", "5 Okt", "6 Okt", "7 Okt"];

    const showtimes = [
        { time: "09:00", studio: "Studio 1" },
        { time: "13:00", studio: "Studio 1" },
        { time: "16:00", studio: "Studio 1" },
        { time: "19:00", studio: "Studio 1" }
    ];

    let selectedDate = "";
    let selectedTime = null;
    const btnNext = document.getElementById("next-button");

    const renderDates = () => {
        const container = document.getElementById("date-list");
        container.innerHTML = "";
        dates.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.innerText = item;
            btn.onclick = () => {
                container.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedDate = item;
                checkSelection();
            };
            container.appendChild(btn);
        });
    };
    const renderTimes = () => {
        const container = document.getElementById("time-list");
        container.innerHTML = "";
        showtimes.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "opt-btn";
            btn.innerHTML = `${item.time} <br><small style="font-size: 0.7rem; color: #aaa;">${item.studio}</small>`;
            btn.onclick = () => {
                container.querySelectorAll(".opt-btn").forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                selectedTime = item;
                checkSelection();
            };
            container.appendChild(btn);
        });
    };
    const checkSelection = () => {
        if (selectedDate && selectedTime) {
            btnNext.disabled = false;
        }
    };
    renderDates();
    renderTimes();
    btnNext.onclick = () => {
        const bookingData = {
            movieTitle: selectedMovie.title,
            moviePrice: price,
            moviePoster: selectedMovie.poster,
            date: selectedDate,
            studio: selectedTime.studio, 
            time: selectedTime.time
        };
        localStorage.setItem("cinebook_booking", JSON.stringify(bookingData));
        window.location.href = "movie-seats.html";
    };
});
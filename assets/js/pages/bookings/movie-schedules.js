document.addEventListener("DOMContentLoaded", () => {
    const query = new URLSearchParams(window.location.search);
    const movieId = query.get("id");
    const dataSource = typeof movieData !== "undefined" ? movieData : dashboardData;
    const allMovies = [
        ...(dataSource?.trending || []),
        ...(dataSource?.nowPlaying || []),
        ...(dataSource?.comingSoon || [])
    ];
    const selectedMovie = allMovies.find(movie => movie.id == movieId) || allMovies[0] || {};
    document.getElementById("movie-title").innerText = selectedMovie.title || "Movie not found";
    document.getElementById("movie-genre").innerText = `${selectedMovie.rating || "R13+"} • ${selectedMovie.duration || "120 min"}`;
    const price = selectedMovie.price || 50000;
    document.getElementById("movie-price").innerText = "Rp " + price.toLocaleString("id-ID");
    let cleanedPosterPath = "";
    if (selectedMovie.poster) {
        cleanedPosterPath = selectedMovie.poster.replace(/^(\.\.\/|\.\/)+/, "");
        document.getElementById("movie-poster").src = "../../" + cleanedPosterPath;
    }

    const dates = ["5 Oct", "6 Oct", "7 Oct", "8 Oct"];
    const assignedStudio = selectedMovie.studio || `Studio ${((selectedMovie.id - 1) % 6) + 1}`;
    const showtimes = [
        { time: "09:00", studio: assignedStudio },
        { time: "13:00", studio: assignedStudio },
        { time: "16:00", studio: assignedStudio },
        { time: "19:00", studio: assignedStudio }
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
            movieId: selectedMovie.id,
            movieTitle: selectedMovie.title || "Untitled",
            moviePrice: price,
            moviePoster: cleanedPosterPath, 
            date: selectedDate,
            studio: selectedTime.studio,
            time: selectedTime.time
        };
        localStorage.setItem("cinebook_booking", JSON.stringify(bookingData));
        window.location.href = `movie-seats.html?id=${selectedMovie.id}`;
    };
});
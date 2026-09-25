// Header Section

const hamburgerButton = document.querySelector("#hamburger-button");
const hamburgerMenuContainer = document.querySelector("#hamburger-menu-container");
const closeButton = document.querySelector("#close-button");

hamburgerButton.addEventListener("click", () => {
    hamburgerMenuContainer.classList.toggle("active");
});

closeButton.addEventListener("click", () => {
    hamburgerMenuContainer.classList.remove("active");
});


// Main Section

function createMovieCard(movie, label) {
    return `
        <article class="movie-card">
            <a href="pages/movies/movie-details.html?id=${movie.id}">
                <div class="movie-poster-wrapper">
                    <img src="${movie.poster}" alt="Poster film ${movie.title}" class="movie-poster" loading="lazy">
                    <span class="movie-label">${label}</span>
                </div>
            </a>

            <h3 class="movie-title">${movie.title}</h3>

            <div class="movie-information">
                ${movie.format ? `<span>${movie.format}</span>` : ""}
                ${movie.rating ? `<span>${movie.rating}</span>` : ""}
                ${movie.duration ? `<span>${movie.duration}</span>` : ""}
                ${movie.releaseDate ? `<span>${movie.releaseDate}</span>` : ""}
            </div>
        </article>
    `;
}

function renderMovies(containerId, movies, label) {
    const container = document.querySelector(containerId);

    container.innerHTML = movies.map((movie) => createMovieCard(movie, label)).join("");
}

renderMovies("#trending-movie-list", dashboardData.trending, "Sedang Trending");

renderMovies("#now-playing-movie-list", dashboardData.nowPlaying, "Sedang Tayang");

renderMovies("#coming-soon-movie-list", dashboardData.comingSoon, "Segera Tayang");
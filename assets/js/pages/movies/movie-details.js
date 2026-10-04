const query = new URLSearchParams(window.location.search);
const movieId = Number(query.get("id"));

const allMovies = [
    ...movieData.trending,
    ...movieData.nowPlaying,
    ...movieData.comingSoon
];

const selectedMovie = allMovies.find((movie) => movie.id == movieId);

const container = document.querySelector("#movie-detail-container");

if (!selectedMovie) {
    container.innerHTML= `
        <div class="not-found-container">
            <h1>Page Not Found</h1>
            <a href="../../index.html">Back to Dashboard</a>
        </div>
    `;
} else {
    container.innerHTML = `
        <div class="poster-wrapper">            
            <img src="../../${selectedMovie.poster}" alt="${selectedMovie.title}" class="movie-poster">
        </div>

        <div class="movie-information">
            <h1 class="movie-title">${selectedMovie.title}</h1>
            <div class="movie-tag">
                ${selectedMovie.format ? `<span>${selectedMovie.format}</span>` : ""}
                ${selectedMovie.rating ? `<span>${selectedMovie.rating}</span>` : ""}
                ${selectedMovie.duration ? `<span>${selectedMovie.duration}</span>` : ""}
            </div>
            <div class="schedule-button">
                <a href="#" class="button-link">Buy Ticket</a>
            </div>
            <p class="synopsis">${selectedMovie.synopsis}</p>
    `
    document.title = `${selectedMovie.title} - CineBook`;
}
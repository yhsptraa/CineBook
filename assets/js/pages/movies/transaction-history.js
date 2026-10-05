document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const currentUserId = sessionStorage.getItem("currentUserId");

    if (isLoggedIn !== "true" || !currentUserId) {
        alert("Please log in to view your transaction history.");
        window.location.href = "../login.html";
        return;
    }

    const hamburgerButton = document.getElementById("hamburger-button");
    const hamburgerMenuContainer = document.getElementById("hamburger-menu-container");
    const closeButton = document.getElementById("close-button");
    const authContainer = document.getElementById("auth-container");
    const userName = sessionStorage.getItem("userNama") || "User";
    const transactionList = document.getElementById("transaction-list");
    const transactionCount = document.getElementById("transaction-count");

    hamburgerButton.addEventListener("click", () => {
        hamburgerMenuContainer.classList.toggle("active");
    });

    closeButton.addEventListener("click", () => {
        hamburgerMenuContainer.classList.remove("active");
    });

    authContainer.innerHTML = `
        <span class="user-greeting">HI, ${userName.toUpperCase()}</span>
        <a href="#" id="logout-btn">LOGOUT</a>
    `;

    const formatCurrency = value => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);

    const formatDate = value => {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) return "Date unavailable";

        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
            timeStyle: "short"
        }).format(date);
    };

    const escapeHtml = value => String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

    const getPosterPath = poster => {
        if (!poster) return "";
        const normalizedPath = String(poster).replace(/^(\.\.\/|\.\/)+/, "");
        return `../../${normalizedPath}`;
    };

    let transactions = [];

    try {
        const storedTransactions = JSON.parse(localStorage.getItem("cinebook_transactions") || "[]");
        transactions = Array.isArray(storedTransactions) ? storedTransactions : [];
    } catch (error) {
        transactions = [];
    }

    const userTransactions = transactions
        .filter(transaction => String(transaction.userId) === String(currentUserId))
        .sort((first, second) => {
            const firstDate = new Date(first.paidAt || first.createdAt).getTime() || 0;
            const secondDate = new Date(second.paidAt || second.createdAt).getTime() || 0;
            return secondDate - firstDate;
        });

    transactionCount.textContent = `${userTransactions.length} ${userTransactions.length === 1 ? "transaction" : "transactions"}`;

    if (userTransactions.length === 0) {
        transactionList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fa-solid fa-ticket"></i></div>
                <h2>No Transactions Yet</h2>
                <p>Your purchased tickets will appear on this page.</p>
                <a href="../../index.html">View Now Playing Movies</a>
            </div>
        `;
    } else {
        transactionList.innerHTML = userTransactions.map(transaction => {
            const seats = Array.isArray(transaction.seats) ? transaction.seats.join(", ") : "-";
            const posterPath = getPosterPath(transaction.moviePoster);
            const status = transaction.status === "PAID" ? "Paid" : transaction.status;

            return `
                <article class="transaction-card">
                    <div class="transaction-poster-wrapper">
                        ${posterPath
                            ? `<img src="${escapeHtml(posterPath)}" alt="Poster for ${escapeHtml(transaction.movieTitle)}" class="transaction-poster">`
                            : `<div class="poster-placeholder"><i class="fa-solid fa-film"></i></div>`}
                    </div>

                    <div class="transaction-details">
                        <div class="transaction-title-row">
                            <div>
                                <p class="transaction-id">${escapeHtml(transaction.id)}</p>
                                <h2>${escapeHtml(transaction.movieTitle)}</h2>
                            </div>
                            <span class="status-badge">${escapeHtml(status)}</span>
                        </div>

                        <div class="schedule-info">
                            <p><i class="fa-regular fa-calendar"></i> ${escapeHtml(transaction.date)}</p>
                            <p><i class="fa-regular fa-clock"></i> ${escapeHtml(transaction.time)}</p>
                            <p><i class="fa-solid fa-location-dot"></i> ${escapeHtml(transaction.cinema || "CineBook Central")}</p>
                        </div>

                        <div class="transaction-meta">
                            <div>
                                <span>Studio</span>
                                <strong>${escapeHtml(transaction.studio)}</strong>
                            </div>
                            <div>
                                <span>Seats</span>
                                <strong>${escapeHtml(seats)}</strong>
                            </div>
                            <div>
                                <span>Payment Method</span>
                                <strong>${escapeHtml(transaction.paymentMethod)}</strong>
                            </div>
                        </div>

                        <div class="transaction-footer">
                            <p>Paid ${escapeHtml(formatDate(transaction.paidAt || transaction.createdAt))}</p>
                            <div>
                                <span>Total Payment</span>
                                <strong>${formatCurrency(transaction.grandTotal)}</strong>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    document.getElementById("logout-btn").addEventListener("click", event => {
        event.preventDefault();
        sessionStorage.clear();
        window.location.href = "../login.html";
    });
});

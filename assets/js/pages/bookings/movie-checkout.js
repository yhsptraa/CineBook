document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const currentUserId = sessionStorage.getItem("currentUserId");
    const bookingData = JSON.parse(localStorage.getItem("cinebook_booking") || "null");
    if (isLoggedIn !== "true" || !currentUserId) {
        alert("Please log in before completing your booking");
        window.location.href = "../login.html";
        return;
    }
    if (!bookingData || !Array.isArray(bookingData.seats) || bookingData.seats.length === 0) {
        alert("Booking data not found. Please select the movie and seats again");
        window.location.href = "../../index.html";
        return;
    }
    document.getElementById("checkout-title").innerText = bookingData.movieTitle;
    document.getElementById("checkout-schedule").innerText = `${bookingData.studio} • ${bookingData.date} • ${bookingData.time}`;
    document.getElementById("checkout-seats").innerText = `Seats: ${bookingData.seats.join(", ")}`;
    if (bookingData.moviePoster) {
        const cleanPosterPath = bookingData.moviePoster.replace(/^(\.\.\/|\.\/)+/, "");
        document.getElementById("checkout-poster").src = "../../" + cleanPosterPath;
    }

    const serviceFee = 5000;
    const count = bookingData.seats.length;
    const subtotal = bookingData.totalPrice || (count * bookingData.moviePrice);
    const grandTotal = subtotal + serviceFee;
    document.getElementById("ticket-count").innerText = count;
    document.getElementById("subtotal-price").innerText = "Rp " + subtotal.toLocaleString("id-ID");
    document.getElementById("grand-total").innerText = "Rp " + grandTotal.toLocaleString("id-ID");
    const payBtn = document.getElementById("pay-button");
    const modal = document.getElementById("booking-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    let transactionSaved = false;

    payBtn.onclick = () => {
        if (transactionSaved) return;
        const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value || "QRIS";
        const transactionTime = new Date().toISOString();
        const transaction = {
            id: `TRX-CB-${Date.now()}`,
            userId: currentUserId,
            movieId: bookingData.movieId ?? null,
            movieTitle: bookingData.movieTitle,
            moviePoster: bookingData.moviePoster,
            cinema: bookingData.cinema || "CineBook Central",
            studio: bookingData.studio,
            date: bookingData.date,
            time: bookingData.time,
            seats: bookingData.seats,
            ticketPrice: bookingData.moviePrice,
            subtotal,
            serviceFee,
            paymentMethod: selectedPayment,
            grandTotal,
            status: "PAID",
            createdAt: transactionTime,
            paidAt: transactionTime
        };

        let transactions = [];
        try {
            const storedTransactions = JSON.parse(localStorage.getItem("cinebook_transactions") || "[]");
            transactions = Array.isArray(storedTransactions) ? storedTransactions : [];
        } catch (error) {
            transactions = [];
        }

        transactions.push(transaction);
        localStorage.setItem("cinebook_transactions", JSON.stringify(transactions));
        localStorage.removeItem("cinebook_booking");
        transactionSaved = true;
        payBtn.disabled = true;
        payBtn.innerText = "Payment successful";
        modal.style.display = "flex";
    };
    closeModalBtn.onclick = () => {
        window.location.href = "../movies/transaction-history.html";
    };
});

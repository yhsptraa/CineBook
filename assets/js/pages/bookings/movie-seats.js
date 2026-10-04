document.addEventListener("DOMContentLoaded", () => {
    const bookingData = JSON.parse(localStorage.getItem("cinebook_booking") || "null");
    if (!bookingData) {
        alert("Schedule data not found. Please select a movie and schedule again");
        window.location.href = "../../index.html";
        return;
    }

    document.getElementById("summary-title").innerText = bookingData.movieTitle;
    document.getElementById("summary-info").innerText = `${bookingData.studio} • ${bookingData.date} • ${bookingData.time}`;
    const seatsGrid = document.getElementById("seats-grid");
    const summaryTotalPrice = document.getElementById("summary-total-price");
    const btnNext = document.getElementById("next-checkout-btn");

    const rows = ["A", "B", "C", "D", "E"]; 
    const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const occupiedSeats = ["A3", "A4", "D6", "D7"]; 
    let selectedSeats = [];

    rows.forEach(row => {
        cols.forEach((col, index) => {
            if (index === 5) {
                const aisle = document.createElement("div");
                aisle.className = "space";
                seatsGrid.appendChild(aisle);
            }

            const seatId = `${row}${col}`;
            const btn = document.createElement("button");
            btn.className = "seat";
            btn.innerText = seatId;
            if (occupiedSeats.includes(seatId)) {
                btn.classList.add("occupied");
                btn.disabled = true;
            } else {
                btn.onclick = () => {
                    if (selectedSeats.includes(seatId)) {
                        selectedSeats = selectedSeats.filter(id => id !== seatId);
                        btn.classList.remove("selected");
                    } else {
                        selectedSeats.push(seatId);
                        btn.classList.add("selected");
                    }

                    const total = selectedSeats.length * bookingData.moviePrice;
                    summaryTotalPrice.innerText = "Rp " + total.toLocaleString("id-ID");
                    btnNext.disabled = selectedSeats.length === 0;
                };
            }
            seatsGrid.appendChild(btn);
        });
    });

    btnNext.onclick = () => {
        const finalBooking = {
            ...bookingData,
            seats: selectedSeats,
            totalPrice: selectedSeats.length * bookingData.moviePrice
        };
        localStorage.setItem("cinebook_booking", JSON.stringify(finalBooking));
        window.location.href = "movie-checkout.html";
    };
});
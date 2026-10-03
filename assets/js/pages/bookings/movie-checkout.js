document.addEventListener("DOMContentLoaded", () => {
    const bookingData = JSON.parse(localStorage.getItem("cinebook_booking"));
    document.getElementById("checkout-title").innerText = bookingData.movieTitle;
    document.getElementById("checkout-schedule").innerText = `${bookingData.studio} • ${bookingData.date} • ${bookingData.time}`;
    document.getElementById("checkout-seats").innerText = `Kursi: ${bookingData.seats.join(", ")}`;
    if (bookingData.moviePoster) {
        document.getElementById("checkout-poster").src = "../../../" + bookingData.moviePoster.replace("../../../", "");
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

    payBtn.onclick = () => {
        const selectedPayment = document.querySelector('input[name="payment"]:checked')?.value || "QRIS";
        const finalBookingRecord = {
            ...bookingData,
            paymentMethod: selectedPayment,
            grandTotal: grandTotal,
            status: "Belum lunas",
            createdAt: new Date().toISOString()
        };
        localStorage.setItem("cinebook_latest_booking", JSON.stringify(finalBookingRecord));
        modal.style.display = "flex";
    };

    closeModalBtn.onclick = () => {
        localStorage.removeItem("cinebook_booking");
        modal.style.display = "none";
        payBtn.disabled = true;
        payBtn.innerText = "Pesanan berhasil dibuat";
        // TODO: Navigasi ke riwayat transaksi
    };
});
const dummyTransactions = [
    {
        id: "TRX-CB-1001",
        userId: 2,
        movieId: 8,
        movieTitle: "Spider-Man: Homecoming",
        moviePoster: "assets/images/movies/spiderman-homecoming.png",
        cinema: "CineBook Central",
        studio: "Studio 1",
        date: "4 Oktober 2026",
        time: "19:00",
        seats: ["C5", "C6"],
        ticketPrice: 50000,
        subtotal: 100000,
        serviceFee: 5000,
        grandTotal: 105000,
        paymentMethod: "QRIS",
        status: "PAID",
        createdAt: "2026-10-02T12:15:00.000Z",
        paidAt: "2026-10-02T12:16:00.000Z"
    },
    {
        id: "TRX-CB-1002",
        userId: 2,
        movieId: 10,
        movieTitle: "Doctor Strange",
        moviePoster: "assets/images/movies/doctor-strange.png",
        cinema: "CineBook Central",
        studio: "Studio 2",
        date: "6 Oktober 2026",
        time: "16:00",
        seats: ["B7"],
        ticketPrice: 50000,
        subtotal: 50000,
        serviceFee: 5000,
        grandTotal: 55000,
        paymentMethod: "Transfer Bank",
        status: "PAID",
        createdAt: "2026-10-03T08:30:00.000Z",
        paidAt: "2026-10-03T08:31:00.000Z"
    }
];

function seedDummyTransactions() {
    const storageKey = "cinebook_transactions";
    const existingTransactions = localStorage.getItem(storageKey);

    if (!existingTransactions) {
        localStorage.setItem(storageKey, JSON.stringify(dummyTransactions));
    }
}

seedDummyTransactions();

document.addEventListener("DOMContentLoaded", function() {
    
    const theatreLayout = document.getElementById('theatre-layout');
    const seatNumberInput = document.getElementById('seat-number');
    const messageDiv = document.getElementById('message');

    function fetchSeats() {
        fetch('/api/seats')
            .then(response => response.json())
            .then(seats => {
                theatreLayout.innerHTML = '';
                seats.forEach(seat => {
                    const seatDiv = document.createElement('div');
                    seatDiv.className = 'seat ' + (seat.is_booked ? 'booked' : 'available');
                    seatDiv.textContent = seat.number;

                    // Add click event for available seats
                    if (!seat.is_booked) {
                        seatDiv.addEventListener('click', () => {
                            seatNumberInput.value = seat.number; // Set seat number input
                        });
                    }
                    theatreLayout.appendChild(seatDiv);
                });
            });
    }

    document.getElementById('book-seat').addEventListener('click', () => {
        const seatNumber = parseInt(seatNumberInput.value);
        if (seatNumber >= 1 && seatNumber <= 50) {
            fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ seat_number: seatNumber })
            })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
                fetchSeats(); // Refresh seats
            });
        } else {
            alert("Please enter a valid seat number (1-50).");
        }
    });

    document.getElementById('cancel-seat').addEventListener('click', () => {
        const seatNumber = parseInt(seatNumberInput.value);
        if (seatNumber >= 1 && seatNumber <= 50) {
            fetch(`/api/cancel/${seatNumber}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
                messageDiv.textContent = data.message;
                fetchSeats(); // Refresh seats
            });
        } else {
            alert("Please enter a valid seat number (1-50).");
        }
    });

    // Initial fetch of seats
    fetchSeats();
});

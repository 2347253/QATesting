class Seat:
    def __init__(self, number):
        self.number = number
        self.is_booked = False

seats = [Seat(i) for i in range(1, 51)] # Initialize seats (1 to 50)


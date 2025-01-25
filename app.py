from flask import Flask, jsonify, request
from models import seats
from flask import Flask, jsonify, request, render_template


app = Flask(__name__)

@app.route('/')
def home():
    # return "Flask is running!"
    return render_template('index.html')


@app.route('/api/seats', methods=['GET'])
def get_seats():
    available_seats = [{"number": seat.number, "is_booked": seat.is_booked} for seat in seats]
    return jsonify(available_seats)

@app.route('/api/book', methods=['POST'])
def book_seat():
    seat_number = request.json.get('seat_number')
    if seat_number < 1 or seat_number > 50:
        return jsonify({"message": "Invalid seat number!"}), 400
    
    seat = seats[seat_number - 1]
    if seat.is_booked:
        return jsonify({"message": "Seat already booked!"}), 400
    
    seat.is_booked = True
    return jsonify({"message": "Seat booked successfully!"}), 201

@app.route('/api/cancel/<int:seat_number>', methods=['DELETE'])
def cancel_booking(seat_number):
    if seat_number < 1 or seat_number > 50:
        return jsonify({"message": "Invalid seat number!"}), 400
    
    seat = seats[seat_number - 1]
    if not seat.is_booked:
        return jsonify({"message": "Seat is not booked!"}), 400
    
    seat.is_booked = False
    return jsonify({"message": "Booking cancelled successfully!"}), 200

if __name__ == '__main__':
    # print("\nRegistered routes:")
    # for rule in app.url_map.iter_rules():
    #     print(rule)
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import swisseph as swe

app = Flask(__name__)

CORS(app)

@app.route('/ephemeris', methods=['GET'])
def get_ephemeris_data():
    swe.set_ephe_path('/usr/share/sweph/ephe')

    date = request.args.get('date', None)

    try:
        jd = float(date)
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid date format. Date must be a float number."}), 400

    planets = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ]

    planet_names = [
        'sun', 'moon', 'mercury', 'venus', 'mars', 
        'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
        'mean-node', 'true-node', 'mean-apog', 'oscu-apog',
        'earth', 'chiron', 'pholus', 'ceres', 'pallas', 'juno',
        'vesta'
    ]

    ephemeris_data = {}

    for idx, planet in zip(planets, planet_names):
        xx, rflags = swe.calc_ut(jd, idx)
        ephemeris_data[planet] = xx[0]

    return jsonify(ephemeris_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

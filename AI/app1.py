from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import cv2
import mediapipe as mp
import numpy as np
import json
import time
from pipeline1 import process_exercise  # Import exercise processing function

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Global Variables
cap = None
pose = mp.solutions.pose.Pose()
rep_count, set_count, rep_started = 0, 0, False
current_exercise = None
exercises_data = {}


def load_exercise_data():
    """Load exercises from exercises.json."""
    global exercises_data
    try:
        with open("exercises.json", "r") as file:
            exercises_data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"❌ Error loading exercises: {e}")
        exercises_data = {}


def open_webcam():
    """Try multiple camera indices and warm up the webcam."""
    for cam_index in range(3):  # Try indices 0, 1, 2
        cap = cv2.VideoCapture(cam_index, cv2.CAP_DSHOW)  # CAP_DSHOW fixes issues on Windows
        if cap.isOpened():
            print(f"✅ Webcam opened at index {cam_index}")
            time.sleep(2)  # Allow the camera to initialize
            return cap
        cap.release()
    
    print("❌ No available webcam found!")
    return None


@app.route('/api/start-exercise', methods=['GET', 'POST'])
def start_exercise():
    """Start an exercise session via POST request. GET will return the current exercise."""
    global cap, current_exercise, rep_count, set_count, rep_started

    load_exercise_data()
    if not exercises_data:
        return jsonify({"success": False, "message": "Exercise data not found!"}), 500

    if request.method == "POST":
        data = request.json
        exercise_name = data.get("exercise_name")

        if not exercise_name:
            return jsonify({"success": False, "message": "No exercise specified!"}), 400

        # Search for the exercise in the JSON data
        found = False
        for category in exercises_data.get("exercises", []):
            for exercise in category.get("exercises", []):
                if exercise["name"] == exercise_name:
                    current_exercise = exercise
                    found = True
                    break
            if found:
                break

        if not found:
            return jsonify({"success": False, "message": "Exercise not found!"}), 404

        # Reset session variables
        rep_count, set_count, rep_started = 0, 0, False

        # Open the webcam
        cap = open_webcam()
        if cap is None:
            return jsonify({"success": False, "message": "Webcam access failed!"}), 500

        socketio.start_background_task(process_exercise_stream)

        return jsonify({"success": True, "message": f"Exercise '{current_exercise['name']}' started!"})

    # If GET request, return the last started exercise
    if current_exercise:
        return jsonify({"success": True, "exercise_name": current_exercise["name"]})

    return jsonify({"success": False, "message": "No exercise started yet!"}), 404


def process_exercise_stream():
    """Processes webcam frames and sends real-time feedback via SocketIO."""
    global cap, current_exercise, rep_count, set_count, rep_started

    if cap is None or current_exercise is None:
        print("❌ Error: Webcam or exercise data unavailable!")
        return

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("❌ Error: Failed to read webcam frame!")
            break

        frame = cv2.flip(frame, 1)
        height, width, _ = frame.shape

        frame, feedback_msgs, rep_count, set_count, rep_started, completed = process_exercise(
            socketio, pose, current_exercise, frame, width, height, rep_count, set_count, rep_started
        )

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        socketio.emit("video_frame", frame_bytes)

        cv2.imshow("Exercise Feedback", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord("q") or completed:
            break

    cap.release()
    cv2.destroyAllWindows()
    print("✅ Exercise session ended!")


if __name__ == '__main__':
    socketio.run(app, debug=True)

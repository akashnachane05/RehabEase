from flask import Flask, request, jsonify
from flask_socketio import SocketIO
import cv2
import mediapipe as mp
import numpy as np
import json
import time
import datetime
import google.generativeai as genai
from pipeline import process_exercise
import re

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

cap = None
pose = mp.solutions.pose.Pose()
rep_count, set_count, rep_started = 0, 0, False
correct_reps, incorrect_reps = 0, 0
current_exercise = None
exercises_data = {}


def load_exercise_data():
    global exercises_data
    try:
        with open("exercises.json", "r") as file:
            exercises_data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"❌ Error loading exercises: {e}")
        exercises_data = {}


def open_webcam():
    for cam_index in range(3):
        cap = cv2.VideoCapture(cam_index, cv2.CAP_DSHOW)
        if cap.isOpened():
            print(f"✅ Webcam opened at index {cam_index}")
            time.sleep(2)
            return cap
        cap.release()
    print("❌ No available webcam found!")
    return None


@app.route('/api/start-exercise', methods=['POST'])
def start_exercise():
    global cap, current_exercise, rep_count, set_count, rep_started, correct_reps, incorrect_reps
    
    load_exercise_data()
    if not exercises_data:
        return jsonify({"success": False, "message": "Exercise data not found!"}), 500

    data = request.json
    exercise_name = data.get("exercise_name")
    if not exercise_name:
        return jsonify({"success": False, "message": "No exercise specified!"}), 400

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

    rep_count, set_count, rep_started, correct_reps, incorrect_reps = 0, 0, False, 0, 0
    cap = open_webcam()
    if cap is None:
        return jsonify({"success": False, "message": "Webcam access failed!"}), 500

    socketio.start_background_task(process_exercise_stream)
    return jsonify({"success": True, "message": f"Exercise '{current_exercise['name']}' started!"})


def process_exercise_stream():
    global cap, current_exercise, rep_count, set_count, rep_started, correct_reps, incorrect_reps
    
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

        frame, feedback_msgs, rep_count, set_count, rep_started, correct_reps, incorrect_reps, completed = process_exercise(
            socketio, pose, current_exercise, frame, width, height, rep_count, set_count, rep_started, correct_reps, incorrect_reps
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
    generate_final_report()

def generate_final_report():
    report_data = {
        "timestamp": datetime.datetime.now().isoformat(),
        "exercise_name": current_exercise["name"],
        "sets": set_count,
        "reps": rep_count,
        "accuracy": round((correct_reps / rep_count * 100) if rep_count > 0 else 100, 2),
        }
    
    genai.configure(api_key="AIzaSyBDMYAX4pPgl0XO9wUwIEatNI3EdgHmYeU")
    prompt = f"""
    Generate a summary for the following exercise session like an actual therapist. Provide proper feedback, 
    highlight improvements required, and summarize in simple terms so a user can easily understand. Generate just one paragraph in short:
    {json.dumps(report_data, indent=4)}
    """
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    report_data["summary"] = response.text if response.text else "No valid response received."
    filename = "final_exercise_report.json"
    try:
        with open(filename, "r") as f:
            reports = json.load(f)
        if not isinstance(reports, list):
            reports = [reports]
    except (FileNotFoundError, json.JSONDecodeError):
        reports = []

    reports.append(report_data)
    with open(filename, "w") as f:
        json.dump(reports, f, indent=4)

    print("✅ Final report generated and saved!")
    socketio.emit("final_report", report_data)


if __name__ == '__main__':
    socketio.run(app, debug=True)
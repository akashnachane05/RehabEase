import cv2
import numpy as np
import mediapipe as mp

def calculate_angle(a, b, c):
    """Calculate angle between three points."""
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(np.degrees(radians))
    return angle if angle <= 180 else 360 - angle

def process_exercise(socketio, pose, exercise, frame, width, height, rep_count, set_count, rep_started):
    feedback_msgs = []
    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        return frame, feedback_msgs, rep_count, set_count, rep_started, False

    try:
        joints_data = exercise["parameters"]["joints"]
        feedback_templates = exercise["parameters"]["feedback"]# Avoid KeyError

        for joint_name, joint_data in joints_data.items():
            landmarks = joint_data["landmarks"]
            computed_value = 0
            ideal_value = 0
            is_distance = False  # Track if it's a distance or angle calculation

            if len(landmarks) == 3:
                p1, p2, p3 = [results.pose_landmarks.landmark[i] for i in landmarks]
                computed_value = calculate_angle(
                    (p1.x * width, p1.y * height), 
                    (p2.x * width, p2.y * height), 
                    (p3.x * width, p3.y * height)
                )
                ideal_value = joint_data["ideal_angle"]
            elif len(landmarks) == 2:
                p1, p2 = [results.pose_landmarks.landmark[i] for i in landmarks]
                computed_value = np.linalg.norm(
                    np.array([p1.x * width, p1.y * height]) - np.array([p2.x * width, p2.y * height])
                )
                ideal_value = joint_data["ideal_distance"]
                is_distance = True  # Mark it as a distance calculation
            else:
                continue

            threshold = joint_data.get("threshold", 10)
            deviation = round(abs(computed_value - ideal_value), 2)

            # **Check if feedback exists for this joint**
            feedback_msg = f"{joint_name}: Keep adjusting!"
            if joint_name in feedback_templates:
                feedback_template = feedback_templates[joint_name]

                # **Dynamically format based on placeholders**
                format_values = {"deviation": deviation}
                if is_distance:
                    format_values["current_distance"] = round(computed_value, 2)
                else:
                    format_values["current_angle"] = round(computed_value, 2)

                try:
                    feedback_msg = feedback_template.format(**format_values)
                except KeyError as e:
                    print(f"❌ Formatting error: {e}. Check placeholders in exercise.json!")

            feedback_msgs.append(feedback_msg)

            # **Draw feedback text on OpenCV frame**
            cv2.putText(frame, feedback_msg, (10, 50 + len(feedback_msgs) * 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2, cv2.LINE_AA)

            # **Emit feedback over WebSocket**
            socketio.emit("exercise_feedback", {
                "joint": joint_name,
                "current_value": round(computed_value, 2),
                "deviation": deviation,
                "message": feedback_msg
            })
            print(f"📢 Sent feedback: {feedback_msg}")  # Debugging print

            # **Rep counting logic**
            if computed_value > (ideal_value + threshold) and not rep_started:
                rep_started = True
            if rep_started and computed_value < (ideal_value - threshold):
                rep_count += 1
                rep_started = False
                socketio.emit("rep_update", {"rep_count": rep_count})

                if rep_count >= exercise["reps"]:
                    set_count += 1
                    rep_count = 0
                    socketio.emit("set_update", {"set_count": set_count})
                    if set_count >= exercise["sets"]:
                        socketio.emit("exercise_complete", {"exercise": exercise["name"]})
                        return frame, feedback_msgs, rep_count, set_count, rep_started, True

    except KeyError as e:
        print(f"❌ KeyError: {e} (Check exercise.json structure)")
    cv2.putText(frame, f"Reps: {rep_count}", (50, height - 100),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.putText(frame, f"Sets: {set_count}", (50, height - 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    return frame, feedback_msgs, rep_count, set_count, rep_started, False

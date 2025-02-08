import cv2
import numpy as np
import mediapipe as mp

def calculate_angle(a, b, c):
    """Calculate angle between three points."""
    a, b, c = np.array(a), np.array(b), np.array(c)
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(np.degrees(radians))
    return angle if angle <= 180 else 360 - angle

def process_exercise(socketio, pose, exercise, frame, width, height, rep_count, set_count, rep_started, correct_reps, incorrect_reps):
    feedback_msgs = []
    results = pose.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        return frame, feedback_msgs, rep_count, set_count, rep_started, correct_reps, incorrect_reps, False

    if set_count >= 3:  # Stop the exercise after 3 sets
        socketio.emit("exercise_complete", {"exercise": exercise["name"]})
        return frame, feedback_msgs, rep_count, set_count, rep_started, correct_reps, incorrect_reps, True

    try:
        joints_data = exercise["parameters"]["joints"]
        feedback_templates = exercise["parameters"]["feedback"]

        for joint_name, joint_data in joints_data.items():
            landmarks = joint_data["landmarks"]
            computed_value = 0
            ideal_value = 0
            is_distance = False

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
                is_distance = True
            else:
                continue

            threshold = joint_data.get("threshold", 10)
            deviation = round(abs(computed_value - ideal_value))

            # Feedback messages
            feedback_msg = f"{joint_name}: Keep adjusting!"
            if joint_name in feedback_templates:
                feedback_template = feedback_templates[joint_name]
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
            cv2.putText(frame, feedback_msg, (10, 50 + len(feedback_msgs) * 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2, cv2.LINE_AA)

            socketio.emit("exercise_feedback", {
                "joint": joint_name,
                "current_value": round(computed_value, 2),
                "deviation": deviation,
                "message": feedback_msg
            })

            # Rep Start Condition
            if computed_value > (ideal_value + threshold) and not rep_started:
                rep_started = True
                print("🔄 Rep started!")  # Debugging

            # Rep Completion Condition
            if rep_started and computed_value < ideal_value:
                rep_count += 1
                rep_started=False 
                print("✅ Rep completed!")  # Debugging

                # Correct vs Incorrect Rep Count
                if deviation <= threshold:
                    correct_reps += 1
                    print("✅ Correct rep!")
                else:
                    incorrect_reps += 1
                    print("❌ Incorrect rep!")

                # rep_started = False  # Reset rep tracking

                # Emit rep count updates
                socketio.emit("rep_update", {
                    "rep_count": rep_count,
                    "correct_reps": correct_reps,
                    "incorrect_reps": incorrect_reps
                })
              
                # Set Count Logic
                if rep_count % 3 == 0:  # Assuming 10 reps per set
                    set_count += 1
                    socketio.emit("set_update", {"set_count": set_count})

                    if set_count >= 3:  # Stop after 3 sets
                        socketio.emit("exercise_complete", {"exercise": exercise["name"]})
                        return frame, feedback_msgs, rep_count, set_count, rep_started, correct_reps, incorrect_reps, True
             

    except KeyError as e:
        print(f"❌ KeyError: {e} (Check exercise.json structure)")

    # Accuracy Calculation
    accuracy = (correct_reps / rep_count * 100) if rep_count > 0 else 0
    

    # Overlay Information on Frame
    cv2.putText(frame, f"Reps: {rep_count} (Correct: {correct_reps}, Incorrect: {incorrect_reps}, Sets: {set_count}, Accuracy : {accuracy}",
                (50, height - 100), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1)

    return frame, feedback_msgs, rep_count, set_count, rep_started, correct_reps, incorrect_reps, False
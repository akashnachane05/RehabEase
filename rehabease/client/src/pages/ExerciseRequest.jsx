"use client"

import { useState, useEffect } from "react"
import io from "socket.io-client"

const FeedbackPanel = ({ feedback, repCount, setCount }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Real-time Feedback</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {feedback ? (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg shadow-inner h-full">
              <strong className="text-blue-600 text-lg">{feedback.joint_name}:</strong>
              <p className="text-gray-700 mt-2">{feedback.feedback_msg}</p>
              <div className="flex justify-between mt-2 text-sm">
                {feedback.current_value !== undefined && (
                  <span className="text-gray-600">
                    Current: <span className="font-semibold">{feedback.current_value}°</span>
                  </span>
                )}
                {feedback.deviation !== undefined && (
                  <span className="text-gray-600">
                    Deviation: <span className="font-semibold">{feedback.deviation}°</span>
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-500 italic">No feedback yet. Start an exercise to see real-time updates!</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-lg shadow transition-all duration-300 ease-in-out transform hover:scale-105">
            <p className="text-lg font-semibold text-blue-800">Reps</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{repCount}</p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-lg shadow transition-all duration-300 ease-in-out transform hover:scale-105">
            <p className="text-lg font-semibold text-green-800">Sets</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{setCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExerciseCard = ({ exercise, onStart }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{exercise.name}</h3>
      <p className="text-gray-600 mb-4">{exercise.description}</p>
      <button
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => onStart(exercise.name)}
      >
        Start Exercise
      </button>
    </div>
  </div>
)

const ExerciseList = () => {
  const [exercisesData, setExercisesData] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [repCount, setRepCount] = useState(0)
  const [setCount, setSetCount] = useState(0)

  useEffect(() => {
    fetch("/exercises.json")
      .then((response) => response.json())
      .then((data) => setExercisesData(data))
  }, [])

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000")

    socket.on("connect", () => console.log("✅ Connected to WebSocket"))

    socket.on("exercise_feedback", (data) => {
      console.log("📩 Received feedback:", data)
      setFeedback({
        joint_name: data.joint,
        current_value: data.current_value,
        deviation: data.deviation,
        feedback_msg: data.message,
      })
    })

    socket.on("rep_update", (data) => {
      console.log("📩 Received rep update:", data)
      setRepCount(data.rep_count)
    })

    socket.on("set_update", (data) => {
      console.log("📩 Received set update:", data)
      setSetCount(data.set_count)
    })

    return () => {
      console.log("🔌 Disconnecting socket...")
      socket.disconnect()
    }
  }, [])

  const handleStartExercise = (exerciseName) => {
    fetch("http://localhost:5000/api/start-exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ exercise_name: exerciseName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 Exercise Started:", data)
        setFeedback(null)
        setRepCount(0)
        setSetCount(0)
      })
      .catch((err) => console.error("❌ Error starting exercise:", err))
  }

  if (!exercisesData)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )

  return (
    <div className="container mx-auto p-6">
      <FeedbackPanel feedback={feedback} repCount={repCount} setCount={setCount} />

      {exercisesData.exercises.map((category, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-gray-200 pb-2">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.exercises.map((exercise, idx) => (
              <ExerciseCard key={idx} exercise={exercise} onStart={handleStartExercise} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExerciseList


"use client"

import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Configure Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyBDMYAX4pPgl0XO9wUwIEatNI3EdgHmYeU")

async function recommendRehabWithGemini(symptoms, exercisesData) {
  const prompt = `
    Given the following rehabilitation exercises:
    ${JSON.stringify(exercisesData.exercises, null, 4)}

    Based on the user's symptoms: ${JSON.stringify(symptoms)}
    Recommend the most suitable rehabilitation exercise in one or two words.
  `

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const response = await model.generateContent(prompt)

  return response.response.text()
}

const RehabRecommendationPage = () => {
  const [userSymptoms, setUserSymptoms] = useState([])
  const [recommendation, setRecommendation] = useState("")
  const [exerciseDetails, setExerciseDetails] = useState(null)
  const [exercisesData, setExercisesData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const exercisesResponse = await fetch("/exercises.json")
        const exercises = await exercisesResponse.json()
        setExercisesData(exercises)

        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("Token is missing. Please log in again.")
        }

        const response = await axios.get("http://localhost:5000/api/patients/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const symptoms = response.data.currentSymptoms || []
        setUserSymptoms(symptoms)

        if (symptoms.length > 0) {
          const recommendation = await recommendRehabWithGemini(symptoms, exercises)
          setRecommendation(recommendation)

          const matchingExercise = exercises.exercises
            .flatMap((category) => category.exercises)
            .find((exercise) => exercise.name.toLowerCase().includes(recommendation.toLowerCase()))

          setExerciseDetails(matchingExercise || null)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Rehabilitation Recommendation</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Symptoms:</h2>
        <ul className="list-disc pl-5 mb-4">
          {userSymptoms.map((symptom, index) => (
            <li key={index} className="mb-2">
              {symptom}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Recommended Rehabilitation:</h2>
        <p className="text-lg mb-4">{recommendation || "No recommendation available."}</p>

        {exerciseDetails && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Exercise Details:</h3>
            <p className="mb-2">
              <strong>Name:</strong> {exerciseDetails.name}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {exerciseDetails.description}
            </p>
            <button
              onClick={openDialog}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              View Tutorial
            </button>
          </div>
        )}
      </div>

      <dialog ref={dialogRef} className="p-0 rounded-lg shadow-xl">
        {exerciseDetails && (
          <div className="bg-white p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{exerciseDetails.name} Tutorial</h2>
            <p className="mb-4">{exerciseDetails.description}</p>
            <div className="mb-4">
              <a
                href={exerciseDetails.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Watch Tutorial on YouTube
              </a>
            </div>
            <button
              onClick={closeDialog}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}
      </dialog>
    </div>
  )
}

export default RehabRecommendationPage


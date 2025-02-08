import { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { FaUser, FaEnvelope, FaVenusMars, FaHistory, FaNotesMedical, FaComments, FaDumbbell } from "react-icons/fa"
import Chat from "../components/Chat"
import ExercisePlan from "../components/ExercisePlan"

const PatientProfiles = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null) // For Chat
  const [exercisePatient, setExercisePatient] = useState(null) // For Exercise Plan
  const [showAddExerciseForm, setShowAddExerciseForm] = useState(false)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patients/patients")
        console.log("Fetched patients:", response.data)
        setPatients(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("Error fetching patients:", error)
      }
    }
    fetchPatients()
  }, [])

  const openChat = (patient) => {
    setSelectedPatient(patient)
  }

  const closeChat = () => {
    setSelectedPatient(null)
  }

  const handleAddExerciseClick = (patient) => {
    setExercisePatient(patient) // Separate state for Exercise Plan
    setShowAddExerciseForm(true)
  }

  const handleCloseForm = () => {
    setShowAddExerciseForm(false)
    setExercisePatient(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Patient Profiles
        </motion.h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {patients.map((patient, index) => (
            <motion.div
              key={patient._id}
              className="bg-white overflow-hidden shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="px-6 py-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <FaUser className="text-4xl text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 text-center">{patient.name}</h2>
                  <p className="text-gray-600 mt-1">Age: {patient.age}</p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-600">
                    <FaEnvelope className="mr-2 text-blue-400" />
                    {patient.email}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <FaVenusMars className="mr-2 text-pink-400" />
                    {patient.gender}
                  </p>
                  <div className="flex items-start text-gray-600">
                    <FaHistory className="mr-2 mt-1 text-green-400 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Medical History:</span>
                      <ul className="list-disc list-inside ml-2 text-sm">
                        {patient.medicalHistory.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <FaNotesMedical className="mr-2 mt-1 text-red-400 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Current Symptoms:</span>
                      <ul className="list-disc list-inside ml-2 text-sm">
                        {patient.currentSymptoms.map((symptom, i) => (
                          <li key={i}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={() => openChat(patient)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <FaComments className="mr-2" />
                    Chat
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center transition-colors duration-300"
                    onClick={() => handleAddExerciseClick(patient)}
                  >
                    <FaDumbbell className="mr-2" />
                    Adjust Exercise Plan
                  </button>

                  {/* Add Exercise Form - Only for selected patient */}
                  {showAddExerciseForm && exercisePatient && exercisePatient._id === patient._id && (
                    <div className="w-full flex justify-center mt-8">
                      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Add New Exercise</h2>
                        <ExercisePlan onClose={handleCloseForm} patientId={exercisePatient._id} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Chat with {selectedPatient.name}</h2>
                <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <div className="p-4">
                <Chat patient={selectedPatient} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PatientProfiles

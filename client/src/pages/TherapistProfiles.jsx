import { useState, useEffect } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import { FaUserMd, FaGraduationCap, FaBrain, FaClock, FaComments } from "react-icons/fa"
import Chat from "../components/Chat"

const TherapistProfiles = () => {
  const [therapists, setTherapists] = useState([])
  const [selectedTherapist, setSelectedTherapist] = useState(null)

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/therapists/therapists")
        console.log("Fetched therapists:", response.data)
        setTherapists(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        console.error("Error fetching therapists:", error)
      }
    }

    fetchTherapists()
  }, [])

  const openChat = (therapist) => {
    console.log('Opening chat with therapist:', therapist)
    setSelectedTherapist(therapist)
  }

  const closeChat = () => {
    setSelectedTherapist(null)
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
          Therapist Profiles
        </motion.h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.map((therapist, index) => (
            <motion.div
              key={therapist._id}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="px-6 py-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaUserMd className="text-3xl text-teal-500 mr-3" />
                    <h2 className="text-2xl font-semibold text-gray-800">{therapist.name}</h2>
                  </div>
                  <button
                    onClick={() => openChat(therapist)}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                  >
                    <FaComments className="mr-2" />
                    Chat
                  </button>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <FaGraduationCap className="mr-2 text-blue-400" />
                    <span className="font-medium">Qualification:</span>
                    <span className="ml-2">{therapist.qualification}</span>
                  </p>
                  <div className="flex items-start text-gray-600">
                    <FaBrain className="mr-2 mt-1 text-purple-400" />
                    <div>
                      <span className="font-medium">Expertise:</span>
                      <div className="flex flex-wrap mt-1">
                        {therapist.expertise.map((item, i) => (
                          <span
                            key={i}
                            className="bg-teal-100 text-teal-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="flex items-center text-gray-600">
                    <FaClock className="mr-2 text-green-400" />
                    <span className="font-medium">Years of Experience:</span>
                    <span className="ml-2">{therapist.yearsOfExperience}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedTherapist && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Chat with {selectedTherapist.name}</h2>
                <button onClick={closeChat} className="text-gray-500 hover:text-gray-700">
                  &times;
                </button>
              </div>
              <div className="p-4">
                <Chat 
                  therapist={selectedTherapist} 
                  key={selectedTherapist._id} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TherapistProfiles


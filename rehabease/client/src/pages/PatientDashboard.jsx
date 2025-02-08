import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExerciseList from "../components/ExersiceList";
import AddExerciseForm from "../components/AddExerciseForm";
import {
  ChevronRight,
  Activity,
  Calendar,
  Award,
  Clock,
  Video,
  BarChart2,
  MessageCircle,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import io from "socket.io-client";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const PatientDashboard = () => {
  const [userSymptoms, setUserSymptoms] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);


  const progressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Overall Progress",
        data: [30, 45, 60, 75],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  
  useEffect(() => {
    // Chatbot script injection
    const script = document.createElement("script")
    script.innerHTML = `
      (function () {
        if (!window.chatbase || window.chatbase("getState") !== "initialized") {
          window.chatbase = (...arguments) => {
            if (!window.chatbase.q) {
              window.chatbase.q = [];
            }
            window.chatbase.q.push(arguments);
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") {
                return target.q;
              }
              return (...args) => target(prop, ...args);
            },
          });
        }
        const onLoad = function () {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "HZp1GgRFGKTnZ9jM0cdem";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    `
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const fetchUserSymptoms = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token is missing. Please log in again.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/patients/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const symptoms = response.data.currentSymptoms || [];
        setUserSymptoms(symptoms);
      } catch (error) {
        console.error("Error fetching patient data:", error.response?.data || error.message);
      }
    };

    fetchUserSymptoms();
  }, []);

  useEffect(() => {
    if (!userSymptoms || userSymptoms.length === 0) {
      setRecommendations([]);
      return;
    }

    const fetchExercises = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token is missing. Please log in again.");
        window.location.href = "/login";
        return;
      }

      try {
        const symptomsArray =
          Array.isArray(userSymptoms) && userSymptoms.length === 1
            ? userSymptoms[0].split(",").map((symptom) => symptom.trim())
            : Array.isArray(userSymptoms)
            ? userSymptoms
            : [];

        if (symptomsArray.length === 0) {
          alert("Please provide valid symptoms.");
          return;
        }

        const queryParams = new URLSearchParams({ userSymptoms: symptomsArray }).toString();

        const response = await axios.get(
          `http://localhost:5000/api/patients/recommended-exercises?${queryParams}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommended exercises:", error.response?.data || error.message);
      }
    };

    fetchExercises();
  }, [userSymptoms]);
  const handleAddExerciseClick = () => {
    setShowAddExerciseForm(true);
  };

  const handleCloseForm = () => {
    setShowAddExerciseForm(false);
  };


  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold mb-8">Welcome back !!</h1>

      {/* Add Exercise Button (Top Right Corner) */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleAddExerciseClick}
          className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600"
        >
          Add Exercise
        </button>
      </div>

      {/* Add Exercise Form (Vertical View on Dashboard) */}
      {showAddExerciseForm && (
        <div className="w-full flex justify-center mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Add New Exercise</h2>
            <AddExerciseForm onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg">
          <Activity className="w-8 h-8 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Next Session</h2>
          <p className="text-lg">Today at 2:00 PM</p>
          <p className="text-sm mt-2">Shoulder Exercises</p>
        </div>

        <div className="bg-green-500 text-white rounded-lg p-6 shadow-lg">
          <Calendar className="w-8 h-8 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Weekly Progress</h2>
          <p className="text-lg">75% completed</p>
          <div className="w-full bg-green-300 rounded-full h-2.5 mt-4">
            <div className="bg-white h-2.5 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="bg-purple-500 text-white rounded-lg p-6 shadow-lg">
          <Award className="w-8 h-8 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Achievements</h2>
          <p className="text-lg">3 new badges earned</p>
          <Link to="/achievements" className="text-sm mt-2 flex items-center hover:underline">
            View achievements <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Line data={progressData} />
        </div>
      </div>

      {/* Today's Exercises */}
      <div className="grid md:grid-cols-1 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recommended Exercises</h2>
          {recommendations.length > 0 ? (
            <ul className="space-y-4">
              <ExerciseList recommendations={recommendations} />
            </ul>
          ) : (
            <p>No exercises available for today.</p>
          )}
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/request"
            className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Video className="w-6 h-6 mr-2 text-blue-500" />
            <span>Start Exercise</span>
          </Link>
          <Link
            to="/exercise"
            className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <BarChart2 className="w-6 h-6 mr-2 text-green-500" />
            <span>Exercise Library</span>
          </Link>
          <Link
            to="/patient/therapist"
            className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <MessageCircle className="w-6 h-6 mr-2 text-purple-500" />
            <span>Chat with Therapist</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

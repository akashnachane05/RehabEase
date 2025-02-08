import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";
import { Users, Video } from "lucide-react";
import ProgressChart from "./ProgressChart";
// Register Chart.js components
ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TherapistDashboard = () => {
  const patientProgressData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Patient Progress",
        data: [20, 40, 60, 80],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

 
 
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Therapist Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Patient Progress</h2>
          <ProgressChart />
        </div>
      </div>
      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/therapist/patients"
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow flex items-center justify-center"
        >
          <Users className="mr-2" /> View Patients
        </Link>
        <Link
          to="/sessions"
          className="bg-green-600 text-white px-4 py-2 rounded shadow flex items-center justify-center"
        >
          <Video className="mr-2" /> Start Video Session
        </Link>
      </div>
    </div>
  );
};

export default TherapistDashboard;

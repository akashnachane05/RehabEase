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

  const patientAdherenceData = {
    labels: ["Patient 1", "Patient 2", "Patient 3"],
    datasets: [
      {
        label: "Adherence",
        data: [70, 80, 90],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const messages = [
    { id: 1, patient: "Patient 1", text: "Message from Patient 1" },
    { id: 2, patient: "Patient 2", text: "Message from Patient 2" },
  ];

  const appointments = [
    { id: 1, patient: "Patient 3", date: "2025-01-12" },
    { id: 2, patient: "Patient 4", date: "2025-01-14" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Therapist Dashboard</h1>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Patient Progress</h2>
          <Line data={patientProgressData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Patient Adherence</h2>
          <Bar data={patientAdherenceData} />
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id} className="mb-2">
              {message.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Appointments */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} className="mb-2">
              {appointment.patient} - {appointment.date}
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/patients"
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

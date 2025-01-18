import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, Video, ChevronRight, Clock, User, Award, BarChart2, MessageCircle } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState('exercises');

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Overall Progress',
        data: [30, 45, 60, 75],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const exercises = [
    { name: 'Shoulder Rotation', duration: '10 mins', completed: false },
    { name: 'Knee Flexion', duration: '15 mins', completed: true },
    { name: 'Ankle Mobility', duration: '10 mins', completed: false },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back, John</h1>
      
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
            <div className="bg-white h-2.5 rounded-full" style={{width: '75%'}}></div>
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

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Line data={progressData} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Today's Exercises</h2>
          <ul className="space-y-4">
            {exercises.map((exercise, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{exercise.name}</p>
                  <p className="text-sm text-gray-600">{exercise.duration}</p>
                </div>
                {exercise.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Start
                  </button>
                )}
              </li>
            ))}
          </ul>
          <Link to="/exercises" className="mt-4 inline-block text-blue-600 hover:underline">
            View all exercises <ChevronRight className="inline w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
          <ul className="space-y-4">
            {[
              { date: 'Today, 2:00 PM', doctor: 'Dr. Smith', type: 'Video Call' },
              { date: 'Tomorrow, 10:00 AM', doctor: 'Dr. Johnson', type: 'In-person' },
              { date: 'Friday, 3:30 PM', doctor: 'Dr. Williams', type: 'Video Call' },
            ].map((appointment, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">{appointment.date}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  </div>
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                  {appointment.type}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/appointments" className="mt-4 inline-block text-blue-600 hover:underline">
            View all appointments <ChevronRight className="inline w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/video-tutorials" className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Video className="w-6 h-6 mr-2 text-blue-500" />
            <span>Video Tutorials</span>
          </Link>
          <Link to="/exercise-library" className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <BarChart2 className="w-6 h-6 mr-2 text-green-500" />
            <span>Exercise Library</span>
          </Link>
          <Link to="/chat-therapist" className="flex items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
            <MessageCircle className="w-6 h-6 mr-2 text-purple-500" />
            <span>Chat with Therapist</span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recent Messages</h2>
        <ul className="space-y-4">
          {[
            { name: 'Dr. Smith', message: 'Great progress on your exercises! Keep it up.', time: '2 hours ago' },
            { name: 'Nurse Johnson', message: 'Your latest test results are ready. Please schedule a call.', time: 'Yesterday' },
            { name: 'Reception', message: 'Reminder: Your next appointment is tomorrow at 10 AM.', time: '2 days ago' },
          ].map((message, index) => (
            <li key={index} className="flex items-start space-x-3 border-b pb-2">
              <User className="w-10 h-10 text-gray-500 bg-gray-200 rounded-full p-2" />
              <div className="flex-1">
                <p className="font-medium">{message.name}</p>
                <p className="text-gray-600">{message.message}</p>
                <p className="text-sm text-gray-500 mt-1">{message.time}</p>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/messages" className="mt-4 inline-block text-blue-600 hover:underline">
          View all messages <ChevronRight className="inline w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default PatientDashboard;


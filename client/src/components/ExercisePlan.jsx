import React, { useState } from "react";
import axios from "axios";

const ExercisePlan = ({ onClose, patientId }) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to add an exercise");
      return;
    }

    try {
      const exerciseData = {
        patientId,
        category,
        exercise: {
          name,
          description,
          video,
          sets,
          reps,
          symptoms: symptoms.split(",").map((s) => s.trim()),
        },
      };

      await axios.post("http://localhost:5000/api/therapists/add-exercises", exerciseData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Exercise added successfully");
      console.log(patientId);
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error adding exercise:", error.response?.data || error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 transform transition-all">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add New Exercise</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter category"
              required
            />
          </div>

          {/* Exercise Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Exercise Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter exercise name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter description"
              rows={3}
              required
            ></textarea>
          </div>

          {/* Video URL */}
          <div>
            <label
              htmlFor="video"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video URL
            </label>
            <input
              id="video"
              type="url"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter video URL"
            />
          </div>

          {/* Sets */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="sets"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sets
              </label>
              <input
                id="sets"
                type="number"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter sets"
              />
            </div>

            {/* Reps */}
            <div>
              <label
                htmlFor="reps"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Reps
              </label>
              <input
                id="reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter reps"
              />
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Symptoms (comma-separated)
            </label>
            <input
              id="symptoms"
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              placeholder="Enter symptoms"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            >
              Add Exercise
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExercisePlan;

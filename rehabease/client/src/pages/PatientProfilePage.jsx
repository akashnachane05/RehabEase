import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientProfile = () => {
  const [patientData, setPatientData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    gender: "",
    medicalHistory: "",
    currentSymptoms: "",
  });
  const [userSymptoms, setUserSymptoms] = useState(null);

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchData = async () => {
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
        setPatientData(response.data);
        if (response.data.currentSymptoms!="") {
          setUserSymptoms(response.data.currentSymptoms);
        }
        console.log(userSymptoms);
        setEditedData({
          name: response.data.name || "",
          email: response.data.email || "",
          age: response.data.age || "",
          dob: response.data.dob || "",
          gender: response.data.gender || "",
          medicalHistory: response.data.medicalHistory || "",
          currentSymptoms: response.data.currentSymptoms || "",
        });
       

      } catch (error) {
        console.error("Error fetching patient data:", error.response?.data || error.message);
        alert(`Failed to fetch data: ${error.response?.data?.message || "Server error."}`);
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/patients/profile",
        { ...editedData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPatientData(response.data); // Update with latest data
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating patient data:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Failed to update profile."}`);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(patientData); // Reset to original data
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient Profile</h1>
      {patientData ? (
        <div>
          {isEditing ? (
            <form className="space-y-6">
              {Object.keys(editedData).map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-lg font-medium text-gray-700 mb-1"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={editedData[field] || ""}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              ))}
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-lg">
                <strong>Name:</strong> {patientData.name || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {patientData.email || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Age:</strong> {patientData.age || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Date of Birth:</strong> {patientData.dob || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Gender:</strong> {patientData.gender || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Medical History:</strong> {patientData.medicalHistory || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Current Symptoms:</strong> {patientData.currentSymptoms || "N/A"}
              </p>
              <button
                type="button"
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg mt-6 hover:bg-green-600"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientProfile;

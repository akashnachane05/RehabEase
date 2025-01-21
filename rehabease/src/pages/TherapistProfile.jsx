import React, { useState, useEffect } from "react";
import axios from "axios";

const TherapistProfile = () => {
  const [therapistData, setTherapistData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    qualification: "",
    expertise: [],
    yearsOfExperience: "",
  });

  // Fetch therapist data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Token is missing. Please log in again.");
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/therapists/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTherapistData(response.data);
        setEditedData({
          name: response.data.name || "",
          age: response.data.age || "",
          dob: response.data.dob || "",
          email: response.data.email || "",
          qualification: response.data.qualification || "",
          expertise: response.data.expertise || [],
          yearsOfExperience: response.data.yearsOfExperience || "",
        });
      } catch (error) {
        console.error("Error fetching therapist data:", error.response?.data || error.message);
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
        "http://localhost:5000/api/therapists/profile",
        { ...editedData },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTherapistData(response.data); // Update with latest data
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating therapist data:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Failed to update profile."}`);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(therapistData); // Reset to original data
  };

  return (
    <div className="container mx-auto max-w-4xl p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Therapist Profile</h1>
      {therapistData ? (
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
                    type={field === "dob" ? "date" : "text"}
                    id={field}
                    name={field}
                    value={
                      Array.isArray(editedData[field])
                        ? editedData[field].join(", ")
                        : editedData[field]
                    }
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
                <strong>Name:</strong> {therapistData.name || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Email:</strong> {therapistData.email || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Age:</strong> {therapistData.age || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Date of Birth:</strong> {therapistData.dob || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Qualification:</strong> {therapistData.qualification || "N/A"}
              </p>
              <p className="text-lg">
                <strong>Expertise:</strong>{" "}
                {therapistData.expertise?.length > 0
                  ? therapistData.expertise.join(", ")
                  : "N/A"}
              </p>
              <p className="text-lg">
                <strong>Years of Experience:</strong> {therapistData.yearsOfExperience || "N/A"}
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
        <p className="text-lg text-gray-600">Loading therapist data...</p>
      )}
    </div>
  );
};

export default TherapistProfile;

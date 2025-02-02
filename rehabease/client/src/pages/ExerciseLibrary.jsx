import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Utility to extract YouTube video ID
const getYouTubeId = (url) => {
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  } catch (error) {
    console.error("Error parsing YouTube URL:", error);
    return "";
  }
};
import ExerciseCard from '../components/ExerciseCard';

// Exercise Card component


// Exercise Category component
const ExerciseCategory = ({ categoryData }) => {
  return (
    <div className="mb-12">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 flex flex-col bg-white p-4 shadow-lg rounded-lg">
        {categoryData.exercises.map((exercise) => (
          <ExerciseCard key={exercise._id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

// Main Exercise List component
const ExerciseList = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    axios.get('http://localhost:5000/api/patients/exercises', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      // Access the exercises array inside the response
      if (response.data && Array.isArray(response.data.exercises)) {
        setData(response.data.exercises); // Setting the 'exercises' array directly
      } else {
        setData([]); // Fallback to empty array in case of invalid structure
      }
    })
    .catch(error => {
      console.error('There was an error fetching the data!', error);
    });
  }, []);

  return (
    <div className="p-11">
      <div className="mb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Safeguard against data being non-array */}
            {(data || []).map((categoryData, index) => (
              <TabsTrigger
                key={categoryData._id}
                value={index}
                className={`text-sm md:text-base font-semibold text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors ${activeTab === index ? 'bg-blue-100' : ''}`}
              >
                {categoryData.category}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="overflow-auto">
            {data[activeTab] && <ExerciseCategory categoryData={data[activeTab]} />}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ExerciseList;

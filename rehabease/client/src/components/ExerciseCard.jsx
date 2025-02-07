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

// Exercise Card component
const ExerciseCard = ({ exercise }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isVideoOpen) {
      const videoId = getYouTubeId(exercise.video);
      setVideoId(videoId);
    } else {
      setVideoId("");
    }
    setIsLoading(true);
  }, [isVideoOpen, exercise.video]);

  return (
    <Card >
          <CardHeader>
            <CardTitle>{exercise.name|| "Exercise Name Not Available"}</CardTitle>
            <CardDescription>{exercise.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">Sets: {exercise.sets}</p>
            <p className="text-sm text-gray-600 mb-4">Reps: {exercise.reps}</p>
          </CardContent>
          <CardFooter>
            <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
              <DialogTrigger asChild>
                <Button aria-label={`Start ${exercise.name} exercise video`}>Watch Tutorial</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>{exercise.name}</DialogTitle>
                </DialogHeader>
                {videoId && (
                  <div className="aspect-video">
                    {isLoading && <div className="w-full h-full flex items-center justify-center">Loading...</div>}
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      onLoad={() => setIsLoading(false)}
                      style={{ display: isLoading ? "none" : "block" }}
                    ></iframe>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardFooter>
    </Card>
        
  );
};

// Exercise Category component
const ExerciseCategory = ({ categoryData }) => {
  return (
    <div className="mb-12">
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

export default ExerciseCard;
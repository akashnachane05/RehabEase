import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const exercises = [
  { id: 1, name: 'Shoulder Rotation', duration: '2 minutes', instructions: 'Stand with your arms at your sides. Slowly rotate your shoulders forward, up, back, and down in a circular motion.' },
  { id: 2, name: 'Knee Flexion', duration: '3 minutes', instructions: 'Sit on a chair with your feet flat on the floor. Slowly lift your right foot off the floor, bending your knee as much as possible. Hold for 5 seconds, then lower. Repeat with the left leg.' },
  { id: 3, name: 'Ankle Mobility', duration: '2 minutes', instructions: 'Sit on a chair with your feet flat on the floor. Lift your right foot off the floor and rotate your ankle in a circular motion. Do 10 rotations clockwise and 10 counterclockwise. Repeat with the left ankle.' },
];

export default function ExercisePage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let timer;
    if (isExercising && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsExercising(false);
    }
    return () => clearTimeout(timer);
  }, [isExercising, timeLeft]);

  const startExercise = () => {
    setIsExercising(true);
    setTimeLeft(parseInt(exercises[currentExercise].duration) * 60);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setIsExercising(false);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setIsExercising(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Exercise Session</h1>
      <Card>
        <CardHeader>
          <CardTitle>{exercises[currentExercise].name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{exercises[currentExercise].instructions}</p>
          <p className="mb-4">Duration: {exercises[currentExercise].duration}</p>
          {isExercising ? (
            <div>
              <Progress value={(timeLeft / (parseInt(exercises[currentExercise].duration) * 60)) * 100} className="mb-4" />
              <p className="text-center mb-4">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
            </div>
          ) : (
            <Button onClick={startExercise} className="w-full mb-4">Start Exercise</Button>
          )}
          <div className="flex justify-between">
            <Button onClick={prevExercise} disabled={currentExercise === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={nextExercise} disabled={currentExercise === exercises.length - 1}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Exercise Progress</h2>
        <div className="flex justify-between">
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentExercise ? 'bg-green-500' : 'bg-gray-300'}`}>
                {index < currentExercise ? (
                  <CheckCircle className="h-6 w-6 text-white" />
                ) : (
                  <span className="text-white font-bold">{index + 1}</span>
                )}
              </div>
              {index < exercises.length - 1 && (
                <div className={`h-1 w-16 ${index < currentExercise ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


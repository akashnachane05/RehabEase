import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExercisePlanCreatorPage() {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState({
    name: '',
    duration: '',
    instructions: '',
    difficulty: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExercise({ ...currentExercise, [name]: value });
  };

  const handleSelectChange = (value) => {
    setCurrentExercise({ ...currentExercise, difficulty: value });
  };

  const addExercise = () => {
    if (currentExercise.name && currentExercise.duration && currentExercise.instructions && currentExercise.difficulty) {
      setExercises([...exercises, { ...currentExercise, id: Date.now() }]);
      setCurrentExercise({ name: '', duration: '', instructions: '', difficulty: '' });
    }
  };

  const removeExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exercise Plan:', exercises);
    // Here you would typically send this data to your backend
    alert('Exercise plan created successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Exercise Plan</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add New Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <Input
              name="name"
              placeholder="Exercise Name"
              value={currentExercise.name}
              onChange={handleInputChange}
            />
            <Input
              name="duration"
              placeholder="Duration (e.g., 2 minutes)"
              value={currentExercise.duration}
              onChange={handleInputChange}
            />
            <Textarea
              name="instructions"
              placeholder="Exercise Instructions"
              value={currentExercise.instructions}
              onChange={handleInputChange}
            />
            <Select onValueChange={handleSelectChange} value={currentExercise.difficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={addExercise} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Exercise
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Exercise Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {exercises.length === 0 ? (
            <p>No exercises added yet.</p>
          ) : (
            <ul className="space-y-4">
              {exercises.map((exercise) => (
                <li key={exercise.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="text-sm text-gray-600">{exercise.duration} - {exercise.difficulty}</p>
                  </div>
                  <Button variant="ghost" onClick={() => removeExercise(exercise.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
          <Button onClick={handleSubmit} className="w-full mt-4">Create Exercise Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}


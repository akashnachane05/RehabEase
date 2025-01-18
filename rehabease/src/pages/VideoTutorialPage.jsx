import React from 'react';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tutorials = [
  { id: 1, title: 'Introduction to Shoulder Exercises', duration: '5:30', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: 2, title: 'Proper Knee Flexion Technique', duration: '7:15', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: 3, title: 'Ankle Mobility Exercises for Beginners', duration: '6:45', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: 4, title: 'Advanced Shoulder Rehabilitation', duration: '8:20', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: 5, title: 'Post-Surgery Knee Exercises', duration: '10:00', thumbnail: '/placeholder.svg?height=200&width=300' },
  { id: 6, title: 'Improving Balance and Stability', duration: '9:30', thumbnail: '/placeholder.svg?height=200&width=300' },
];

export default function VideoTutorialPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Video Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-12 w-12 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{tutorial.title}</CardTitle>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {tutorial.duration}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


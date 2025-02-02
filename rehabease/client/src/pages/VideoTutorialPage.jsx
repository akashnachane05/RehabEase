import React, { useState } from 'react';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const tutorials = [
  // Motivational Videos
  { 
    id: 1, 
    title: 'Motivational Video for Rehabilitation', 
    duration: '5:00', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/3x0n6I4mjPo' // Updated to use embed URL
  },
  { 
    id: 2, 
    title: 'Overcoming Challenges: A Story of Strength', 
    duration: '6:30', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/kQ41uyJij6I' // Updated to use embed URL
  },

  // Healthy Living Tips
  { 
    id: 3, 
    title: '10 Tips for a Healthier Life', 
    duration: '7:10', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/bJXvnf3vAb8' // Healthy tips video
  },
  { 
    id: 4, 
    title: 'Healthy Eating Habits for a Better Life', 
    duration: '5:45', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/FNm5GAcmw8I' // Healthy eating habits video
  },

  // Yoga Videos
  { 
    id: 5, 
    title: 'Yoga for Rehabilitation and Recovery', 
    duration: '10:20', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/dGmpMRAUlgE' // Yoga for rehabilitation video
  },
  { 
    id: 6, 
    title: 'Gentle Yoga for Mental Clarity', 
    duration: '8:30', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/15GzNo3Kdtk' // Mental clarity yoga video
  },

  // Other Videos
  { 
    id: 7, 
    title: 'Breathing Techniques for Stress Relief', 
    duration: '4:50', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/dUB94gHHovQ' // Breathing techniques video
  },
  { 
    id: 8, 
    title: 'Mindfulness Meditation for Beginners', 
    duration: '15:00', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/0J6h8c2oRrk' // Meditation video
  },
  { 
    id: 9, 
    title: 'Rehabilitation and Motivation: Staying Positive', 
    duration: '7:50', 
    thumbnail: '/placeholder.svg?height=200&width=300', 
    videoUrl: 'https://www.youtube.com/embed/XugpLmc2bDQ' // Rehabilitation motivational video
  },
];

export default function VideoTutorialPage() {
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleClick = (videoUrl) => {
    if (playingVideo === videoUrl) {
      setPlayingVideo(null); // Stop the video if clicked again
    } else {
      setPlayingVideo(videoUrl); // Start the clicked video
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Motivational & Rehabilitation Video Tutorials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-48 object-cover" />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={() => handleClick(tutorial.videoUrl)}
                >
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
            {playingVideo === tutorial.videoUrl && (
              <div className="w-full mt-4">
                <iframe 
                  width="100%" 
                  height="315" 
                  src={tutorial.videoUrl} 
                  title={tutorial.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { HandHeart, Activity, Calendar, Video } from 'lucide-react';

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">Your Journey to Recovery Starts Here</h1>
          <p className="text-xl text-gray-600">RehabEase provides personalized virtual rehabilitation programs, expert guidance, and progress tracking to help you recover faster and more effectively.</p>
          <div className="flex gap-4">
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Get Started
            </Link>
            <Link to="/about" className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 rounded border border-blue-600">
              Learn More
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-xl">
          <img
            src="https://media.istockphoto.com/id/1501185786/photo/man-doing-physical-therapy-exercises-using-a-stretch-band.jpg?s=2048x2048&w=is&k=20&c=iL3sOsffH5maNRlK6Dwypjut_spvs3F1ZLO5ww8TSA0="
            alt="Man doing physical therapy exercises using a stretch band"
            className="object-cover w-full h-full transition-transform duration-5000 ease-in-out hover:scale-110"
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How RehabEase Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: HandHeart, title: "Personalized Care", description: "Tailored rehabilitation programs designed for your specific needs" },
            { icon: Activity, title: "Progress Tracking", description: "Monitor your recovery journey with detailed analytics and insights" },
            { icon: Calendar, title: "Flexible Scheduling", description: "Book appointments with therapists at times that suit you best" },
            { icon: Video, title: "Virtual Sessions", description: "High-quality video calls for remote consultations and guided exercises" },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Recovery Journey?</h2>
        <p className="text-xl text-gray-600 mb-8">Join thousands of patients who have successfully recovered with RehabEase</p>
        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Sign Up Now
        </Link>
      </section>
    </div>
  );
}

export default HomePage;


import React from 'react';
import { HandHeart, Award, Users } from 'lucide-react';

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About RehabEase</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At RehabEase, we're committed to revolutionizing rehabilitation through innovative virtual solutions. Our mission is to make high-quality rehabilitation services accessible to everyone, regardless of their location or mobility constraints.
          </p>
          <p className="text-lg text-gray-700">
            We believe that recovery should be a seamless, supported journey. By combining cutting-edge technology with expert care, we're empowering patients to take control of their rehabilitation process and achieve better outcomes.
          </p>
        </div>
        <div className="relative h-[300px] md:h-full rounded-lg overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/2158900050/photo/smiling-young-female-assistant-of-physiotherapy-center-while-standing-helping-cheerful-aged.jpg?s=2048x2048&w=is&k=20&c=ZbBUHaRH6HGsDzxWLLrtM97IFFKfS8fktc5tpptOMjw="
            alt="Smiling physiotherapist assisting an elderly patient"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[
          { icon: HandHeart, title: "Expert Care", description: "Our team of certified therapists provides personalized attention and guidance." },
          { icon: Award, title: "Innovative Technology", description: "We leverage cutting-edge virtual rehabilitation tools for optimal results." },
          { icon: Users, title: "Community Support", description: "Join a supportive community of patients on similar recovery journeys." },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg text-gray-700 mb-4">
          Founded in 2020, RehabEase was born out of a desire to bridge the gap between traditional rehabilitation services and the growing need for remote healthcare solutions. Our founders, a team of experienced physiotherapists and tech innovators, recognized the potential of virtual platforms to transform the rehabilitation experience.
        </p>
        <p className="text-lg text-gray-700">
          Since our inception, we've helped thousands of patients recover from injuries, surgeries, and chronic conditions, all from the comfort of their homes. As we continue to grow, our commitment to improving lives through accessible, high-quality rehabilitation remains at the heart of everything we do.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;


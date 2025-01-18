import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

function ServicesPage() {
  const services = [
    {
      title: "Virtual Physical Therapy",
      description: "Personalized treatment plans and exercises guided by certified physical therapists through video sessions.",
      features: [
        "One-on-one video consultations",
        "Custom exercise programs",
        "Progress tracking and adjustments",
        "Access to educational resources"
      ]
    },
    {
      title: "Occupational Therapy",
      description: "Improve your daily living skills and regain independence with our virtual occupational therapy services.",
      features: [
        "Adaptive equipment recommendations",
        "Home safety assessments",
        "Fine motor skill exercises",
        "Cognitive rehabilitation techniques"
      ]
    },
    {
      title: "Speech Therapy",
      description: "Enhance your communication skills with our specialized virtual speech therapy sessions.",
      features: [
        "Speech and language assessments",
        "Articulation and fluency training",
        "Swallowing disorder treatments",
        "Voice therapy exercises"
      ]
    },
    {
      title: "Mental Health Support",
      description: "Access mental health services to support your overall well-being during your rehabilitation journey.",
      features: [
        "Individual counseling sessions",
        "Stress management techniques",
        "Coping skills development",
        "Integration with physical rehabilitation"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <p className="text-xl text-gray-700 text-center mb-12">
        Discover our range of virtual rehabilitation services designed to support your recovery journey.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 px-6 py-4">
              <Link to="/contact" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Learn More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Not sure which service is right for you?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Our team of experts is here to help you find the perfect rehabilitation program for your needs.
        </p>
        <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
          Contact Us for a Consultation
        </Link>
      </div>
    </div>
  );
}

export default ServicesPage;


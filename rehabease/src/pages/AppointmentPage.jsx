import React, { useState } from 'react';
import { CalendarIcon, Clock, Video, User } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];

const therapists = [
  { id: 1, name: 'Dr. Smith', specialty: 'Physical Therapy' },
  { id: 2, name: 'Dr. Johnson', specialty: 'Occupational Therapy' },
  { id: 3, name: 'Dr. Williams', specialty: 'Speech Therapy' },
];

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedTherapist) {
      alert(`Appointment booked with ${selectedTherapist} on ${selectedDate.toDateString()} at ${selectedTime}`);
      // Here you would typically send this data to your backend
    } else {
      alert('Please select a date, time, and therapist before booking.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Select Date and Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="mb-4"
            />
            <Select onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Therapist</CardTitle>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedTherapist}>
              <SelectTrigger>
                <SelectValue placeholder="Select therapist" />
              </SelectTrigger>
              <SelectContent>
                {therapists.map((therapist) => (
                  <SelectItem key={therapist.id} value={therapist.name}>
                    {therapist.name} - {therapist.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleBookAppointment} className="w-full mt-4">Book Appointment</Button>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {[
              { date: 'May 15, 2023', time: '10:00 AM', therapist: 'Dr. Smith', type: 'Video Call' },
              { date: 'May 18, 2023', time: '02:00 PM', therapist: 'Dr. Johnson', type: 'In-person' },
              { date: 'May 22, 2023', time: '11:00 AM', therapist: 'Dr. Williams', type: 'Video Call' },
            ].map((appointment, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                  <div>
                    <p className="font-medium">{appointment.date}, {appointment.time}</p>
                    <p className="text-sm text-gray-600">{appointment.therapist}</p>
                  </div>
                </div>
                <span className={`text-sm py-1 px-2 rounded-full ${
                  appointment.type === 'Video Call' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.type}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


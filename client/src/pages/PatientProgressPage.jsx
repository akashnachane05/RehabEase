import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Chart.js setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const progressData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'Overall Progress',
      data: [30, 45, 55, 70, 80, 85],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
};

const exerciseData = [
  { name: 'Shoulder Rotation', completionRate: '90%', averageAccuracy: '85%' },
  { name: 'Knee Flexion', completionRate: '85%', averageAccuracy: '80%' },
  { name: 'Ankle Mobility', completionRate: '95%', averageAccuracy: '90%' },
  { name: 'Hip Abduction', completionRate: '80%', averageAccuracy: '75%' },
  { name: 'Wrist Flexion', completionRate: '88%', averageAccuracy: '82%' },
];

export default function PatientProgressPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Progress</h1>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="john-doe">John Doe</SelectItem>
            <SelectItem value="jane-smith">Jane Smith</SelectItem>
            <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={progressData} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Exercise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead>Completion Rate</TableHead>
                  <TableHead>Average Accuracy</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exerciseData.map((exercise, index) => (
                  <TableRow key={index}>
                    <TableCell>{exercise.name}</TableCell>
                    <TableCell>{exercise.completionRate}</TableCell>
                    <TableCell>{exercise.averageAccuracy}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li>
              <p className="font-medium">May 10, 2023</p>
              <p className="text-sm text-gray-600">Patient showing significant improvement in shoulder mobility. Recommend increasing exercise difficulty.</p>
            </li>
            <li>
              <p className="font-medium">May 3, 2023</p>
              <p className="text-sm text-gray-600">Knee flexion exercises causing mild discomfort. Adjusted routine to include more warm-up exercises.</p>
            </li>
            <li>
              <p className="font-medium">April 26, 2023</p>
              <p className="text-sm text-gray-600">Patient consistently completing all assigned exercises. Progress is steady and encouraging.</p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}


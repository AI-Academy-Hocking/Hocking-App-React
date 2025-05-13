import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import studentCenterImage from "@/components/assets/studentCenter.jpg"; // Import the image

function RecreationPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Recreation & Student Center</h1>
      
      <Card className="overflow-hidden mb-6">
        <div className="h-48 w-full bg-gray-200 flex items-center justify-center border-b">
          <img 
            src={studentCenterImage} 
            alt="Recreation Center" 
            className="w-full h-full object-cover" 
          />
        </div>
      </Card>
      
      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Student Center Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Hours of Operation</p>
              <p className="text-neutral-dark">Monday – Friday, 8:00 AM – 10:00 PM</p>
              <p className="text-neutral-dark">Saturday & Sunday, 11:00 AM – 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Phone</p>
              <a href="tel:7407536535" className="text-primary hover:underline">(740) 753-6535</a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:studentcenter@hocking.edu" className="text-primary hover:underline">studentcenter@hocking.edu</a>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Available Facilities</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Full-size gymnasium</li>
            <li>Fitness center with cardio and strength equipment</li>
            <li>Student lounge with TV and gaming areas</li>
            <li>Study spaces and meeting rooms</li>
            <li>Outdoor recreation equipment rentals</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecreationPage;

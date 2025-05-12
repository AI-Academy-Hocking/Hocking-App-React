
import React from 'react';
import { Book, Clock, Map, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function LibraryPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6">Library Resources</h1>
      
      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Library Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Hours of Operation</p>
              <p className="text-neutral-dark">Monday – Friday, 8:00 AM – 9:00 PM</p>
              <p className="text-neutral-dark">Saturday, 10:00 AM – 6:00 PM</p>
              <p className="text-neutral-dark">Sunday, 12:00 PM – 8:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Map className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-neutral-dark">Davidson Hall, 2nd Floor</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Phone</p>
              <a href="tel:7407536489" className="text-primary hover:underline">(740) 753-6489</a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:library@hocking.edu" className="text-primary hover:underline">library@hocking.edu</a>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Available Resources</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="list-disc list-inside space-y-2 pl-2">
            <li>Physical book collection</li>
            <li>Electronic databases and journals</li>
            <li>Study rooms (reservations available)</li>
            <li>Computer workstations</li>
            <li>Printing and scanning services</li>
            <li>Research assistance</li>
            <li>Interlibrary loan</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default LibraryPage;

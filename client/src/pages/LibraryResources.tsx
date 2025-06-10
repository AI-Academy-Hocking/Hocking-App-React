import React from 'react';
import { ArrowLeft, BookOpen, Clock, Phone, Mail, Users, Printer, CreditCard, Gift, Calendar } from 'lucide-react';
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function LibraryResources() {
  const [activeTab, setActiveTab] = React.useState("hours");

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/academic-success">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Academic Success Center</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Library Resources</h1>
      </div>

      {/* Contact Information */}
      <UICard className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              <a href="tel:740-753-6332" className="text-lg hover:text-blue-600">
                740-753-6332
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <a href="mailto:library@hocking.edu" className="text-lg hover:text-blue-600">
                library@hocking.edu
              </a>
            </div>
          </div>
        </CardContent>
      </UICard>

      {/* Hours */}
      <UICard className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Library Hours</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="fall-spring" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fall-spring">Fall/Spring Hours</TabsTrigger>
              <TabsTrigger value="summer">Summer Hours</TabsTrigger>
            </TabsList>
            <TabsContent value="fall-spring" className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <p className="text-lg">Monday - Thursday: 7:30 a.m. - 9:00 p.m.</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <p className="text-lg">Friday: 7:30 a.m. - 5:00 p.m.</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <p className="text-lg">Saturday and Sunday: Noon - 5:00 p.m.</p>
              </div>
            </TabsContent>
            <TabsContent value="summer" className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <p className="text-lg">Monday - Friday: 8:00 a.m. - 5:00 p.m.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </UICard>

      {/* Services */}
      <UICard className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Library Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CreditCard className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">OhioLINK Access</h3>
                <p>Get your OhioLINK patron card to access resources from libraries across Ohio</p>
                <Button variant="ghost" className="mt-2">Get Card</Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Printer className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Computers & Printing</h3>
                <p>Access to computers and printing services for academic work</p>
                <Button variant="ghost" className="mt-2">Learn More</Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Study Spaces</h3>
                <p>Quiet places to study and collaborate with peers</p>
                <Button variant="ghost" className="mt-2">View Spaces</Button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gift className="h-8 w-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">Free Book Program</h3>
                <p>Pick up a free book from our selection of donated materials</p>
                <Button variant="ghost" className="mt-2">Browse Books</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </UICard>

      {/* Additional Resources */}
      <UICard>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <p className="text-lg">Check out our upcoming events and workshops</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <p className="text-lg">Access our digital collection and research databases</p>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <p className="text-lg">Join our book club and discussion groups</p>
            </div>
          </div>
        </CardContent>
      </UICard>
    </div>
  );
}

export default LibraryResources; 
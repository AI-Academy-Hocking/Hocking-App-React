import React from 'react';
import { ArrowLeft, Heart, Phone, Mail, MapPin, Clock, FileText, Users, Shield, HelpCircle, CheckCircle2, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function AccessibilityResources() {
  const faqItems = [
    {
      question: "Who is eligible?",
      answer: "Eligibility will be determined on the basis of the presence of a disability and a need for accommodations to support an equal educational opportunity. Students with permanent, chronic or temporary conditions that are disabling are considered eligible to enroll with Accessibility Resources."
    },
    {
      question: "What documentation is required?",
      answer: "Documentation of the disability is required and this may include an IEP/504 Plan or a letter from a qualified medical provider that names the disability, describes the functional limitations of that disability, and includes recommendations for accommodations in the college setting."
    },
    {
      question: "Will my documentation be held confidential?",
      answer: "All documentation of disability submitted to the Accessibility Resources office will be held in confidence."
    },
    {
      question: "When should I request accommodations?",
      answer: "Students who wish to request accommodations should not delay in contacting Accessibility Resources. Timeliness is important because accommodations cannot be given retroactively."
    },
    {
      question: "What accommodations are provided?",
      answer: "Accommodations are determined on an individualized basis and may include a quiet testing area, extended time for tests, a reader on exams, ASL, CART, closed captioning, audio recording of lectures, and others. Students must meet with Accessibility Resources staff in order to determine the most appropriate accommodations at the college level."
    },
    {
      question: "What support services does Accessibility Resources provide?",
      answer: "Accessibility Resources staff are available to assist students with supportive needs which may include advising, instructional guidance and serving as liaison with college instructors and staff to promote the welfare of students."
    },
    {
      question: "How do I request services?",
      answer: "Students or prospective students who would like more information or to request disability related services and accommodations should meet with the Accessibility Resources staff in DVD 114, phone 740-753-7104, or email accessibility@hocking.edu."
    }
  ];

  const accommodations = [
    "Quiet Testing Area",
    "Extended Test Time",
    "Exam Reader",
    "ASL Interpreting",
    "CART Services",
    "Closed Captioning",
    "Audio Recording",
    "Note-Taking Assistance",
    "Alternative Format Materials",
    "Assistive Technology"
  ];

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
        <Heart className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Accessibility Resources</h1>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-lg mb-4">
            The Accessibility Resources Office is dedicated to serving the various needs of individuals with disabilities 
            and is committed to promoting their full participation in college life.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Committed to ADA compliance and equal access</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>DVD 114</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-7104" className="hover:text-blue-600">
                  740-753-7104
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:accessibility@hocking.edu" className="hover:text-blue-600">
                  accessibility@hocking.edu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Monday - Friday: 8:00 AM - 5:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Available Accommodations</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-wrap gap-2">
              {accommodations.map((accommodation) => (
                <Badge key={accommodation} variant="secondary">
                  {accommodation}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Legal Rights & Grievance Process</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-4">
            Hocking College supports you in your right to file a grievance when you believe you have been denied equal access 
            in the form of appropriate accommodations, modifications, auxiliary aids or effective communication or suffered 
            discriminatory harassment as described in Section 504 of the Rehabilitation Act of 1973, The Americans with 
            Disabilities Act (ADA) of 1990, or the Ohio Administrative Code 4112-5-09.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <Lock className="h-5 w-5" />
            <span className="font-medium">Your rights are protected by law</span>
          </div>
          <Button variant="ghost" className="mt-4">
            File a Grievance
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccessibilityResources; 
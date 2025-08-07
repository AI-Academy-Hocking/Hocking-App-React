import { ArrowLeft, Accessibility, Phone, Mail, FileText, Clock, Heart, Utensils, Home, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

function AccessibilityResources() {
  const services = [
    {
      title: "Academic Accommodations",
      icon: FileText,
      description: "Support for academic success",
      items: [
        "Extended time for tests",
        "Note-taking assistance",
        "Alternative format materials",
        "Sign language interpreters",
        "Assistive technology"
      ]
    },
    {
      title: "Emotional Support Animals",
      icon: Heart,
      description: "ESA approval and support",
      items: [
        "ESA approval process",
        "Housing accommodations",
        "Documentation requirements",
        "Campus guidelines",
        "Support resources"
      ]
    },
    {
      title: "Meal Plan Accommodations",
      icon: Utensils,
      description: "Dietary and medical accommodations",
      items: [
        "Meal plan exemption requests",
        "Dietary restriction documentation",
        "Medical necessity verification",
        "Alternative dining options",
        "Nutrition consultation"
      ]
    },
    {
      title: "Housing Accommodations",
      icon: Home,
      description: "Special housing arrangements",
      items: [
        "Accessible housing options",
        "Single room accommodations",
        "Medical necessity housing",
        "ESA housing arrangements",
        "Emergency housing support"
      ]
    }
  ];

  const faqItems = [
    {
      question: "How do I request accommodations?",
      answer: "Contact our office to schedule an intake appointment. Bring any relevant documentation of your disability or medical condition. We'll work with you to determine appropriate accommodations."
    },
    {
      question: "What documentation do I need for an ESA?",
      answer: "You'll need a letter from a licensed mental health professional stating the need for an Emotional Support Animal. The letter should be on professional letterhead and include specific details about your need for the ESA."
    },
    {
      question: "How do I apply for a meal plan exemption?",
      answer: "Submit documentation from a healthcare provider detailing your dietary restrictions or medical needs. Our office will review your request and work with dining services to find appropriate solutions."
    },
    {
      question: "What housing accommodations are available?",
      answer: "We offer various housing accommodations including accessible rooms, single rooms for medical needs, and ESA-friendly housing. Contact our office to discuss your specific needs and available options."
    }
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
        <Accessibility className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Accessibility Resources</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We're here to help! Contact our office to discuss your specific needs and learn about available accommodations.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-4195" className="hover:text-blue-600">
                  740-753-4195
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
                <span>Monday – Friday: 8 a.m.-4 p.m.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Get Started</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <p className="text-neutral-dark">
                To begin the accommodation process:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-neutral-dark">
                <li>Contact our office to schedule an appointment</li>
                <li>Gather relevant documentation</li>
                <li>Complete the intake process</li>
                <li>Work with our team to implement accommodations</li>
              </ol>
              <Button className="w-full text-white">
                Schedule an Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {services.map((service) => (
          <Card key={service.title}>
            <CardHeader className="bg-primary-light/10">
              <div className="flex items-center gap-3">
                <service.icon className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-neutral-dark mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
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
          <CardTitle className="text-xl">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 text-blue-600 mb-4">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">Contact us for immediate assistance</span>
          </div>
          <Button variant="ghost" className="w-full">
            Request Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccessibilityResources; 

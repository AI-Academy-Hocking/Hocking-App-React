import { ArrowLeft, Brain, Phone, Clock, FileText, Music, Laptop, AlertCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";

function TestingCenter() {
  const faqItems = [
    {
      question: "What are the hours of the Testing Center?",
      answer: "Monday – Friday: 8 a.m.-4 p.m."
    },
    {
      question: "How do I register to take a test in the Testing Center?",
      answer: "Online tests are walk in. Be sure to allow enough time to complete the test by closing time. Make-up tests are arranged with your instructor and can be taken on a walk in basis. Standardized tests such as HESI, TEAS and ACE are scheduled through the testing firm or coordinating agency."
    },
    {
      question: "Can I listen to music?",
      answer: "Not during a test."
    },
    {
      question: "Can I use my laptop for testing?",
      answer: "Only with the approval of your instructor."
    }
  ];

  const testTypes = [
    {
      title: "Online Tests",
      description: "Walk-in basis",
      icon: FileText,
      note: "Allow enough time to complete by closing"
    },
    {
      title: "Make-up Tests",
      description: "Arranged with instructor",
      icon: FileText,
      note: "Walk-in basis available"
    },
    {
      title: "Standardized Tests",
      description: "HESI, TEAS, ACE",
      icon: FileText,
      note: "Scheduled through testing firm"
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
        <Brain className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-primary">Testing Center</h1>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please arrive at least 15 minutes before closing time to ensure you have enough time to complete your test.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Hours & Contact</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span>Monday – Friday: 8 a.m.-4 p.m.</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-4195" className="hover:text-blue-600">
                  740-753-4195
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Important Notes</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Music className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">No Music During Tests</p>
                  <p className="text-sm text-neutral-dark">Music is not permitted during testing</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Laptop className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Laptop Usage</p>
                  <p className="text-sm text-neutral-dark">Requires instructor approval</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Test Types & Registration</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testTypes.map((test) => (
              <div key={test.title} className="flex items-start gap-3">
                <test.icon className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{test.title}</h3>
                  <p className="text-neutral-dark">{test.description}</p>
                  <p className="text-sm text-blue-600 mt-1">{test.note}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
            <HelpCircle className="h-5 w-5" />
            <span className="font-medium">Contact us for more information</span>
          </div>
          <a href="tel:740-753-4195" className="w-full">
            <Button variant="ghost" className="w-full">
              Schedule a Test
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default TestingCenter; 

import { ArrowLeft, GraduationCap, Phone, Mail, FileText, Users, BookOpen, DollarSign, MapPin, Calendar, Download, Newspaper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function TrioServices() {
  const services = [
    {
      title: "Academic Advising",
      icon: BookOpen,
      description: "Personalized guidance for your academic journey"
    },
    {
      title: "Tutoring",
      icon: Users,
      description: "Peer and professional tutoring services"
    },
    {
      title: "Financial Literacy",
      icon: DollarSign,
      description: "Educational counseling for financial management"
    },
    {
      title: "FAFSA Assistance",
      icon: FileText,
      description: "Help with financial aid applications"
    },
    {
      title: "Transfer Support",
      icon: MapPin,
      description: "Guidance for transferring to other institutions"
    },
    {
      title: "Career Development",
      icon: GraduationCap,
      description: "Career exploration and preparation"
    },
    {
      title: "Workshops",
      icon: Calendar,
      description: "Student development workshops"
    }
  ];

  const faqItems = [
    {
      question: "What is the TRIO Student Support Services (SSS) program?",
      answer: "TRIO SSS is a federally funded program that provides supportive services to first-generation and income eligible college students with a goal of increasing student success and degree completion."
    },
    {
      question: "How can you qualify for the TRIO Student Support Services program?",
      answer: "If a student is Pell eligible and/or a first-generation college student (neither parent has a bachelor's degree), then he/she/they can apply for the program. Degree seeking students (those planning to complete a degree at Hocking College) who have some academic need and yet are capable of obtaining a degree with assistance are eligible to participate in the program. Students may be admitted upon completing an Intake process and being determined as eligible to participate in the program."
    },
    {
      question: "What services does TRIO SSS offer?",
      answer: "TRIO staff provide academic assistance, tutoring, advice and assistance in post-secondary course selection (degree planning/scheduling), advising and coaching, financial literacy information and assistance in completing financial aid applications. TRIO staff also engage students in cultural and educational field trips and assist students in the transfer process which includes taking students on campus visits."
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 dark:bg-popover min-h-screen">
      <div className="flex items-center mb-6">
        <Link href="/academic-success">
          <button className="flex items-center text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Academic Success Center</span>
          </button>
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="text-3xl font-bold text-primary dark:text-blue-300">TRIO Student Support Services</h1>
      </div>

      <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="bg-primary-light/10 dark:bg-gray-700">
          <CardTitle className="text-xl dark:text-blue-300">Our Mission</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 dark:text-gray-300">
          <p className="text-lg mb-4">
            The mission of the TRIO Student Support Services program at Hocking College is to provide student-centered support, 
            thus increasing persistence, retention, and graduation rates to individuals who are first-generation and/or income 
            eligible and who might not otherwise have the opportunity or personal support to complete post-secondary education.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <Users className="h-5 w-5" />
            <span className="font-medium">Supporting student success through comprehensive services</span>
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
                <Mail className="h-5 w-5 text-blue-600" />
                <a href="mailto:watsonm10970@hocking.edu" className="hover:text-blue-600">
                  watsonm10970@hocking.edu
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <a href="tel:740-753-7159" className="hover:text-blue-600">
                  740-753-7159
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-primary-light/10">
            <CardTitle className="text-xl">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              <Button variant="ghost" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Download TRIO Application
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Newspaper className="mr-2 h-4 w-4" />
                View Latest Newsletter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl">Our Services</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.title} className="flex items-start gap-3">
                <service.icon className="h-8 w-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-neutral-dark">{service.description}</p>
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
          <CardTitle className="text-xl">Program Funding</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-4">
            Funding for TRIO staff and services is provided by the U.S. Department of Education.
          </p>
          <div className="flex items-center gap-2 text-blue-600">
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">Federally funded program supporting student success</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TrioServices; 

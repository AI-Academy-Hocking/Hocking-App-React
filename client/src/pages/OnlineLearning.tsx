import { 
  Laptop, HelpCircle, BookOpen, Video, MessageSquare, ArrowLeft,
  Award, Building, Calendar, CheckCircle, AlertTriangle, BookOpen as BookOpenIcon, ExternalLink,
  UserCheck, Target, Globe, Star, Shield, RotateCcw, MonitorSmartphone, Phone, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

function OnlineLearningPage() {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <MonitorSmartphone className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Online Learning</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Access your online courses, digital resources, and virtual learning tools through Hocking College's comprehensive online learning platform.
        </p>
      </div>

      {/* Canvas Learning Management System */}
      <Card className="mb-8 border-2 border-blue-600">
        <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
          <CardTitle className="flex items-center text-xl text-blue-800 dark:text-blue-200">
            <Laptop className="mr-3 h-6 w-6" />
            Canvas Learning Management System
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Canvas is Hocking College's online learning platform. Access your course materials, submit assignments, and view grades.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Laptop className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Access Canvas</p>
                  <button
                    onClick={() => handleExternalLink('https://hocking.instructure.com')}
                    className="text-blue-600 hover:underline"
                  >
                    Log in to Canvas
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">Canvas Support</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Available 24/7</p>
                  <a href="tel:8554850526" className="text-blue-600 hover:underline">(855) 485-0526</a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Online Learning Resources */}
      <Card className="mb-8 border-2 border-green-600">
        <CardHeader className="bg-green-50 dark:bg-green-900/20">
          <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
            <BookOpen className="mr-3 h-6 w-6" />
            Online Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <BookOpen className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Digital Textbooks</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Access your course textbooks online</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <Video className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Recorded Lectures</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Review lectures and course content at your own pace</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <MessageSquare className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Virtual Office Hours</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Connect with instructors remotely during scheduled times</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Support */}
      <Card className="mb-8 border-2 border-purple-600">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="flex items-center text-xl text-purple-800 dark:text-purple-200">
            <HelpCircle className="mr-3 h-6 w-6" />
            Technical Support
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Canvas Support</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-purple-600" />
                  <a href="tel:8554850526" className="text-blue-600 hover:underline text-sm">(855) 485-0526</a>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Available 24/7</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Free technical assistance</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Common Issues</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Login problems</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Assignment submission</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                  <span className="text-sm text-purple-700 dark:text-purple-300">Video playback issues</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card className="mb-8 border-2 border-orange-600">
        <CardHeader className="bg-orange-50 dark:bg-orange-900/20">
          <CardTitle className="flex items-center text-xl text-orange-800 dark:text-orange-200">
            <Target className="mr-3 h-6 w-6" />
            Online Learning Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Stay Organized</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Keep track of assignments, due dates, and course materials</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Regular Check-ins</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Log into Canvas daily to check for updates and announcements</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
              <h5 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Communication</h5>
              <p className="text-sm text-orange-700 dark:text-orange-300">Reach out to instructors and classmates when you need help</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mb-8 border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <BookOpenIcon className="mr-3 h-6 w-6" />
            Frequently Asked Questions (FAQ)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="canvas-access">
              <AccordionTrigger className="text-left">
                How do I access Canvas?
              </AccordionTrigger>
              <AccordionContent>
                You can access Canvas by visiting hocking.instructure.com and logging in with your Hocking College credentials. The same username and password you use for other college systems.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="technical-support">
              <AccordionTrigger className="text-left">
                What if I have technical issues?
              </AccordionTrigger>
              <AccordionContent>
                Canvas provides 24/7 technical support at (855) 485-0526. They can help with login issues, assignment submission problems, and other technical difficulties.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mobile-access">
              <AccordionTrigger className="text-left">
                Can I access Canvas on my mobile device?
              </AccordionTrigger>
              <AccordionContent>
                Yes! Canvas has a mobile app available for both iOS and Android devices. You can download it from your device's app store and access your courses on the go.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="assignments">
              <AccordionTrigger className="text-left">
                How do I submit assignments online?
              </AccordionTrigger>
              <AccordionContent>
                Navigate to the assignment in your course, click "Submit Assignment," and follow the instructions to upload your file or enter your submission. Make sure to click "Submit" when finished.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="grades">
              <AccordionTrigger className="text-left">
                Where can I view my grades?
              </AccordionTrigger>
              <AccordionContent>
                Grades are typically available in the "Grades" section of each course in Canvas. Your instructor will post grades there as assignments are graded.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Quick Access Links */}
      <Card className="border-2 border-gray-600">
        <CardHeader className="bg-gray-50 dark:bg-gray-900/20">
          <CardTitle className="flex items-center text-xl text-gray-800 dark:text-gray-200">
            <ExternalLink className="mr-3 h-6 w-6" />
            Quick Access Links
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Resource</h4>
              <div className="space-y-1 text-sm">
                <p>Canvas Login</p>
                <p>Canvas Support</p>
                <p>Mobile App</p>
                <p>Digital Textbooks</p>
                <p>Virtual Office Hours</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Link</h4>
              <div className="space-y-1 text-sm">
                <button
                  onClick={() => handleExternalLink('https://hocking.instructure.com')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  hocking.instructure.com
                </button>
                <a href="tel:8554850526" className="text-blue-600 hover:underline block text-left">
                  (855) 485-0526
                </a>
                <button
                  onClick={() => handleExternalLink('https://canvas.instructure.com/courses/1/pages/canvas-mobile-apps')}
                  className="text-blue-600 hover:underline block text-left"
                >
                  Canvas Mobile Apps
                </button>
                <span className="text-gray-600 dark:text-gray-300 block text-left">
                  Available in Canvas
                </span>
                <span className="text-gray-600 dark:text-gray-300 block text-left">
                  Check course announcements
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnlineLearningPage;

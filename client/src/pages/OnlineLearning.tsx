import { Laptop, HelpCircle, BookOpen, Video, MessageSquare, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

function OnlineLearningPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-6">
        <Link href="/tools">
          <button className="flex items-center text-primary hover:text-primary-dark transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Student Tools</span>
          </button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-primary mb-6">Online Learning</h1>
      
      <Card className="mb-6">
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Canvas Learning Management System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <p>Canvas is Hocking College's online learning platform. Access your course materials, submit assignments, and view grades.</p>
          
          <div className="flex items-start gap-3 mt-4">
            <Laptop className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Access Canvas</p>
              <a href="#" className="text-primary hover:underline">Log in to Canvas</a>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-neutral-dark flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Canvas Support</p>
              <p className="text-neutral-dark">Available 24/7</p>
              <a href="tel:8554850526" className="text-primary hover:underline">(855) 485-0526</a>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-primary-light/10">
          <CardTitle className="text-xl text-primary">Online Learning Resources</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Digital Textbooks</p>
                <p className="text-neutral-dark">Access your course textbooks online</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Video className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Recorded Lectures</p>
                <p className="text-neutral-dark">Review lectures and course content at your own pace</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Virtual Office Hours</p>
                <p className="text-neutral-dark">Connect with instructors remotely during scheduled times</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnlineLearningPage;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface MaintenanceRequest {
  id: string;
  title: string;
  category: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high" | "emergency";
  description: string;
  location: string;
  submittedDate: string;
  estimatedCompletion?: string;
}

const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: "REQ-001",
    title: "Leaking Faucet",
    category: "Plumbing",
    status: "in-progress",
    priority: "medium",
    description: "Kitchen sink faucet is leaking water when turned on",
    location: "North Hall - Room 304",
    submittedDate: "2024-03-15",
    estimatedCompletion: "2024-03-18"
  },
  {
    id: "REQ-002",
    title: "Broken Window",
    category: "Structural",
    status: "pending",
    priority: "high",
    description: "Window latch is broken and window won't close properly",
    location: "Summit Hall - Room 205",
    submittedDate: "2024-03-16"
  },
  {
    id: "REQ-003",
    title: "HVAC Issue",
    category: "Heating/Cooling",
    status: "completed",
    priority: "high",
    description: "Air conditioning not working properly",
    location: "Sycamore Hall - Room 102",
    submittedDate: "2024-03-10",
    estimatedCompletion: "2024-03-12"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Maintenance() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Maintenance request submitted');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link 
          href="/housing"
          className="flex items-center text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back to Housing</span>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Wrench className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-primary">Maintenance Requests</h1>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Report and track maintenance issues. Our maintenance team is here to keep your living space comfortable and safe.
        </p>
      </div>

      {/* Collapsible Sections */}
      <Accordion type="single" collapsible className="mb-8">
        {/* Submit Request */}
        <AccordionItem value="submit-request" className="border-2 border-green-600 rounded-lg mb-4">
          <AccordionTrigger className="bg-green-50 dark:bg-green-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-green-800 dark:text-green-200">
              <Wrench className="mr-3 h-6 w-6" />
              Submit Maintenance Request
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Priority</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Location</label>
                  <Input placeholder="Building and Room Number" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-green-700 dark:text-green-300">Contact Phone</label>
                  <Input placeholder="Your phone number" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-green-700 dark:text-green-300">Description</label>
                <Textarea 
                  placeholder="Describe the issue in detail"
                  className="min-h-[100px]"
                />
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">Submit Request</Button>
            </form>
          </AccordionContent>
        </AccordionItem>

        {/* Request History */}
        <AccordionItem value="request-history" className="border-2 border-blue-600 rounded-lg">
          <AccordionTrigger className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 hover:no-underline">
            <div className="flex items-center text-xl text-blue-800 dark:text-blue-200">
              <Wrench className="mr-3 h-6 w-6" />
              Request History
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200">{request.title}</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {request.location} • Submitted: {request.submittedDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        className={request.priority === "emergency" ? "bg-red-600 text-white" : 
                               request.priority === "high" ? "bg-blue-600 text-white" : 
                               request.priority === "medium" ? "bg-yellow-600 text-white" : "bg-gray-600 text-white"}
                      >
                        {request.priority}
                      </Badge>
                      <Badge 
                        className={request.status === "completed" ? "bg-green-600 text-white" : 
                               request.status === "in-progress" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Description</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">{request.description}</p>
                    </div>
                    {request.estimatedCompletion && (
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">Estimated Completion</h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{request.estimatedCompletion}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 
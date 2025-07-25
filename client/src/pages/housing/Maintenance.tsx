import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, ArrowLeft } from 'lucide-react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

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
  const [, setLocation] = useLocation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Maintenance request submitted');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-popover p-4">
      <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <button
          onClick={() => setLocation('/housing')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Housing Services
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-3 bg-primary/10 rounded-full">
          <Wrench className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Maintenance Requests</h1>
          <p className="text-muted-foreground">Report and track maintenance issues</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <Card className="hover-card">
            <CardHeader>
              <CardTitle>Submit Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
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
                  <label className="text-sm font-medium">Priority</label>
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
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Building and Room Number" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    placeholder="Describe the issue in detail"
                    className="min-h-[100px]"
                  />
                </div>

                <Button className="w-full text-white">Submit Request</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 space-y-6"
        >
          {maintenanceRequests.map((request) => (
            <motion.div key={request.id} variants={item}>
              <Card className="hover-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{request.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {request.location} • Submitted: {request.submittedDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        variant={request.priority === "emergency" ? "destructive" : 
                               request.priority === "high" ? "default" : 
                               request.priority === "medium" ? "secondary" : "outline"}
                      >
                        {request.priority}
                      </Badge>
                      <Badge 
                        variant={request.status === "completed" ? "default" : 
                               request.status === "in-progress" ? "secondary" : "outline"}
                      >
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                    {request.estimatedCompletion && (
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Estimated Completion</h3>
                        <p className="text-sm text-muted-foreground">{request.estimatedCompletion}</p>
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">Update</Button>
                      <Button variant="default" size="sm">Cancel</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      </div>
    </div>
  );
} 
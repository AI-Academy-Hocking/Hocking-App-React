import React, { useState } from 'react';
import { Briefcase, FileText, Users, Target, TrendingUp, Calendar, MapPin, Building, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'remote';
  salary: string;
  description: string;
  requirements: string[];
  postedDate: Date;
  isSaved: boolean;
  isApplied: boolean;
}

interface Resume {
  id: string;
  name: string;
  lastUpdated: Date;
  sections: {
    personal: boolean;
    education: boolean;
    experience: boolean;
    skills: boolean;
    projects: boolean;
  };
  completion: number;
}

interface NetworkContact {
  id: string;
  name: string;
  title: string;
  company: string;
  connection: 'alumni' | 'professor' | 'industry' | 'peer';
  avatar?: string;
  isConnected: boolean;
  lastContact?: Date;
}

interface CareerHubProps {
  jobs: Job[];
  resumes: Resume[];
  contacts: NetworkContact[];
  onSaveJob: (jobId: string) => void;
  onApplyJob: (jobId: string) => void;
  onUpdateResume: (resumeId: string) => void;
  onConnectContact: (contactId: string) => void;
}

export function CareerHub({ 
  jobs, 
  resumes, 
  contacts, 
  onSaveJob, 
  onApplyJob, 
  onUpdateResume, 
  onConnectContact 
}: CareerHubProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobTypes = ['all', 'full-time', 'part-time', 'internship', 'remote'];
  const locations = ['all', 'Local', 'Remote', 'Hybrid'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(jobSearchTerm.toLowerCase());
    const matchesType = selectedJobType === 'all' || job.type === selectedJobType;
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation);
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const getJobTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'full-time':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'part-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'internship':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'remote':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const getConnectionColor = (connection: NetworkContact['connection']) => {
    switch (connection) {
      case 'alumni':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
      case 'professor':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
      case 'industry':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200';
      case 'peer':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Career Hub
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Build your career with job opportunities, resume tools, and networking
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Target className="mr-2 h-4 w-4" />
          Career Goals
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-blue-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-400">Jobs Applied</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {jobs.filter(j => j.isApplied).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-400">Saved Jobs</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {jobs.filter(j => j.isSaved).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-400">Resumes</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {resumes.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-600">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-400">Connections</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {contacts.filter(c => c.isConnected).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Search</TabsTrigger>
          <TabsTrigger value="resumes">Resumes</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Recent Job Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {jobs.slice(0, 3).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {job.company} • {job.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getJobTypeColor(job.type)}>
                        {job.type}
                      </Badge>
                      <Button
                        size="sm"
                        variant={job.isSaved ? "outline" : "default"}
                        onClick={() => onSaveJob(job.id)}
                      >
                        {job.isSaved ? 'Saved' : 'Save'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resume Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Resume Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div key={resume.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {resume.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Last updated: {formatDate(resume.lastUpdated)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {resume.completion}%
                        </p>
                      </div>
                    </div>
                    <Progress value={resume.completion} className="h-2" />
                    <Button
                      size="sm"
                      onClick={() => onUpdateResume(resume.id)}
                      className="w-full"
                    >
                      Update Resume
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Network Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Network Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contacts.filter(c => !c.isConnected).slice(0, 3).map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {contact.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {contact.title} at {contact.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getConnectionColor(contact.connection)}>
                        {contact.connection}
                      </Badge>
                      <Button
                        size="sm"
                        onClick={() => onConnectContact(contact.id)}
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          {/* Job Search Filters */}
          <Card className="border-2 border-blue-600">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
              <CardTitle className="text-blue-800 dark:text-blue-200">Job Search</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  placeholder="Search jobs..."
                  value={jobSearchTerm}
                  onChange={(e) => setJobSearchTerm(e.target.value)}
                />
                <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location === 'all' ? 'All Locations' : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Job Listings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Available Jobs ({filteredJobs.length})
            </h3>
            
            {filteredJobs.length === 0 ? (
              <Card className="text-center py-12">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search criteria
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {job.company} • {job.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getJobTypeColor(job.type)}>
                            {job.type}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {job.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <Calendar className="h-3 w-3" />
                        <span>Posted {formatDate(job.postedDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onApplyJob(job.id)}
                          disabled={job.isApplied}
                          className="flex-1"
                          variant={job.isApplied ? "outline" : "default"}
                        >
                          {job.isApplied ? 'Applied' : 'Apply Now'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => onSaveJob(job.id)}
                          className={job.isSaved ? 'text-blue-600 border-blue-600' : ''}
                        >
                          {job.isSaved ? 'Saved' : 'Save'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="resumes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumes.map((resume) => (
              <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{resume.name}</span>
                    <Badge className={
                      resume.completion === 100 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
                    }>
                      {resume.completion}% Complete
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Personal Info</span>
                        <span className={resume.sections.personal ? 'text-green-600' : 'text-red-600'}>
                          {resume.sections.personal ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Education</span>
                        <span className={resume.sections.education ? 'text-green-600' : 'text-red-600'}>
                          {resume.sections.education ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Experience</span>
                        <span className={resume.sections.experience ? 'text-green-600' : 'text-red-600'}>
                          {resume.sections.experience ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Skills</span>
                        <span className={resume.sections.skills ? 'text-green-600' : 'text-red-600'}>
                          {resume.sections.skills ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Projects</span>
                        <span className={resume.sections.projects ? 'text-green-600' : 'text-red-600'}>
                          {resume.sections.projects ? '✓' : '✗'}
                        </span>
                      </div>
                    </div>
                    
                    <Progress value={resume.completion} className="h-2" />
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onUpdateResume(resume.id)}
                        className="flex-1"
                      >
                        Edit Resume
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Download PDF
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Last updated: {formatDate(resume.lastUpdated)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Connected Contacts */}
            <Card>
              <CardHeader>
                <CardTitle>Your Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.filter(c => c.isConnected).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contact.title} at {contact.company}
                          </p>
                        </div>
                      </div>
                      <Badge className={getConnectionColor(contact.connection)}>
                        {contact.connection}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contacts.filter(c => !c.isConnected).map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {contact.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {contact.title} at {contact.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getConnectionColor(contact.connection)}>
                          {contact.connection}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => onConnectContact(contact.id)}
                        >
                          Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 
import React, { useState } from 'react';
import { CareerHub as CareerHubComponent } from '@/components/career/CareerHub';

// Mock data - in real app, this would come from API
const mockJobs = [
  {
    id: '1',
    title: 'Software Developer Intern',
    company: 'TechCorp Inc.',
    location: 'Remote',
    type: 'internship' as const,
    salary: '$25/hour',
    description: 'Join our development team and work on real projects using modern technologies.',
    requirements: ['JavaScript', 'React', 'Node.js', 'Git'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isSaved: false,
    isApplied: false
  },
  {
    id: '2',
    title: 'Marketing Assistant',
    company: 'Global Marketing Solutions',
    location: 'Local',
    type: 'part-time' as const,
    salary: '$18/hour',
    description: 'Support marketing campaigns and social media management.',
    requirements: ['Social Media', 'Content Creation', 'Analytics'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    isSaved: true,
    isApplied: false
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Data Insights Co.',
    location: 'Hybrid',
    type: 'full-time' as const,
    salary: '$60,000/year',
    description: 'Analyze data and create reports to drive business decisions.',
    requirements: ['Python', 'SQL', 'Excel', 'Statistics'],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isSaved: false,
    isApplied: true
  }
];

const mockResumes = [
  {
    id: '1',
    name: 'Software Developer Resume',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    sections: {
      personal: true,
      education: true,
      experience: true,
      skills: true,
      projects: false
    },
    completion: 80
  },
  {
    id: '2',
    name: 'Marketing Resume',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    sections: {
      personal: true,
      education: true,
      experience: true,
      skills: true,
      projects: true
    },
    completion: 100
  }
];

const mockContacts = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    connection: 'alumni' as const,
    isConnected: true,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Professor',
    company: 'Hocking College',
    connection: 'professor' as const,
    isConnected: true,
    lastContact: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    title: 'Marketing Manager',
    company: 'Global Marketing Solutions',
    connection: 'industry' as const,
    isConnected: false
  },
  {
    id: '4',
    name: 'Emily Davis',
    title: 'Data Scientist',
    company: 'Data Insights Co.',
    connection: 'peer' as const,
    isConnected: false
  }
];

export default function CareerHub() {
  const [jobs, setJobs] = useState(mockJobs);
  const [resumes, setResumes] = useState(mockResumes);
  const [contacts, setContacts] = useState(mockContacts);

  const handleSaveJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, isSaved: !job.isSaved }
        : job
    ));
    // In real app, this would make an API call
    console.log('Save job:', jobId);
  };

  const handleApplyJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, isApplied: !job.isApplied }
        : job
    ));
    // In real app, this would make an API call
    console.log('Apply job:', jobId);
  };

  const handleUpdateResume = (resumeId: string) => {
    // In real app, this would navigate to resume editor
    console.log('Update resume:', resumeId);
  };

  const handleConnectContact = (contactId: string) => {
    setContacts(prev => prev.map(contact => 
      contact.id === contactId 
        ? { ...contact, isConnected: !contact.isConnected }
        : contact
    ));
    // In real app, this would make an API call
    console.log('Connect contact:', contactId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CareerHubComponent
        jobs={jobs}
        resumes={resumes}
        contacts={contacts}
        onSaveJob={handleSaveJob}
        onApplyJob={handleApplyJob}
        onUpdateResume={handleUpdateResume}
        onConnectContact={handleConnectContact}
      />
    </div>
  );
} 
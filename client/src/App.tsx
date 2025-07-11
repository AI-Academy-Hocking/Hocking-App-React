import { Switch, Route, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Calendar from "@/pages/Calendar";
import StudentTools from "@/pages/StudentTools";
import Maps from "@/pages/Maps";
import DiningHall from "@/pages/DiningHall";
import CampusSafety from "./pages/CampusSafety";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider, useAuth } from "@/lib/auth";
import RecreationPage from "./pages/Recreation";
import LibraryResourcesPage from "./pages/LibraryResources";
import OnlineLearningPage from "./pages/OnlineLearning";
import StudentOrganizationsPage from "./pages/StudentOrganizations";
import AcademicSuccessCenter from "./pages/AcademicSuccessCenter";
import Athletics from "./pages/Athletics";
import Housing from "./pages/Housing";
import Dormitories from "./pages/housing/Dormitories";
import Amenities from "./pages/housing/Amenities";
import ApplicationProcess from "./pages/housing/ApplicationProcess";
import MealPlan from "./pages/housing/MealPlan";

import WhatToBring from "./pages/housing/WhatToBring";
import Maintenance from "./pages/housing/Maintenance";
import Contact from "./pages/housing/Contact";
import Handbook from "./pages/housing/Handbook";
import Pricing from "./pages/housing/Pricing";
import Activities from "./pages/housing/Activities";
import Social from "./pages/housing/Social";
import Contract from "./pages/housing/Contract";
import HowToApply from "./pages/housing/HowToApply";
import FloorPlans from "./pages/housing/FloorPlans";
import Tutoring from "./pages/Tutoring";
import TestingCenter from "./pages/TestingCenter";
import TrioServices from "./pages/TrioServices";
import LearningLabs from "./pages/LearningLabs";
import AccessibilityResources from "./pages/AccessibilityResources";
import InternationalStudents from "./pages/InternationalStudents";
import CanineFacility from "./pages/CanineFacility";
import Graduation from "./pages/Graduation";
import FinancialAid from "./pages/FinancialAid";
import Billing from "./pages/Billing";
import Scholarships from "./pages/Scholarships";
import CampusHealth from "./pages/CampusHealth";
import CareerUniversityCenter from "./pages/CareerUniversityCenter";
import VerifyUser from "./pages/VerifyUser";
import VerifyPost from "./pages/VerifyPost";
import './index.css';
import './styles/globals.css';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function Router() {
  const [location, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [checkingHomeRedirect, setCheckingHomeRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated && location === "/home") {
      setCheckingHomeRedirect(true);
      const hasClickedGetStarted = localStorage.getItem('hasClickedGetStarted') === 'true';
      if (!hasClickedGetStarted) {
        setLocation("/");
      }
      setCheckingHomeRedirect(false);
    }
  }, [isAuthenticated, location, setLocation]);

  // If user is authenticated and on login page, redirect to home
  if (isAuthenticated && location === "/login") {
    return <Redirect to="/home" />;
  }

  // If user is not authenticated and not on login page, redirect to login
  if (!isAuthenticated && location !== "/login" && location !== "/") {
    return <Redirect to="/login" />;
  }

  // Show loading state while checking redirect
  if (checkingHomeRedirect) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If we're on the login page, don't wrap with MainLayout
  if (location === "/login" || location === "/") {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // For all other pages, wrap with MainLayout
  return (
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/tools" component={StudentTools} />
        <Route path="/maps" component={Maps} />
        <Route path="/dining" component={DiningHall} />
        <Route path="/safety" component={CampusSafety} />
        <Route path="/recreation" component={RecreationPage} />
        <Route path="/library" component={LibraryResourcesPage} />
        <Route path="/online-learning" component={OnlineLearningPage} />
        <Route path="/student-organizations" component={StudentOrganizationsPage} />
        <Route path="/academic-success-center" component={AcademicSuccessCenter} />
        <Route path="/athletics" component={Athletics} />
        <Route path="/housing" component={Housing} />
        <Route path="/housing/dormitories" component={Dormitories} />
        <Route path="/housing/amenities" component={Amenities} />
        <Route path="/housing/application" component={ApplicationProcess} />
        <Route path="/housing/meal-plan" component={MealPlan} />

        <Route path="/housing/what-to-bring" component={WhatToBring} />
        <Route path="/housing/maintenance" component={Maintenance} />
        <Route path="/housing/contact" component={Contact} />
        <Route path="/housing/handbook" component={Handbook} />
        <Route path="/housing/pricing" component={Pricing} />
        <Route path="/housing/activities" component={Activities} />
        <Route path="/housing/social" component={Social} />
        <Route path="/housing/contract" component={Contract} />
        <Route path="/housing/how-to-apply" component={HowToApply} />
        <Route path="/housing/floor-plans" component={FloorPlans} />
        <Route path="/tutoring" component={Tutoring} />
        <Route path="/testing-center" component={TestingCenter} />
        <Route path="/trio-services" component={TrioServices} />
        <Route path="/learning-labs" component={LearningLabs} />
        <Route path="/accessibility-resources" component={AccessibilityResources} />
        <Route path="/international-students" component={InternationalStudents} />
        <Route path="/canine-facility" component={CanineFacility} />
        <Route path="/graduation" component={Graduation} />
        <Route path="/financial-aid" component={FinancialAid} />
        <Route path="/billing" component={Billing} />
        <Route path="/scholarships" component={Scholarships} />
        <Route path="/campus-health" component={CampusHealth} />
        <Route path="/career-university-center" component={CareerUniversityCenter} />
        <Route path="/verify-user/:id" component={VerifyUser} />
        <Route path="/verify-post/:id" component={VerifyPost} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

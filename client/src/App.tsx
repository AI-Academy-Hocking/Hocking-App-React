import { Switch, Route, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Calendar from "./pages/Calendar";
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
import ProgramDetails from "./pages/ProgramDetails";
import Housing from "./pages/Housing";
import Dormitories from "./pages/housing/Dormitories";
import Amenities from "./pages/housing/Amenities";
import ApplicationProcess from "./pages/housing/ApplicationProcess";
import MealPlan from "./pages/housing/MealPlan";
import Roomies from "./pages/housing/Roomies";
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
import CourseCatalog from "./pages/tools/academic/course-catalog";
import Graduation from "./pages/tools/academic/graduation";
import Advising from "./pages/tools/academic/advising";
import OfficeAdministration from "./pages/tools/academic/office-administration";
import CareerUniversityCenter from "./pages/tools/academic/CareerUniversityCenter";
import Transportation from "./pages/Transportation";
import AcademicToolDetail from "./pages/tools/academic/[id]";
import Resources from "./pages/Resources";
import './index.css';
import './styles/globals.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  const hasClickedGetStarted = localStorage.getItem('hasClickedGetStarted') === 'true';
  const isLoginPage = location === '/' || location === '/login';

  // If the user hasn't "gotten started" and they are not on the login page,
  // force them to the landing page. This is the only redirect we need for this logic.
  if (!hasClickedGetStarted && !isLoginPage) {
    return <Redirect to="/" />;
  }

  // If we're on the login page, render it without the main layout.
  if (isLoginPage) {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // For all other pages that have been "unlocked", wrap them with MainLayout.
  return (
    <MainLayout>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/tools" component={StudentTools} />
        <Route path="/maps" component={Maps} />
        <Route path="/resources" component={Resources} />
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
        <Route path="/housing/roomies" component={Roomies} />
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
        <Route path="/tools/academic/course-catalog" component={CourseCatalog} />
        <Route path="/tools/academic/graduation" component={Graduation} />
        <Route path="/tools/academic/advising" component={Advising} />
        <Route path="/tools/academic/office-administration" component={OfficeAdministration} />
        <Route path="/tools/academic/career-university-center" component={CareerUniversityCenter} />
        <Route path="/tools/academic/:id" component={AcademicToolDetail} />
        <Route path="/transportation" component={Transportation} />
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

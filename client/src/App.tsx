import { Switch, Route, useLocation, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/ErrorBoundary";
import RouteWrapper from "./components/RouteWrapper";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Calendar from "./pages/Calendar";
import StudentTools from "@/pages/StudentTools";
import Maps from "@/pages/Maps";
import DiningHall from "@/pages/DiningHall";
import CampusSafety from "./pages/CampusSafety";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/lib/auth";
import { NotificationProvider } from "@/lib/notifications";
import { DarkModeProvider } from "@/lib/darkMode";
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
import WhatToBring from "./pages/housing/WhatToBring";
import Maintenance from "./pages/housing/Maintenance";
import Contact from "./pages/housing/Contact";
import Handbook from "./pages/housing/Handbook";
import Pricing from "./pages/housing/Pricing";
import Activities from "./pages/housing/Activities";
// DISABLED - Social media feature not approved
// import Social from "./pages/housing/Social";
import Contract from "./pages/housing/Contract";
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
import CareerUniversityCenter from "./pages/CareerUniversityCenter";
import Transportation from "./pages/Transportation";
import AcademicToolDetail from "./pages/tools/academic/[id]";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";

// Student Services (from Jodian-Branch)
import InternationalStudents from "./pages/InternationalStudents";
import CanineFacility from "./pages/CanineFacility";
import FinancialAid from "./pages/FinancialAid";
import Billing from "./pages/Billing";
import Scholarships from "./pages/Scholarships";
import CampusHealth from "./pages/CampusHealth";
import VerifyUser from "./pages/VerifyUser";
import VerifyPost from "./pages/VerifyPost";

// New feature pages
import Events from "./pages/Events";

// Wellness Features
import WellnessTracker from "./components/wellness/WellnessTracker";
import LearnMore from "./pages/LearnMore";
import StudyPlanner from "./pages/StudyPlanner";
import RoommateFinder from "./pages/RoommateFinder";
import Wellness from "./pages/Wellness";

import './index.css';
import './styles/globals.css';
import { useNavigationDebug } from './hooks/use-navigation-debug';



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests up to 2 times
      retry: 2,
      // Consider data stale after 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 10 minutes
      gcTime: 10 * 60 * 1000,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Error handling moved to individual queries
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Error handling moved to individual mutations
    },
  },
});

function Router() {
  const [location] = useLocation();
  useNavigationDebug(); // Add navigation debugging

  const hasClickedGetStarted = localStorage.getItem('hasClickedGetStarted') === 'true';
  const isLoginPage = location === '/' || location === '/login' || location === '/learn-more';

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
        <Route path="/learn-more" component={LearnMore} />
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
        <Route path="/tools" component={() => <RouteWrapper routeName="Student Tools"><StudentTools /></RouteWrapper>} />
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
        <Route path="/housing/what-to-bring" component={WhatToBring} />
        <Route path="/housing/maintenance" component={Maintenance} />
        <Route path="/housing/contact" component={Contact} />
        <Route path="/housing/handbook" component={Handbook} />
        <Route path="/housing/pricing" component={Pricing} />
        <Route path="/housing/activities" component={Activities} />
        {/* DISABLED - Social media feature not approved */}
        {/* <Route path="/housing/social" component={Social} /> */}
        <Route path="/housing/contract" component={Contract} />
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
        <Route path="/tools/academic/:id" component={AcademicToolDetail} />
        <Route path="/transportation" component={Transportation} />
        <Route path="/settings" component={Settings} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/international-students" component={() => <RouteWrapper routeName="International Students"><InternationalStudents /></RouteWrapper>} />
        <Route path="/canine-facility" component={() => <RouteWrapper routeName="Canine Facility"><CanineFacility /></RouteWrapper>} />
        <Route path="/graduation" component={Graduation} />
        <Route path="/financial-aid" component={() => <RouteWrapper routeName="Financial Aid"><FinancialAid /></RouteWrapper>} />
        <Route path="/billing" component={() => <RouteWrapper routeName="Billing"><Billing /></RouteWrapper>} />
        <Route path="/scholarships" component={() => <RouteWrapper routeName="Scholarships"><Scholarships /></RouteWrapper>} />
        <Route path="/campus-health" component={() => <RouteWrapper routeName="Campus Health"><CampusHealth /></RouteWrapper>} />
        <Route path="/career-university-center" component={CareerUniversityCenter} />
        <Route path="/verify-user/:id" component={VerifyUser} />
        <Route path="/verify-post/:id" component={VerifyPost} />
        
        {/* New feature routes - Phase 1 */}
        <Route path="/events" component={Events} />
        
        {/* Wellness Features */}
        <Route path="/wellness" component={WellnessTracker} />
        <Route path="/study-planner" component={StudyPlanner} />
        <Route path="/roommate-finder" component={RoommateFinder} />
        <Route path="/wellness-page" component={Wellness} />
        
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <Router />
              <Toaster />
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </DarkModeProvider>
    </ErrorBoundary>
  );
}

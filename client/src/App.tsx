import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
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
import { AuthProvider } from "@/lib/auth";
import RecreationPage from "./pages/Recreation";
import AcademicSuccessCenter from "./pages/AcademicSuccessCenter";
import OnlineLearningPage from "./pages/OnlineLearning";
import StudentOrganizationsPage from "./pages/StudentOrganizations";
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
import './index.css';
import './styles/globals.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Button } from "@/components/ui/button";
import Tutoring from './pages/Tutoring';
import LibraryResources from './pages/LibraryResources';
import LearningLabs from './pages/LearningLabs';
import AccessibilityResources from './pages/AccessibilityResources';
import TrioServices from './pages/TrioServices';
import TestingCenter from './pages/TestingCenter';

function Router() {
  const [location] = useLocation();
  
  // Check if we're on the login page
  const isLoginPage = location === "/login" || location === "/";

  // If we're on the login page, don't wrap with MainLayout
  if (isLoginPage) {
    return (
      <TransitionGroup>
        <CSSTransition
          key={location}
          timeout={300}
          classNames="page-transition"
          in={true}
        >
          <Switch>
            <Route path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  }

  // For all other pages, wrap with MainLayout
  return (
    <MainLayout>
      <TransitionGroup>
        <CSSTransition
          key={location}
          timeout={300}
          classNames="page-transition"
          in={true}
        >
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/calendar" component={Calendar} />
            <Route path="/tools" component={StudentTools} />
            <Route path="/maps" component={Maps} />
            <Route path="/dining" component={DiningHall} />
            <Route path="/safety" component={CampusSafety} />
            <Route path="/recreation" component={RecreationPage} />
            <Route path="/academic-success" component={AcademicSuccessCenter} />
            <Route path="/tutoring" component={Tutoring} />
            <Route path="/library-resources" component={LibraryResources} />
            <Route path="/learning-labs" component={LearningLabs} />
            <Route path="/testing-center" component={TestingCenter} />
            <Route path="/accessibility-resources" component={AccessibilityResources} />
            <Route path="/trio-services" component={TrioServices} />
            <Route path="/online-learning" component={OnlineLearningPage} />
            <Route path="/student-organizations" component={StudentOrganizationsPage} />
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
            <Route component={NotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </MainLayout>
  );
}

export default App;
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

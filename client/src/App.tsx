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
import Discussions from "./pages/Discussions";
import DiscussionDetail from "./pages/DiscussionDetail";
import CampusSafety from "./pages/CampusSafety";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/lib/auth";
import RecreationPage from "./pages/Recreation";


function Router() {
  const [location] = useLocation();
  
  // Check if we're on the login page
  const isLoginPage = location === "/login" || location === "/";

  // If we're on the login page, don't wrap with MainLayout
  if (isLoginPage) {
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
        <Route path="/discussions" component={Discussions} />
        <Route path="/discussions/:id">
          {(params) => <DiscussionDetail params={params} />}
        </Route>
        <Route path="/safety" component={CampusSafety} />
        <Route path="/recreation" component={RecreationPage} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

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

export default App;

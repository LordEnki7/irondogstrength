import React, { Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
// Admin component lazy loaded to reduce bundle size
const Admin = React.lazy(() => import("@/pages/admin"));
// Core pages loaded immediately
import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";

// Secondary pages lazy loaded to reduce bundle size
const Schedule = React.lazy(() => import("@/pages/schedule"));
const Contact = React.lazy(() => import("@/pages/contact"));
const ClientPortal = React.lazy(() => import("@/pages/client-portal"));
const WorkoutMotivation = React.lazy(() => import("@/pages/workout-motivation"));
const TheGrind = React.lazy(() => import("@/pages/the-grind"));
const Signup = React.lazy(() => import("@/pages/signup"));
const Checkout = React.lazy(() => import("@/pages/checkout"));
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs" component={Programs} />
          <Route path="/schedule">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Schedule />
            </Suspense>
          </Route>
          <Route path="/contact">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Contact />
            </Suspense>
          </Route>
          <Route path="/portal">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <ClientPortal />
            </Suspense>
          </Route>
          <Route path="/client-portal">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <ClientPortal />
            </Suspense>
          </Route>
          <Route path="/motivation">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <WorkoutMotivation />
            </Suspense>
          </Route>
          <Route path="/the-grind">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <TheGrind />
            </Suspense>
          </Route>
          <Route path="/signup">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Signup />
            </Suspense>
          </Route>
          <Route path="/checkout">
            <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
              <Checkout />
            </Suspense>
          </Route>
          <Route path="/admin">
            <Suspense fallback={<div className="p-8 text-center">Loading Admin...</div>}>
              <Admin />
            </Suspense>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        <Router />
    </QueryClientProvider>
  );
}

export default App;

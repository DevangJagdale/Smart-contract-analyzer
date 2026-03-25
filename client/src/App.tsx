import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ContractAnalyzerPage from "@/pages/contract-analyzer";
import Navigation from "@/components/navigation";

function Router() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/") {
      setLocation("/contract-analyzer", { replace: true });
    }
  }, [setLocation]);

  return (
    <Switch>
      <Route path="/" component={ContractAnalyzerPage} />
      <Route path="/home" component={Home} />
      <Route path="/contract-analyzer" component={ContractAnalyzerPage} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Router />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Hub from "./pages/Hub";
import Dashboard from "./pages/Dashboard";
import SnowballCalculator from "./pages/SnowballCalculator";
import StrategyDetail from "./pages/StrategyDetail";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hub"} component={Hub} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/snowball"} component={SnowballCalculator} />
      <Route path={"/strategy/:id"} component={StrategyDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

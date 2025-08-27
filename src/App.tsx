import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Messages from "./pages/Messages";
import Jobs from "./pages/Jobs";
import Calendar from "./pages/Calendar";
import DiscussionPods from "./pages/DiscussionPods";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/pods" element={<DiscussionPods />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

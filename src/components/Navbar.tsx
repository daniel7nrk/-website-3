import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Home, Users, MessageSquare, Bell, Briefcase, Calendar, MapPin } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card border-b shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-professional rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">PN</span>
              </div>
              <span className="font-semibold text-lg text-foreground hidden sm:block">ProNetwork</span>
            </NavLink>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search professionals, companies..." 
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Home className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Home</span>
            </NavLink>

            <NavLink
              to="/connections"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Users className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Network</span>
            </NavLink>

            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Briefcase className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Jobs</span>
            </NavLink>

            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <MessageSquare className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Messages</span>
            </NavLink>

            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Calendar</span>
            </NavLink>

            <NavLink
              to="/pods"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <MapPin className="h-5 w-5 mb-1" />
              <span className="hidden sm:block">Pods</span>
            </NavLink>

            <Button variant="ghost" size="sm" className="flex flex-col items-center px-3 py-2">
              <Bell className="h-5 w-5 mb-1" />
              <span className="hidden sm:block text-xs">Notifications</span>
            </Button>

            {/* Profile */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center px-3 py-2 text-xs transition-colors ${
                  isActive 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <Avatar className="h-6 w-6 mb-1">
                <AvatarImage src={defaultAvatar} alt="Profile" />
                <AvatarFallback>Me</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block">Me</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
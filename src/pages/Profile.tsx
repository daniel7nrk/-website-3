import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Building, Calendar, Edit, Plus, ExternalLink } from "lucide-react";
import { currentUser } from "@/data/mockData";
import defaultAvatar from "@/assets/default-avatar.jpg";

const Profile = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Profile Header */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="h-48 bg-gradient-professional rounded-t-lg relative">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit cover
            </Button>
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              <Avatar className="h-32 w-32 border-4 border-card">
                <AvatarImage src={defaultAvatar} alt={currentUser.name} />
                <AvatarFallback className="text-2xl">{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0 pt-16 sm:pt-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-foreground">{currentUser.name}</h1>
                    <p className="text-lg text-muted-foreground mt-1">{currentUser.headline}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{currentUser.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{currentUser.company}</span>
                      </div>
                      <button className="text-primary hover:underline">
                        {currentUser.connections} connections
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add section
                    </Button>
                    <Button>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>About</CardTitle>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{currentUser.bio}</p>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Experience</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentUser.experience.map((exp) => (
                <div key={exp.id} className="flex space-x-4">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : (exp.endDate ? formatDate(exp.endDate) : 'Present')}
                          </span>
                          {exp.current && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentUser.education.map((edu) => (
                <div key={edu.id} className="flex space-x-4">
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground">{edu.school}</h3>
                        <p className="text-muted-foreground">{edu.degree} in {edu.field}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </span>
                        </div>
                        {edu.description && (
                          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="hover:bg-primary hover:text-primary-foreground cursor-pointer">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profile Strength */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Profile Strength</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Intermediate</span>
                  <span className="text-sm text-muted-foreground">7/10</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-success">
                    <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <span>Add 3 more skills</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-muted rounded-full mr-2"></div>
                    <span>Get recommendations</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-base">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <button className="text-primary hover:underline block">
                  Creator mode
                </button>
                <p className="text-muted-foreground text-xs mt-1">
                  Get discovered and showcase your expertise
                </p>
              </div>
              <div className="text-sm">
                <button className="text-primary hover:underline block">
                  My network
                </button>
                <p className="text-muted-foreground text-xs mt-1">
                  Manage your connections and network
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
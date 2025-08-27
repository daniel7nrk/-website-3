import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/ProfileCard";
import { Search, Filter, UserPlus, Users } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { useState } from "react";

const Connections = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const connections = mockUsers.filter(user => user.isConnected);
  const suggestions = mockUsers.filter(user => !user.isConnected);

  const filteredConnections = connections.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggestions.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">My Network</h1>
        <p className="text-muted-foreground">Manage your professional connections and discover new opportunities</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search connections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-primary mb-2">{connections.length}</div>
            <div className="text-sm text-muted-foreground">Connections</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-success mb-2">{suggestions.length}</div>
            <div className="text-sm text-muted-foreground">People you may know</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-warning mb-2">15</div>
            <div className="text-sm text-muted-foreground">Invitations sent</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="connections" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="connections" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Connections ({connections.length})</span>
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center space-x-2">
            <UserPlus className="h-4 w-4" />
            <span>Suggestions ({suggestions.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connections" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Your Connections</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredConnections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredConnections.map((user) => (
                    <ProfileCard 
                      key={user.id} 
                      user={user} 
                      variant="compact" 
                      showActions={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No connections match your search" : "You don't have any connections yet"}
                  </p>
                  {!searchQuery && (
                    <Button className="mt-4">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Find people to connect with
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>People You May Know</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSuggestions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuggestions.map((user) => (
                    <ProfileCard 
                      key={user.id} 
                      user={user} 
                      variant="compact" 
                      showActions={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? "No suggestions match your search" : "No new suggestions at the moment"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Check back later for more people you might know
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Connections;
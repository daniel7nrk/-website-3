import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Users, UserPlus, MessageSquare } from "lucide-react";
import { User } from "@/data/mockData";
import defaultAvatar from "@/assets/default-avatar.jpg";

interface ProfileCardProps {
  user: User;
  variant?: 'full' | 'compact';
  showActions?: boolean;
}

export const ProfileCard = ({ user, variant = 'full', showActions = true }: ProfileCardProps) => {
  const handleConnect = () => {
    console.log(`Connecting to ${user.name}`);
  };

  const handleMessage = () => {
    console.log(`Messaging ${user.name}`);
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-card transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={defaultAvatar} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{user.headline}</p>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{user.location}</span>
              </div>
            </div>
            {showActions && (
              <div className="flex flex-col space-y-2">
                {!user.isConnected ? (
                  <Button size="sm" onClick={handleConnect} className="bg-primary text-primary-foreground">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={handleMessage}>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-card transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={defaultAvatar} alt={user.name} />
            <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
            <p className="text-muted-foreground">{user.headline}</p>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{user.connections} connections</span>
            </div>
            {user.mutualConnections > 0 && (
              <div className="text-muted-foreground">
                {user.mutualConnections} mutual connections
              </div>
            )}
          </div>

          {user.bio && (
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {user.bio}
            </p>
          )}

          {user.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {user.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {user.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{user.skills.length - 5} more
                </Badge>
              )}
            </div>
          )}

          {showActions && (
            <div className="flex space-x-3 w-full">
              {!user.isConnected ? (
                <Button onClick={handleConnect} className="flex-1 bg-primary text-primary-foreground">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Connect
                </Button>
              ) : (
                <Button variant="outline" onClick={handleMessage} className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PostCard } from "@/components/PostCard";
import { ProfileCard } from "@/components/ProfileCard";
import { Image, Video, Calendar, FileText, TrendingUp } from "lucide-react";
import { mockPosts, mockUsers, currentUser } from "@/data/mockData";
import { useState } from "react";
import defaultAvatar from "@/assets/default-avatar.jpg";

const Home = () => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (postContent.trim()) {
      console.log("Creating post:", postContent);
      setPostContent("");
    }
  };

  const suggestedConnections = mockUsers.filter(user => !user.isConnected).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current User Profile Summary */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={defaultAvatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{currentUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentUser.headline}</p>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Profile views</span>
                    <span className="text-primary font-medium">127</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Post impressions</span>
                    <span className="text-primary font-medium">1,423</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Your Network</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-foreground">5 profile views this week</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Your network grew by 12 connections this month
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={defaultAvatar} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Share your thoughts with your network..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0 bg-background"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm">
                        <Image className="h-4 w-4 mr-2" />
                        Media
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Event
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Article
                      </Button>
                    </div>
                    <Button 
                      onClick={handlePost}
                      disabled={!postContent.trim()}
                      className="bg-primary text-primary-foreground"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {mockPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Suggested Connections */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">People you may know</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              {suggestedConnections.map((user) => (
                <ProfileCard 
                  key={user.id} 
                  user={user} 
                  variant="compact" 
                  showActions={true}
                />
              ))}
              <Button variant="outline" size="sm" className="w-full">
                See all recommendations
              </Button>
            </CardContent>
          </Card>

          {/* Recent News */}
          <Card className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Industry News</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <h4 className="text-sm font-medium text-foreground">Tech hiring surge continues</h4>
                  <p className="text-xs text-muted-foreground mt-1">2h • 1,240 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <h4 className="text-sm font-medium text-foreground">AI adoption in enterprise</h4>
                  <p className="text-xs text-muted-foreground mt-1">4h • 892 readers</p>
                </div>
                <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <h4 className="text-sm font-medium text-foreground">Remote work policies evolving</h4>
                  <p className="text-xs text-muted-foreground mt-1">6h • 1,567 readers</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                See more news
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
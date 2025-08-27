import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share, MoreHorizontal } from "lucide-react";
import { Post } from "@/data/mockData";
import defaultAvatar from "@/assets/default-avatar.jpg";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const handleLike = () => {
    console.log(`Liked post ${post.id}`);
  };

  const handleComment = () => {
    console.log(`Commenting on post ${post.id}`);
  };

  const handleShare = () => {
    console.log(`Sharing post ${post.id}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    return `${Math.floor(diffInHours / 168)}w`;
  };

  const getPostTypeIndicator = () => {
    switch (post.type) {
      case 'job_change':
        return <div className="text-xs text-success font-medium mb-2">• Job Update</div>;
      case 'achievement':
        return <div className="text-xs text-warning font-medium mb-2">• Achievement</div>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-card">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={defaultAvatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer truncate">
                {post.author.name}
              </h3>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">1st</span>
            </div>
            <p className="text-sm text-muted-foreground truncate">{post.author.headline}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">🌐</span>
            </div>
          </div>
          
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Post Type Indicator */}
        {getPostTypeIndicator()}

        {/* Content */}
        <div className="mb-4">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between py-3 border-t border-b border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className="flex-1 hover:bg-muted"
          >
            <Heart className="h-4 w-4 mr-2" />
            Like
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleComment}
            className="flex-1 hover:bg-muted"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            className="flex-1 hover:bg-muted"
          >
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
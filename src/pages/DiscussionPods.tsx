import { useState, useEffect, useRef } from "react";
import { MessageCircle, MapPin, Users, Plus, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock discussion pods data
const mockPods = [
  {
    id: 1,
    title: "Tech Startups SF",
    description: "Discussing the latest in SF tech scene",
    members: 234,
    location: { lat: 37.7749, lng: -122.4194, name: "San Francisco, CA" },
    category: "Technology",
    isActive: true,
    lastActivity: "2 min ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Remote Work Tips",
    description: "Best practices for distributed teams",
    members: 156,
    location: { lat: 40.7128, lng: -74.0060, name: "New York, NY" },
    category: "Career",
    isActive: true,
    lastActivity: "5 min ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Product Management",
    description: "PM strategies and methodologies",
    members: 89,
    location: { lat: 34.0522, lng: -118.2437, name: "Los Angeles, CA" },
    category: "Product",
    isActive: false,
    lastActivity: "1 hour ago",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Design Systems",
    description: "UI/UX design patterns and systems",
    members: 67,
    location: { lat: 47.6062, lng: -122.3321, name: "Seattle, WA" },
    category: "Design",
    isActive: true,
    lastActivity: "15 min ago",
    avatar: "/placeholder.svg"
  }
];

const DiscussionPods = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedPod, setSelectedPod] = useState<typeof mockPods[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Technology", "Career", "Product", "Design"];

  const filteredPods = mockPods.filter(pod => {
    const matchesSearch = pod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pod.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || pod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Mock map implementation
  useEffect(() => {
    if (!mapContainer.current) return;

    // This would be where you'd initialize Mapbox
    // For now, we'll create a simple mock map
    const mapElement = mapContainer.current;
    mapElement.innerHTML = `
      <div class="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center space-y-2">
            <div class="text-6xl">🗺️</div>
            <p class="text-sm text-muted-foreground">Interactive Discussion Map</p>
            <p class="text-xs text-muted-foreground">Pods appear based on location</p>
          </div>
        </div>
        ${filteredPods.map(pod => `
          <div 
            class="absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform shadow-lg"
            style="
              left: ${Math.random() * 80 + 10}%; 
              top: ${Math.random() * 70 + 15}%;
            "
            data-pod-id="${pod.id}"
          >
            <div class="text-white text-xs font-bold">${pod.members}</div>
            ${pod.isActive ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>' : ''}
          </div>
        `).join('')}
      </div>
    `;

    // Add click listeners to pod markers
    const markers = mapElement.querySelectorAll('[data-pod-id]');
    markers.forEach(marker => {
      marker.addEventListener('click', (e) => {
        const podId = parseInt((e.currentTarget as HTMLElement).dataset.podId || '0');
        const pod = mockPods.find(p => p.id === podId);
        if (pod) setSelectedPod(pod);
      });
    });

  }, [filteredPods]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Discussion Pods</h1>
          <p className="text-muted-foreground">Join location-based professional discussions</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Pod
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Discussion Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div ref={mapContainer} className="h-96 w-full" />
            </CardContent>
          </Card>

          {/* Selected Pod Details */}
          {selectedPod && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedPod.avatar} />
                      <AvatarFallback>{selectedPod.title.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedPod.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPod.location.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedPod.isActive && (
                      <Badge variant="secondary" className="gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        Live
                      </Badge>
                    )}
                    <Badge variant="outline">{selectedPod.category}</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{selectedPod.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedPod.members} members
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      Last activity: {selectedPod.lastActivity}
                    </div>
                  </div>
                  <Button>Join Discussion</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Pods List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Pods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Pods ({filteredPods.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredPods.map(pod => (
                <div
                  key={pod.id}
                  className={`
                    p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent
                    ${selectedPod?.id === pod.id ? 'bg-accent border-accent-foreground' : ''}
                  `}
                  onClick={() => setSelectedPod(pod)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={pod.avatar} />
                        <AvatarFallback className="text-xs">{pod.title.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-sm">{pod.title}</h4>
                        <p className="text-xs text-muted-foreground">{pod.location.name}</p>
                      </div>
                    </div>
                    {pod.isActive && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{pod.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{pod.members} members</span>
                    <Badge variant="outline" className="text-xs">{pod.category}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPods;
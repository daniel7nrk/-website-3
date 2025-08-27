import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Building, Clock, Bookmark, ExternalLink, Filter } from "lucide-react";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedTime: string;
  description: string;
  requirements: string[];
  isBookmarked: boolean;
  applicants: number;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Product Designer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedTime: "2 days ago",
    description: "We're looking for a Senior Product Designer to join our growing design team and help shape the future of our products.",
    requirements: ["5+ years experience", "Figma expertise", "Design systems knowledge"],
    isBookmarked: false,
    applicants: 47
  },
  {
    id: "2",
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "$90k - $130k",
    postedTime: "1 day ago",
    description: "Join our remote-first team to build beautiful and performant web applications using React and TypeScript.",
    requirements: ["React expertise", "TypeScript", "3+ years experience"],
    isBookmarked: true,
    applicants: 23
  },
  {
    id: "3",
    title: "Product Manager",
    company: "InnovateLab",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$130k - $170k",
    postedTime: "3 days ago",
    description: "Lead product strategy and roadmap for our B2B SaaS platform serving thousands of customers worldwide.",
    requirements: ["Product management experience", "B2B SaaS background", "Analytics skills"],
    isBookmarked: false,
    applicants: 31
  },
  {
    id: "4",
    title: "UX Researcher",
    company: "Adobe",
    location: "San Jose, CA",
    type: "Contract",
    salary: "$80 - $120/hr",
    postedTime: "1 week ago",
    description: "Conduct user research to inform design decisions for our Creative Cloud applications.",
    requirements: ["User research experience", "Qualitative methods", "Portfolio required"],
    isBookmarked: true,
    applicants: 15
  }
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  
  const filteredJobs = mockJobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(job =>
    !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase())
  );

  const bookmarkedJobs = mockJobs.filter(job => job.isBookmarked);

  const handleBookmark = (jobId: string) => {
    console.log(`Bookmarking job ${jobId}`);
  };

  const handleApply = (jobId: string) => {
    console.log(`Applying to job ${jobId}`);
  };

  const JobCard = ({ job }: { job: Job }) => (
    <Card className="shadow-card hover:shadow-professional transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer">
              {job.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-muted-foreground">{job.company}</span>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleBookmark(job.id)}
            className={job.isBookmarked ? "text-warning" : ""}
          >
            <Bookmark className={`h-4 w-4 ${job.isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary">{job.type}</Badge>
          {job.salary && <Badge variant="outline">{job.salary}</Badge>}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{job.postedTime}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Key Requirements:</h4>
          <div className="flex flex-wrap gap-1">
            {job.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {job.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {job.applicants} applicants
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" onClick={() => handleApply(job.id)}>
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Jobs</h1>
        <p className="text-muted-foreground">Discover new opportunities that match your skills and interests</p>
      </div>

      {/* Search and Filters */}
      <Card className="shadow-card mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search job titles, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Location"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-primary mb-1">{filteredJobs.length}</div>
            <div className="text-sm text-muted-foreground">Available Jobs</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-success mb-1">{bookmarkedJobs.length}</div>
            <div className="text-sm text-muted-foreground">Saved Jobs</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-warning mb-1">3</div>
            <div className="text-sm text-muted-foreground">Applications</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="text-xl font-bold text-muted-foreground mb-1">12</div>
            <div className="text-sm text-muted-foreground">Profile Views</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">
            All Jobs ({filteredJobs.length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved ({bookmarkedJobs.length})
          </TabsTrigger>
          <TabsTrigger value="applied">
            Applied (3)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {bookmarkedJobs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookmarkedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No saved jobs</h3>
                <p className="text-muted-foreground">
                  Bookmark interesting jobs to save them for later
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Track your applications</h3>
              <p className="text-muted-foreground">
                Jobs you've applied to will appear here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Jobs;
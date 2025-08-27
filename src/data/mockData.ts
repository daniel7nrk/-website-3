export interface User {
  id: string;
  name: string;
  headline: string;
  company: string;
  location: string;
  avatar: string;
  connections: number;
  bio: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  isConnected: boolean;
  mutualConnections: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  current: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  employees: User[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'update' | 'job_change' | 'achievement' | 'share';
}

export interface Message {
  id: string;
  sender: User;
  recipient: User;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    headline: "Senior Product Manager at TechCorp",
    company: "TechCorp",
    location: "San Francisco, CA",
    avatar: "/placeholder-avatar.jpg",
    connections: 500,
    bio: "Passionate about building products that make a difference. 8+ years in product management with a focus on user experience and data-driven decisions.",
    experience: [
      {
        id: "1",
        title: "Senior Product Manager",
        company: "TechCorp",
        location: "San Francisco, CA",
        startDate: "2021-03",
        description: "Leading product strategy for our core platform serving 1M+ users.",
        current: true
      },
      {
        id: "2",
        title: "Product Manager",
        company: "StartupXYZ",
        location: "Palo Alto, CA",
        startDate: "2019-01",
        endDate: "2021-02",
        description: "Managed product roadmap for mobile application with 100K+ downloads.",
        current: false
      }
    ],
    education: [
      {
        id: "1",
        school: "Stanford University",
        degree: "MBA",
        field: "Business Administration",
        startDate: "2017-09",
        endDate: "2019-06"
      }
    ],
    skills: ["Product Management", "Strategy", "User Experience", "Data Analysis", "Agile"],
    isConnected: true,
    mutualConnections: 45
  },
  {
    id: "2",
    name: "Michael Chen",
    headline: "Software Engineer at Google",
    company: "Google",
    location: "Mountain View, CA",
    avatar: "/placeholder-avatar.jpg",
    connections: 750,
    bio: "Full-stack developer passionate about scalable systems and clean code. Contributing to open source projects in my spare time.",
    experience: [
      {
        id: "3",
        title: "Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        startDate: "2020-06",
        description: "Working on distributed systems serving billions of requests daily.",
        current: true
      }
    ],
    education: [
      {
        id: "2",
        school: "UC Berkeley",
        degree: "BS",
        field: "Computer Science",
        startDate: "2016-08",
        endDate: "2020-05"
      }
    ],
    skills: ["JavaScript", "Python", "Go", "Distributed Systems", "React"],
    isConnected: false,
    mutualConnections: 12
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    headline: "UX Designer at Adobe",
    company: "Adobe",
    location: "San Jose, CA",
    avatar: "/placeholder-avatar.jpg",
    connections: 320,
    bio: "Creating delightful user experiences through design thinking and user research. Advocate for inclusive design practices.",
    experience: [
      {
        id: "4",
        title: "UX Designer",
        company: "Adobe",
        location: "San Jose, CA",
        startDate: "2021-08",
        description: "Designing user interfaces for Creative Cloud applications.",
        current: true
      }
    ],
    education: [
      {
        id: "3",
        school: "Art Center College of Design",
        degree: "BFA",
        field: "Interaction Design",
        startDate: "2017-09",
        endDate: "2021-05"
      }
    ],
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research", "Design Systems"],
    isConnected: true,
    mutualConnections: 28
  }
];

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp",
    industry: "Technology",
    size: "1,001-5,000 employees",
    location: "San Francisco, CA",
    description: "Leading technology company focused on innovative software solutions.",
    employees: [mockUsers[0]]
  },
  {
    id: "2",
    name: "Google",
    industry: "Technology",
    size: "100,000+ employees",
    location: "Mountain View, CA",
    description: "Global technology company specializing in internet-related services and products.",
    employees: [mockUsers[1]]
  }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: "1",
    author: mockUsers[0],
    content: "Excited to share that our team just launched a new feature that improves user engagement by 40%! Grateful to work with such talented people. #ProductManagement #TeamWork",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 47,
    comments: 8,
    shares: 3,
    type: "achievement"
  },
  {
    id: "2",
    author: mockUsers[1],
    content: "Just completed my first year at Google! Amazing how much I've learned about distributed systems and scale. Looking forward to what's next! 🚀",
    timestamp: "2024-01-14T14:20:00Z",
    likes: 89,
    comments: 15,
    shares: 5,
    type: "update"
  },
  {
    id: "3",
    author: mockUsers[2],
    content: "Thrilled to announce I'm starting a new role as UX Designer at Adobe! Ready to create amazing user experiences. Thanks to everyone who supported me in this journey.",
    timestamp: "2024-01-13T09:15:00Z",
    likes: 156,
    comments: 32,
    shares: 12,
    type: "job_change"
  }
];

// Current user (for demo purposes)
export const currentUser: User = {
  id: "current",
  name: "Alex Thompson",
  headline: "Product Designer at InnovateLab",
  company: "InnovateLab",
  location: "Austin, TX",
  avatar: "/placeholder-avatar.jpg",
  connections: 284,
  bio: "Product designer with a passion for creating intuitive and accessible digital experiences. 5+ years in design with expertise in user research and design systems.",
  experience: [
    {
      id: "5",
      title: "Product Designer",
      company: "InnovateLab",
      location: "Austin, TX",
      startDate: "2022-01",
      description: "Leading design for B2B SaaS platform, focusing on user experience and design systems.",
      current: true
    },
    {
      id: "6",
      title: "UI/UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Designed digital experiences for various clients across different industries.",
      current: false
    }
  ],
  education: [
    {
      id: "4",
      school: "University of Texas at Austin",
      degree: "BFA",
      field: "Visual Design",
      startDate: "2016-08",
      endDate: "2020-05"
    }
  ],
  skills: ["Product Design", "UI/UX", "Figma", "Design Systems", "User Research", "Prototyping"],
  isConnected: false,
  mutualConnections: 0
};

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "1",
    sender: mockUsers[0],
    recipient: currentUser,
    content: "Hi Alex! I saw your recent work on the design system. Would love to connect and potentially collaborate.",
    timestamp: "2024-01-15T16:30:00Z",
    read: false
  },
  {
    id: "2",
    sender: currentUser,
    recipient: mockUsers[0],
    content: "Thanks Sarah! I'd love to connect. Your product management experience would be valuable for our upcoming projects.",
    timestamp: "2024-01-15T17:15:00Z",
    read: true
  }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: mockUsers[0],
    lastMessage: mockMessages[1],
    unreadCount: 0
  },
  {
    id: "2",
    participant: mockUsers[2],
    lastMessage: {
      id: "3",
      sender: mockUsers[2],
      recipient: currentUser,
      content: "Hey! Congratulations on the recent design award. Well deserved!",
      timestamp: "2024-01-14T12:00:00Z",
      read: false
    },
    unreadCount: 1
  }
];
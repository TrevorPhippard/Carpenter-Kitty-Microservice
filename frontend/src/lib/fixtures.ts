export const posts = [
  {
    id: "p1",
    author: "Alice Johnson",
    headline: "Software Engineer",
    content: "Just finished a new project in React!",
    timestamp: "2h ago",
    comments: [
      {
        content: "okay but try running this on vercel!",
        author: "Troll",
        createdAt: Date.now,
      },
      {
        content: "Yay!",
        author: "Friend",
        createdAt: Date.now,
      },
      {
        content: "nothing beats a jet2 holiday",
        author: "Bot",
        createdAt: Date.now,
      },
    ],
    likes: 20,
    shares: 3,
  },
  {
    id: "p2",
    author: "Bob Smith",
    headline: "Product Manager",
    content: "Excited about our new launch 🚀",
    timestamp: "5h ago",
    comments: [],
    likes: 20,
    shares: 3,
  },
];

export const profiles = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    title: "Software Engineer",
    location: "New York, NY",
    posts: posts.filter((p) => p.author === "Alice Johnson"),
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    title: "Product Manager",
    location: "San Francisco, CA",
    posts: posts.filter((p) => p.author === "Bob Smith"),
  },
];

export const connections = [
  {
    id: "1",
    name: "Alice Johnson",
    title: "Software Engineer",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    isConnected: true,
  },
  {
    id: "2",
    name: "Charlie Brown",
    title: "Designer",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    isConnected: false,
  },
];

export const conversations = [
  {
    id: "c1",
    name: "Alice Johnson",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    lastMessage: "Hey, how’s the project?",
    timestamp: "1h ago",
  },
  {
    id: "c2",
    name: "Bob Smith",
    avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
    lastMessage: "Meeting at 3 PM",
    timestamp: "3h ago",
  },
];

export const threads: Record<string, any[]> = {
  c1: [
    {
      id: "m1",
      sender: "Alice Johnson",
      content: "Hey, how’s the project?",
      avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
      timestamp: "1h ago",
    },
    {
      id: "m2",
      sender: "You",
      content: "Going well! Almost done.",
      avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
      timestamp: "45m ago",
    },
  ],
  c2: [
    {
      id: "m3",
      sender: "Bob Smith",
      content: "Meeting at 3 PM",
      avatar: "https://avatars.githubusercontent.com/u/8942758?v=4",
      timestamp: "3h ago",
    },
  ],
};

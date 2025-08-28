import {
  posts as mockPosts,
  profiles as mockProfiles,
  connections as mockConnections,
  conversations as mockConversations,
  threads as mockThreads,
} from "../lib/fixtures";

// Feed
export const fetchPosts = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return mockPosts;
};

// Profile by ID
export const fetchProfile = async (id: string) => {
  await new Promise((r) => setTimeout(r, 100));
  return mockProfiles.find((p) => p.id === id);
};

// Connections
export const fetchConnections = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return mockConnections;
};

// Conversations list
export const fetchConversations = async () => {
  await new Promise((r) => setTimeout(r, 100));
  return mockConversations;
};

// Messages in thread
export const fetchThread = async (threadId: string) => {
  await new Promise((r) => setTimeout(r, 100));
  return mockThreads[threadId] || [];
};

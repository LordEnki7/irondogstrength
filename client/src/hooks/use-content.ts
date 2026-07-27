import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface ContentData {
  [key: string]: string;
}

// Hook to get all site content
export const useContent = () => {
  return useQuery<ContentData>({
    queryKey: ["/api/content"],
    staleTime: 5 * 60 * 1000, // Content is fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  });
};

// Hook to get specific content by key
export const useContentByKey = (contentKey: string) => {
  return useQuery<{ contentKey: string; contentValue: string }>({
    queryKey: ["/api/content", contentKey],
    enabled: !!contentKey,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

// Utility function to get content value with fallback
export const getContentValue = (content: ContentData | undefined, key: string, fallback: string = ""): string => {
  return content?.[key] || fallback;
};
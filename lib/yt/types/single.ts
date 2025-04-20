export type YouTubeThumbnail = {
    url: string;
    width: number;
    height: number;
  };
  
  export type YouTubeThumbnails = {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    standard?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  
  export type YouTubeLocalized = {
    title: string;
    description: string;
  };
  
  export type YouTubeVideoSnippet = {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    channelTitle: string;
    categoryId: string;
    liveBroadcastContent: string;
    localized: YouTubeLocalized;
  };
  
  export type YouTubeVideoItem = {
    kind: string;
    etag: string;
    id: string;
    snippet: YouTubeVideoSnippet;
  };
  
  export type YouTubePageInfo = {
    totalResults: number;
    resultsPerPage: number;
  };
  
  export type YouTubeVideoListResponse = {
    kind: string;
    etag: string;
    items: YouTubeVideoItem[];
    pageInfo: YouTubePageInfo;
  };
  
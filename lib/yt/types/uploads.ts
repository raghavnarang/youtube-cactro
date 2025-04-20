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
  
  export type YouTubeVideoSnippet = {
    title: string;
    thumbnails: YouTubeThumbnails;
    resourceId: {
      videoId: string;
    };
  };
  
  export type YouTubeVideoItem = {
    snippet: YouTubeVideoSnippet;
  };
  
  export type YouTubeVideosResponse = {
    items: YouTubeVideoItem[];
  };
  
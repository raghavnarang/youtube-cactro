export interface YouTubeChannelListResponse {
  kind: "youtube#channelListResponse";
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeChannel[];
}

export interface YouTubeChannel {
  kind: "youtube#channel";
  etag: string;
  id: string;
  snippet: {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    localized: {
      title: string;
      description: string;
    };
  };
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeCommentThreadListResponse {
  kind: "youtube#commentThreadListResponse";
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeCommentThread[];
}

export interface YouTubeCommentThread {
  kind: "youtube#commentThread";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: YouTubeComment;
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies?: {
    comments: YouTubeComment[];
  };
}

export interface YouTubeComment {
  kind: "youtube#comment";
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    textDisplay: string;
    textOriginal: string;
    parentId?: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    authorChannelUrl: string;
    authorChannelId: {
      value: string;
    };
    canRate: boolean;
    viewerRating: string;
    likeCount: number;
    publishedAt: string;
    updatedAt: string;
  };
}

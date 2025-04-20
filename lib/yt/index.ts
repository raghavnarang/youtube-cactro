import { reportEvent } from "@/data/events";
import type { YouTubeVideosResponse } from "./types/uploads";
import type { YouTubeVideoListResponse } from "./types/single";
import type { YouTubeChannelListResponse } from "./types/channels";
import { YouTubeCommentThreadListResponse } from "./types/comments";

export async function getYTUploads(id: string, token: string) {
  try {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&fields=items(snippet(resourceId/videoId,title,description,thumbnails))&playlistId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["videos"] },
      }
    );
    if (!data.ok) {
      throw new Error(`Failed to fetch Uploads: ${data.statusText}`);
    }
    const response = (await data.json()) as YouTubeVideosResponse;
    reportEvent(`Fetched videos (${response.items.length})`, "info");
    return response.items;
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to fetch videos: ${err.message}`, "error");
    } else {
      reportEvent(`Unable to fetch videos: Unknown Error`, "error");
    }

    throw err;
  }
}

export async function getYTVideo(id: string, token: string) {
  try {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["videos"] },
      }
    );
    if (!data.ok) {
      throw new Error(`Failed to fetch Video: ${data.statusText}`);
    }
    const response = (await data.json()) as YouTubeVideoListResponse;
    if (response.items.length === 0) {
      throw new Error("Invalid response from Youtube");
    }

    reportEvent(`Fetched video (${response.items[0].id})`, "info");
    return response.items[0];
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to fetch video (${id}) : ${err.message}`, "error");
    } else {
      reportEvent(`Unable to fetch video (${id}): Unknown Error`, "error");
    }

    throw err;
  }
}

export async function getChannels(token: string) {
  try {
    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&mine=true",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["videos"] },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch channels: ${res.statusText}`);
    }

    const data = (await res.json()) as YouTubeChannelListResponse;
    if (data.items.length === 0) {
      throw new Error("Invalid response from Youtube");
    }
    reportEvent(`Fetched Channels (${data.items.length})`, "info");
    return data.items;
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(
        `Unable to fetch channels for current user, Error: ${err.message}`,
        "error"
      );
    } else {
      reportEvent(
        `Unable to fetch channels for current user, Error: Unknown Error`,
        "error"
      );
    }

    throw err;
  }
}

export async function getComments(videoId: string, token: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["videos"] },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch comments: ${res.statusText}`);
    }

    const data = (await res.json()) as YouTubeCommentThreadListResponse;
    reportEvent(
      `Fetched Video (${videoId}) Comment Threads (${data.items.length})`,
      "info"
    );
    return data.items;
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(
        `Unable to fetch video comments, Error: ${err.message}`,
        "error"
      );
    } else {
      reportEvent(
        `Unable to fetch video comments, Error: Unknown Error`,
        "error"
      );
    }

    throw err;
  }
}

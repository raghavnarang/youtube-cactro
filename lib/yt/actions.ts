"use server";
import { getToken } from "@/auth";
import { reportEvent } from "@/data/events";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { zfd } from "zod-form-data";

export async function updateVideo(prevState: unknown, formData: FormData) {
  try {
    const { data, success } = zfd
      .formData({
        title: zfd.text(),
        description: zfd.text(),
        categoryId: zfd.numeric(),
        // TODO: id must come as an arg of this function, not as form data (security issue)
        id: zfd.text(),
      })
      .safeParse(formData);

    if (!success) {
      throw new Error("Invalid Submission");
    }

    const token = await getToken();
    if (!token) {
      redirect("/api/auth/signin");
    }

    const { title, description, categoryId, id } = data;

    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          snippet: {
            title,
            description,
            categoryId: `${categoryId}`,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Video Update Failed: " + id);
    }

    // It seems that Youtube is little latent in updating meta, and returning at same time
    // TODO: Try to use useOptimistic
    await new Promise((res) => setTimeout(res, 200));

    revalidateTag("videos");

    return {
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to update video: ${err.message}`, "error");
    } else {
      reportEvent(`Unable to update video: Unknown Error`, "error");
    }

    return {
      error: true,
    };
  }
}

export async function updateComment(prevState: unknown, formData: FormData) {
  try {
    const { data, success } = zfd
      .formData({
        comment: zfd.text(),
        // TODO: id must come as an arg of this function, not as form data (security issue)
        id: zfd.text(),
      })
      .safeParse(formData);

    if (!success) {
      throw new Error("Invalid Submission");
    }

    const token = await getToken();
    if (!token) {
      redirect("/api/auth/signin");
    }

    const { comment, id } = data;

    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/comments?part=snippet",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          snippet: {
            textOriginal: comment,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Comment Update Failed: " + id);
    }

    // It seems that Youtube is little latent in updating meta, and returning at same time
    // TODO: Try to use useOptimistic
    await new Promise((res) => setTimeout(res, 200));

    revalidateTag("videos");

    return {
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to update comment: ${err.message}`, "error");
    } else {
      reportEvent(`Unable to update comment: Unknown Error`, "error");
    }

    return {
      error: true,
    };
  }
}

export async function replyToComment(prevState: unknown, formData: FormData) {
  try {
    const { data, success } = zfd
      .formData({
        comment: zfd.text(),
        // TODO: id must come as an arg of this function, not as form data (security issue)
        id: zfd.text(),
      })
      .safeParse(formData);

    if (!success) {
      throw new Error("Invalid Submission");
    }

    const token = await getToken();
    if (!token) {
      redirect("/api/auth/signin");
    }

    const { comment, id } = data;

    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/comments?part=snippet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            textOriginal: comment,
            parentId: id,
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Reply Comment Failed: " + id);
    }

    // Replying to a comment take too long on YouTube to return it as a comment, so sleeping for a full minute
    // But dont worry, we are updating the UI to inform user via Loading toast
    // TODO: Try to use useOptimistic
    await new Promise((res) => setTimeout(res, 50000));

    revalidateTag("videos");

    return {
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to reply comment: ${err.message}`, "error");
    } else {
      reportEvent(`Unable to reply comment: Unknown Error`, "error");
    }

    return {
      error: true,
    };
  }
}

export async function addComment(prevState: unknown, formData: FormData) {
  try {
    const { data, success } = zfd
      .formData({
        comment: zfd.text(),
        // TODO: id must come as an arg of this function, not as form data (security issue)
        id: zfd.text(),
        channelId: zfd.text(),
      })
      .safeParse(formData);

    if (!success) {
      throw new Error("Invalid Submission");
    }

    const token = await getToken();
    if (!token) {
      redirect("/api/auth/signin");
    }

    const { comment, id, channelId } = data;

    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/commentThreads?part=snippet",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          snippet: {
            videoId: id,
            channelId,
            topLevelComment: {
              snippet: {
                textOriginal: comment,
              },
            },
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Add Comment Failed: " + id);
    }

    // Replying to a comment take too long on YouTube to return it as a comment, so sleeping for a full minute
    // But dont worry, we are updating the UI to inform user via Loading toast
    // TODO: Try to use useOptimistic
    await new Promise((res) => setTimeout(res, 50000));

    revalidateTag("videos");

    return {
      success: true,
    };
  } catch (err) {
    if (err instanceof Error) {
      reportEvent(`Unable to add comment: ${err.message}`, "error");
    } else {
      reportEvent(`Unable to add comment: Unknown Error`, "error");
    }

    return {
      error: true,
    };
  }
}

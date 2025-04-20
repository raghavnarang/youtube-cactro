import { getToken } from "@/auth";
import { getComments, getYTVideo } from "@/lib/yt";
import { redirect } from "next/navigation";
import Comment from "@/components/comment";
import AddCommentSection from "@/components/add-comment-section";

interface CommentsSlotProps {
  params: Promise<{ id: string }>;
}

export default async function CommentsSlot({ params }: CommentsSlotProps) {
  const { id } = await params;
  const token = await getToken();
  if (!token) {
    redirect("/api/auth/signin");
  }

  const comments = await getComments(id, token);
  const video = await getYTVideo(id, token);

  return (
    <div>
      <h2 className="text-xl mb-5">Comments</h2>
      <AddCommentSection videoId={id} channelId={video.snippet.channelId} />
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
        {comments.length === 0 && <p>No Comments</p>}
      </div>
    </div>
  );
}

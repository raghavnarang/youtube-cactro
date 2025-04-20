"use client";

import { updateComment } from "@/lib/yt/actions";
import type {
  YouTubeComment,
  YouTubeCommentThread,
} from "@/lib/yt/types/comments";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import AddComment from "./add-comment";

interface CommentProps {
  comment: YouTubeCommentThread | YouTubeComment;
}

function Form({
  comment,
  isEdit,
  setEdit,
  toggleReply,
}: CommentProps & {
  isEdit: boolean;
  setEdit: (val: boolean) => void;
  toggleReply: () => void;
}) {
  const { snippet, id } =
    "topLevelComment" in comment.snippet
      ? comment.snippet.topLevelComment
      : (comment as YouTubeComment);

  const isThread = "topLevelComment" in comment.snippet;
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <Image
          src={snippet.authorProfileImageUrl || "https://placehold.co/100x100"}
          width={30}
          height={30}
          alt={snippet.authorDisplayName}
          className="rounded-full"
        />
        <span className="font-bold">{snippet.authorDisplayName}</span>
      </div>
      {!isEdit ? (
        <p>{snippet.textOriginal}</p>
      ) : (
        <input
          type="text"
          className="w-full border border-gray-300 bg-none rounded-lg p-2 disabled:opacity-50"
          defaultValue={snippet.textOriginal}
          name="comment"
          disabled={pending}
          autoFocus
        />
      )}
      <div className="flex gap-3">
        {snippet.channelId === snippet.authorChannelId?.value && (
          <button
            className="cursor-pointer text-sm font-semibold"
            disabled={pending}
            onClick={(e) => {
              setEdit(!isEdit);
              e.preventDefault();
            }}
          >
            {!isEdit ? "Edit" : "Cancel"}
          </button>
        )}
        {isEdit && (
          <button
            type="submit"
            className="cursor-pointer text-sm font-semibold"
            disabled={pending}
          >
            Submit
          </button>
        )}
        {!isEdit && isThread && (
          <button
            className="cursor-pointer text-sm font-semibold"
            disabled={pending}
            onClick={(e) => {
              toggleReply();
              e.preventDefault();
            }}
          >
            Reply
          </button>
        )}
      </div>
      <input type="hidden" name="id" value={id} />
    </div>
  );
}

export default function Comment({ comment }: CommentProps) {
  const [isEdit, setEdit] = useState(false);
  const [result, action] = useActionState(updateComment, null);
  const [reply, setReply] = useState(false);

  const { id: parentId } =
    "topLevelComment" in comment.snippet ? comment.snippet.topLevelComment : {};

  useEffect(() => {
    if (result?.error) {
      toast.error("Invalid form submission/Unable to update comment");
    }

    if (result?.success) {
      toast.success("Updated");
      setEdit(false);
    }
  }, [result]);
  return (
    <>
      <div className="border border-gray-300 px-5 py-4 rounded-lg">
        <form action={action}>
          <Form
            comment={comment}
            isEdit={isEdit}
            setEdit={setEdit}
            toggleReply={() => setReply(!reply)}
          ></Form>
        </form>
      </div>
      {reply && parentId && (
        <div className="pl-10">
          <AddComment
            isReply={true}
            parentId={parentId}
            onClose={() => setReply(false)}
          />
        </div>
      )}
      {"replies" in comment && comment.replies?.comments && (
        <div className="flex flex-col gap-5 pl-10">
          {comment.replies.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      )}
    </>
  );
}

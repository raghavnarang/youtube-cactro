"use client";

import { useState } from "react";
import AddComment from "./add-comment";
import Button from "./button";

export default function AddCommentSection({
  videoId,
  channelId,
}: {
  videoId: string;
  channelId: string;
}) {
  const [showComment, setComment] = useState(false);
  return (
    <div className="mb-5">
      {!showComment && (
        <Button
          onClick={(e) => {
            setComment(true);
            e.preventDefault();
          }}
        >
          Add a Comment
        </Button>
      )}
      {showComment && (
        <AddComment
          isReply={false}
          parentId={videoId}
          onClose={() => setComment(false)}
          channelId={channelId}
        />
      )}
    </div>
  );
}

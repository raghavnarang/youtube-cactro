"use client";

import { addComment, replyToComment } from "@/lib/yt/actions";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

interface AddCommentProps {
  onClose?: () => void;
  isReply: boolean;
  parentId: string;
  channelId?: string;
}

function Form({ onClose, parentId, channelId }: AddCommentProps) {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        className="w-full border border-gray-300 bg-none rounded-lg p-2 disabled:opacity-50"
        name="comment"
        disabled={pending}
        autoFocus
      />
      <div className="flex gap-3">
        <button
          className="cursor-pointer text-sm font-semibold"
          disabled={pending}
          onClick={(e) => {
            onClose?.();
            e.preventDefault();
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer text-sm font-semibold"
          disabled={pending}
        >
          Submit
        </button>
      </div>
      <input type="hidden" name="id" value={parentId} />
      {channelId && <input type="hidden" name="channelId" value={channelId} />}
    </div>
  );
}

export default function AddComment(props: AddCommentProps) {
  const [result, action] = useActionState(
    props.isReply ? replyToComment : addComment,
    null
  );
  const loadingResult = useRef<string | number>(null);

  useEffect(() => {
    if (result?.error) {
      if (loadingResult.current) {
        toast.dismiss(loadingResult.current);
      }
      toast.error("Invalid form submission/Unable to reply comment");
    }

    if (result?.success) {
      if (loadingResult.current) {
        toast.dismiss(loadingResult.current);
      }
      toast.success("Replied");
      props.onClose?.();
    }
  }, [result]);
  return (
    <div className="border border-gray-300 px-5 py-4 rounded-lg">
      <form
        action={action}
        onSubmit={() => {
          loadingResult.current = toast.loading(
            "Submitting. It may take a minute or two"
          );
        }}
      >
        <Form {...props} />
      </form>
    </div>
  );
}

"use client";
import { YouTubeVideoItem } from "@/lib/yt/types/single";
import Button from "./button";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { updateVideo } from "@/lib/yt/actions";
import { toast } from "sonner";

interface SingleVideoInfoProps {
  video: YouTubeVideoItem;
}

function Form({
  video,
  isEdit,
  setEdit,
}: SingleVideoInfoProps & {
  isEdit: boolean;
  setEdit: (val: boolean) => void;
}) {
  const thumbnail =
    video.snippet.thumbnails.maxres ||
    video.snippet.thumbnails.high ||
    video.snippet.thumbnails.medium ||
    video.snippet.thumbnails.standard ||
    video.snippet.thumbnails.default;
  const { pending } = useFormStatus();

  return (
    <>
      {isEdit ? (
        <input
          type="text"
          className="w-full border border-gray-300 bg-none rounded-lg p-2 text-2xl mb-7 disabled:opacity-50"
          defaultValue={video.snippet.title}
          name="title"
          disabled={pending}
        />
      ) : (
        <h1 className="text-2xl mb-7">{video.snippet.title}</h1>
      )}

      <Image
        src={thumbnail?.url || "https://placehold.co/640x480"}
        width={640}
        height={480}
        alt={video.snippet.title}
        className="w-full mb-5 rounded-xl border-gray-500 border"
      />
      <div className="mb-5">
        <p className="text-gray-500 mb-1">Description</p>
        {isEdit ? (
          <textarea
            className="w-full border border-gray-300 bg-none rounded-lg p-2 disabled:opacity-50"
            rows={4}
            defaultValue={video.snippet.description}
            name="description"
            disabled={pending}
          />
        ) : (
          <p>{video.snippet.description || "No Description"}</p>
        )}
      </div>
      <Button
        className="mr-3"
        onClick={(e) => {
          setEdit(!isEdit);
          e.preventDefault();
        }}
        disabled={pending}
      >
        {isEdit ? "Cancel" : "Edit"}
      </Button>
      <input type="hidden" value={video.snippet.categoryId} name="categoryId" />
      <input type="hidden" value={video.id} name="id" />
      {isEdit && (
        <Button type="submit" disabled={pending}>
          Submit
        </Button>
      )}
    </>
  );
}

export default function SingleVideoInfo({ video }: SingleVideoInfoProps) {
  const [result, action] = useActionState(updateVideo, null);
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (result?.error) {
      toast.error("Invalid form submission/Unable to update video");
    }

    if (result?.success) {
      toast.success("Updated");
      setEdit(false);
    }
  }, [result]);

  return (
    <div className="max-w-xl w-full py-7 px-10 border rounded-xl border-gray-300 mx-auto my-0">
      <form action={action}>
        <Form video={video} isEdit={isEdit} setEdit={setEdit} />
      </form>
    </div>
  );
}

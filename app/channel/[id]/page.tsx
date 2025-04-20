import { getToken } from "@/auth";
import { getYTUploads } from "@/lib/yt";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

interface ChannelPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChannelPage({ params }: ChannelPageProps) {
  const { id } = await params;
  const token = await getToken();
  if (!token) {
    redirect("/api/auth/signin");
  }

  const videos = await getYTUploads(id, token);
  return (
    <div className="container mx-auto my-10 px-5">
      <h1 className="text-2xl mb-10">Youtube Videos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {videos.map((vid) => {
          const thumbnail =
            vid.snippet.thumbnails.high ||
            vid.snippet.thumbnails.medium ||
            vid.snippet.thumbnails.standard ||
            vid.snippet.thumbnails.default;

          const vidId = vid.snippet.resourceId.videoId;
          return (
            <Link key={vidId} href={`/video/${vidId}`}>
              <Image
                src={thumbnail?.url || "https://placehold.co/320x180"}
                width={320}
                height={180}
                alt={vid.snippet.title}
                className="w-full mb-3"
              />
              <p className="text-lg">{vid.snippet.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

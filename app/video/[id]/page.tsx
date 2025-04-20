import { getToken } from "@/auth";
import SingleVideoInfo from "@/components/single-video-info";
import { getYTVideo } from "@/lib/yt";
import { redirect } from "next/navigation";

interface VideoPageProps {
  params: Promise<{ id: string }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { id } = await params;
  const token = await getToken();
  if (!token) {
    redirect("/api/auth/signin");
  }

  const video = await getYTVideo(id, token);
  return <SingleVideoInfo video={video} />;
}

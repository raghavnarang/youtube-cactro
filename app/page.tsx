import { getToken } from "@/auth";
import Page from "@/components/page";
import { getChannels } from "@/lib/yt";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = await getToken();
  if (!token) {
    redirect("/api/auth/signin");
  }

  const channels = await getChannels(token);

  return (
    <Page title="Select a Channel">
      <div className="grid grid-cols-3 md:grid-cols-8 gap-10">
        {channels.map((channel) => {
          if (!channel.contentDetails.relatedPlaylists.uploads) {
            return null;
          }

          const thumbnail =
            channel.snippet.thumbnails.high ||
            channel.snippet.thumbnails.medium ||
            channel.snippet.thumbnails.default;
          const id = channel.id;
          return (
            <Link
              key={id}
              href={`/channel/${channel.contentDetails.relatedPlaylists.uploads}`}
              className="flex items-center flex-col"
            >
              <Image
                src={thumbnail?.url || "https://placehold.co/320x180"}
                width={100}
                height={100}
                alt={channel.snippet.title}
                className="w-24 mb-3 rounded-full"
              />
              <p className="text-lg">{channel.snippet.title}</p>
            </Link>
          );
        })}
      </div>
    </Page>
  );
}

import { ReactNode } from "react";

interface VideoLayoutProps {
  children?: ReactNode;
  comments?: ReactNode;
}

export default async function VideoLayout({
  children,
  comments,
}: VideoLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 container mx-auto my-10 justify-center">
      {children}
      {comments}
    </div>
  );
}

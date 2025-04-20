import { ReactNode } from "react";

export default function Page({
  children,
  title,
}: {
  children?: ReactNode;
  title: string;
}) {
  return (
    <div className="container mx-auto my-10 px-5">
      <h1 className="text-2xl mb-10">{title}</h1>
      {children}
    </div>
  );
}

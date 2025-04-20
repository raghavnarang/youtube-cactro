"use client";

import { useSession, signOut } from "next-auth/react";
import Button from "./button";
import Link from "next/link";

export default function Header() {
  const session = useSession();

  return (
    session && (
      <header className="border-b border-gray-300 h-24 flex items-center justify-between container mx-auto my-0 px-5">
        <Link href="/">
          <h1 className="text-2xl font-semibold">YouTube Manager</h1>
        </Link>
        <div className="flex items-center justify-end gap-3">
          <span>Welcome {session.data?.user?.name || ""}</span>
          <Button onClick={() => signOut()}>Signout</Button>
        </div>
      </header>
    )
  );
}

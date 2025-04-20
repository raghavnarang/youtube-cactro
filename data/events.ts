import { createClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function reportEvent(
  message: string,
  type: "info" | "error" | "warning"
) {
  const client = await createClient(cookies());
  const result = await client.from("events").insert({
    message,
    type,
  });
}

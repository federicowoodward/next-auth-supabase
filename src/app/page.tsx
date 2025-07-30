import { createClient } from "@/utils/supabase/client.supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return redirect(error || !data.user ? "/auth/login" : "/profile");
}

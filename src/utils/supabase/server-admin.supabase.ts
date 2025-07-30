import { createClient } from "@supabase/supabase-js";

export function createAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Faltan env vars de Supabase");
  return createClient(url, key);
}

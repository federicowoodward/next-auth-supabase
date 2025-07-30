import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server.supabase"; // tu SSR client
import { createAdmin } from "@/utils/supabase/server-admin.supabase";

export async function DELETE() {
  // 1) obtener user de la sesión
  const supabase = createClient();
  const { data: { user }, error: e1 } = await supabase.auth.getUser();
  if (e1 || !user) return NextResponse.json({ message: "No autenticado" }, { status: 401 });

  // 2) borrarlo con privilegios admin
  const admin = createAdmin();
  const { error: e2 } = await admin.auth.admin.deleteUser(user.id);
  if (e2) return NextResponse.json({ message: e2.message }, { status: 500 });

  return NextResponse.json({ message: "Cuenta eliminada" });
}

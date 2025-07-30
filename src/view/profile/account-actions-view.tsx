"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client.supabase";

export default function AccountActions() {
  const supabase = createClient();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    setIsLoggingOut(false);
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      router.push("/");
    }
  }

  async function handleDeleteAccount() {
    if (
      !window.confirm(
        "¿Estás seguro que querés borrar tu cuenta? Esta acción es irreversible."
      )
    ) {
      return;
    }
    setIsDeleting(true);

    // Llama a tu API de Next.js para borrar la cuenta en el servidor
    const res = await fetch("/api/delete-account", { method: "DELETE" });
    setIsDeleting(false);

    if (res.ok) {
      toast.success("Cuenta borrada correctamente");
      router.push("/");
    } else {
      const err = await res.json();
      toast.error(err.message || "Error borrando cuenta");
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Account actions.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full"
          >
            {isLoggingOut ? "Cerrando sesión…" : "Cerrar sesión"}
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full text-red-600 border-red-600 hover:bg-red-50"
          >
            {isDeleting ? "Borrando cuenta…" : "Borrar cuenta"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { createClient } from "@/utils/supabase/client.supabase";
import { RegisterView } from "@/view/auth/register-view";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterView />
      </div>
    </div>
  );
};

export default RegisterPage;

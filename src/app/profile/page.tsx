import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server.supabase";
import AccountActions from "@/view/profile/account-actions-view";
import ProfileForm from "@/view/profile/profile-view";
import { Divide } from "lucide-react";

const ProfilePage = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <div className="container mx-auto max-w-xl space-y-8 px-4 py-8 sm:px-6">
        <div className="space-y-6 md:col-span-2">
          <ProfileForm
            userMetaData={data.user?.user_metadata}
            userId={data.user?.id}
          />
        </div>
      </div>
      <div className="container mx-auto max-w-xl space-y-8 px-4 py-8 sm:px-6">
        <div className="space-y-6 md:col-span-2">
          <AccountActions />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

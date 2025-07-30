"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { UserMetadata } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client.supabase";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userMetaData?: UserMetadata;
  userId?: string;
}

export default function ProfileForm({
  userMetaData,
  userId,
}: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userMetaData?.fullname ?? "",
      email: userMetaData?.email ?? "",
    },
    mode: "onChange",
  });

  const supabase = createClient();

  async function onSubmit(data: ProfileFormValues) {
    const { error } = await supabase.auth.updateUser({
      data: { fullname: data.name },
    });
    if (error) {
      toast.error("Error updating profile");
      console.error(error);
    } else {
      toast.success("Profile updated successfully");
    }
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information here.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <Label htmlFor="name" className="mb-1">
              Name
            </Label>
            <Input id="name" {...register("name")} placeholder="John Doe" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email (readonly) */}
          <div className="flex flex-col">
            <Label htmlFor="email" className="mb-1">
              Email
            </Label>
            <Input
              id="email"
              {...register("email")}
              defaultValue={userMetaData?.email ?? ""}
              disabled
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2 mt-3">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              // Si querés resetear: form.reset()
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCamera, FaUpload } from "react-icons/fa6";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import useGetProfileInfo from "@/hooks/useGetProfileInfo"; // <-- ADD THIS

interface IProfileForm {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: string;
  birthday: string;
  bio: string;
}

export default function Page() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();
  const { data: profile } = useGetProfileInfo();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IProfileForm>();

  const mutation = useUpdateProfile(setError);

  //  Set default values by current user profile data
  useEffect(() => {
    if (!profile) return;

    reset({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      email: profile.email || "",
      address: profile.address || "",
      contact_number: profile.contact_number || "",
      birthday: profile.birthday || "",
      bio: profile.bio || "",
    });
  }, [profile, reset]);

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected?.name) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  const onSubmit = (form: IProfileForm) => {
    mutation.mutate(
      {
        ...form,
        profile_image: file,
      },
      {
        onError: (error) => {
          toast.error(error?.detail || "Something is wrong");
          reset();
        },
        onSuccess: () => {
          toast.success("Profile updated successfully");
          router.push("/dashboard");
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-7 sm:mx-4 lg:mx-11">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-[#0D224A]">
        Account Information
      </h2>

      {/* Profile Photo */}
      <div className="flex flex-col sm:flex-row items-center relative gap-6 mb-8 border rounded-2xl p-4 border-[#A1A3ABA1] md:p-6 max-w-[414px]">
        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden relative">
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              fill
              className="object-cover rounded-full"
            />
          ) : profile?.profile_image ? (
            <Image
              src={profile.profile_image}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}

          <label className="absolute bottom-1 right-1 bg-[#5272FF] p-2 rounded-full text-white cursor-pointer">
            {!profile?.profile_image && <FaCamera size={16} />}
            <input
              type="file"
              className="hidden"
              onChange={handleImageSelect}
            />
          </label>
        </div>

        <label className="cursor-pointer px-5 py-2 rounded-md bg-[#5272FF] hover:bg-blue-600 text-white flex items-center gap-2">
          <FaUpload /> Upload New Photo
          <input type="file" className="hidden" onChange={handleImageSelect} />
        </label>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 border rounded-2xl p-4 border-[#A1A3ABA1] md:p-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            error={errors.first_name?.message}
            {...register("first_name", { required: "First name is required" })}
          />
          <Input
            label="Last Name"
            error={errors.last_name?.message}
            {...register("last_name", { required: "Last name is required" })}
          />
        </div>

        <Input
          label="Email"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          label="Address"
          error={errors.address?.message}
          {...register("address")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contact Number"
            error={errors.contact_number?.message}
            {...register("contact_number")}
          />
          <Input
            label="Birthday"
            type="date"
            error={errors.birthday?.message}
            {...register("birthday")}
          />
        </div>

        <Input label="Bio" error={errors.bio?.message} {...register("bio")} />

        <div className="flex justify-center gap-4 mt-6">
          <Button className="max-w-44" loading={mutation.isPending}>
            Save Changes
          </Button>

          <Link
            href="/dashboard"
            className="w-44 p-2 text-center text-white rounded-md bg-gray-400 hover:bg-gray-500"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

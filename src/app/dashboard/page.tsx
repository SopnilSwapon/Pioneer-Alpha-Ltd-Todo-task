"use client";

import useGetProfileInfo from "@/hooks/useGetProfileInfo";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { BiSolidEdit } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";

export default function Page() {
  const { data, isLoading } = useGetProfileInfo();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 animate-pulse">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200" />
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const profile = data;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-28 h-28 rounded-full bg-gray-200 overflow-hidden">
          {profile?.profile_image ? (
            <Image
              src={profile.profile_image}
              alt="Profile Image"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            {profile?.first_name} {profile?.last_name}
          </h1>
          <p className="text-gray-500 mt-1">{profile?.email}</p>

          <div className="flex gap-3 mt-4">
            <Link href="/dashboard/account-information">
              <Button className="px-5 py-2 flex items-center gap-1.5">
                <FaUserEdit size={20} /> Edit Profile
              </Button>
            </Link>

            <Link
              href="/profile/change-password"
              className="px-5 py-2 rounded-md bg-[#5272FF] hover:bg-blue-600 text-white flex items-center justify-center"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>

      {/* Information Grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="First Name" value={profile?.first_name} />
        <InfoItem label="Last Name" value={profile?.last_name} />
        <InfoItem label="Contact Number" value={profile?.contact_number} />
        <InfoItem label="Birthday" value={profile?.birthday} />
        <InfoItem label="Address" value={profile?.address} />
        <InfoItem label="Bio" value={profile?.bio} />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function InfoItem({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-foreground p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-medium mt-1">
        {value || <span className="text-gray-400">Not provided</span>}
      </p>
    </div>
  );
}

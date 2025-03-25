"use client";
import { useGetUserByIdQuery } from "@/lib/api/userApi";
import { Clipboard } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const { id: userId } = useParams();

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, {
    skip: !userId, // Prevent API call if userId is missing
  });

  const [copied, setCopied] = useState(false);

  if (!userId) return <div className="text-center text-red-500">Please log in to view your profile.</div>;
  if (isLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (error) return <div className="mt-5 text-center text-red-500">Failed to load profile.</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(user?.email || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6 text-white">
      <div className="bg-accent w-full max-w-md rounded-2xl p-6 text-center shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <Image src={user?.avatar || "/assets/svg/vercel.svg"} alt="Profile Picture" className="border-foreground rounded-full border-4 object-cover" height={100} width={100} />
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-white">{user?.email || "No email provided"}</p>
            <button onClick={handleCopy} className="transition hover:text-blue-500">
              <Clipboard className="h-4 w-4" />
            </button>
            {copied && <span className="text-xs text-green-500">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

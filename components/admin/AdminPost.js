"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/action/AdminActions";
import Link from "next/link";

export default function AdminPost({ postData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async (post_id) => {
    setIsLoading(true);
    setError("");
    try {
      await deletePost({ post_id });
      router.push("/admin");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
      <div className="max-w-screen-lg w-full flex flex-col md:flex-row gap-6 p-6 rounded-lg bg-white">
        {postData.pic_url && 
        <Image
          src={`/uploads/${postData.pic_url}`}
          width={300}
          height={300}
          priority
          alt="Post Pic"
          className="w-full rounded-lg object-contain"
        />
        }
        <div className="w-full flex flex-col gap-6 justify-between *:font-medium">
          <div className="space-y-4">
            <p>
              Created By:{" "}
              <span className="block w-full">{postData.username}</span>
            </p>
            <p>
              Created at:{" "}
              <span className="block w-full">{postData.created_at}</span>
            </p>
            <p>
              Post Content:{" "}
              <span className="block w-full">{postData.content}</span>
            </p>
          </div>

          <div className="grid gap-2">
            {error && (
              <div className="px-6 py-4 text-white rounded bg-red-500/90">
                {error}
                <button
                  className="float-right cursor-pointer"
                  type="button"
                  onClick={() => setError("")}
                >
                  &#10006;
                </button>
              </div>
            )}
            <button
              className="w-full py-4 text-white rounded bg-red-500/90 hover:bg-red-500 cursor-pointer"
              type="button"
              onClick={() => handleDelete(postData.id)}
              disabled={isLoading}
            >
              Delete
            </button>
            <Link
              className="w-full py-4 text-center text-white rounded bg-zinc-500/90 hover:bg-zinc-500"
              href={isLoading ? "#" : "/admin"}
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

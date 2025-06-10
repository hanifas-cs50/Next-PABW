"use client";

import { useState } from "react";
import Image from "next/image";
import {
  format,
  formatDistanceToNow,
  isThisWeek,
  isToday,
  parseISO,
} from "date-fns";
import { usePosts } from "@/lib/context/PostContext";

export default function UserPost({ postData, stranger, index }) {
  const { delete_post } = usePosts();
  const [smallMenu, setSmallMenu] = useState(false);
  const [expand, setExpand] = useState(false);

  const postDate = new Date(`${postData.created_at.replace(" ", "T")}Z`);
  
  const dateText = isToday(postDate)
    ? format(postDate, "h:mm a")
    : isThisWeek(postDate)
    ? formatDistanceToNow(postDate, { addSuffix: true })
    : format(postDate, "MMM d, yyyy");
  // Outputs: "2:30 PM" (today), "2 days ago" (this week), "Oct 28, 2023" (older)

  return (
    <article className="max-w-xl w-full mx-auto p-4 flex flex-col justify-between rounded bg-white shadow-md hover:shadow-lg">
      <header className="relative mb-2 pr-2 flex justify-between items-center">
        <p className="font-medium text-sm text-zinc-700">
          <span className="font-semibold text-base">{postData.username}</span>{" "}
          &bull; {dateText}
        </p>

        {!stranger && (
          <button
            className="cursor-pointer"
            type="button"
            onClick={() => setSmallMenu(!smallMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeWidth="4"
                d="M5 12h.01M12 12h.01M19 12h.01"
              />
            </svg>
          </button>
        )}
        {smallMenu && (
          <div className="absolute top-0 right-0 mt-8 p-1 rounded bg-white">
            <button
              className="px-4 py-2 font-semibold text-red-500/90 rounded hover:bg-zinc-200 cursor-pointer"
              type="button"
              onClick={async () => await delete_post(postData.id)}
            >
              Delete Post
            </button>
          </div>
        )}
      </header>

      {!!postData.pic_url && (
        <Image
          className="w-full mb-4 rounded"
          src={`/uploads/${postData.pic_url}`}
          width={500}
          height={500}
          quality={80}
          priority={index < 3}
          alt="Post pic"
        />
      )}

      <div className="prose prose-invert max-w-none">
        <p className="leading-relaxed">
          {postData.content.length > 120 ? (
            expand ? (
              postData.content
            ) : (
              <>
                {postData.content.slice(0, 120)}&hellip;{" "}
                <span
                  className="inline-block text-sm text-blue-500/90 cursor-pointer"
                  onClick={() => setExpand(true)}
                >
                  Read more
                </span>
              </>
            )
          ) : (
            postData.content
          )}
        </p>
      </div>
    </article>
  );
}

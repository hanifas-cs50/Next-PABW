"use client";

import { useEffect } from "react";
import { usePosts } from "@/lib/context/PostContext";
import UserPost from "../user/UserPost";
import PostsSkeleton from "../skeleton/PostsSkeleton";

export default function StrangerPosts({ currUser, strangerUsername }) {
  const { posts, isLoading, loadError, load_posts } = usePosts();

  useEffect(() => {
    load_posts(strangerUsername.id);
  }, []);

  if (isLoading) {
    return <PostsSkeleton />;
  }

  if (loadError !== "") {
    return (
      <div className="flex-grow flex flex-col mx-auto py-4">
        <h2 className="mb-2 text-xl font-semibold">Load post error</h2>
        <button
          className="px-4 py-2 rounded-xl bg-blue-500/80 hover:bg-blue-500"
          type="button"
          onClick={() => load_posts(strangerUsername.id)}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <>
      <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
        <div
          className="pr-2 pb-2 grid gap-4 overflow-auto custom-scroll"
          style={{ maxHeight: "calc(100vh - 9rem)" }}
        >
          {posts.map((post) => (
            <UserPost
              key={post.id}
              postData={post}
              stranger={currUser.username !== strangerUsername.username}
            />
          ))}
        </div>
      </main>
    </>
  );
}

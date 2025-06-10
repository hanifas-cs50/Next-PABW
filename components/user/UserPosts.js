"use client";

import { useEffect } from "react";
import { usePosts } from "@/lib/context/PostContext";
import UserPost from "./UserPost";
import PostsSkeleton from "../skeleton/PostsSkeleton";

export default function UserPosts({ currUser }) {
  const { posts, isLoading, loadError, load_posts } = usePosts();

  async function fetchData() {
    await load_posts(currUser.user_id);
  }
  
  useEffect(() => {
    fetchData();
  }, [currUser]);

  if (!Array.isArray(posts) || isLoading) {
    return <PostsSkeleton />;
  }

  if (loadError !== "") {
    return (
      <div className="flex-grow flex flex-col mx-auto py-4 font-semibold">
        <h2 className="mb-2 text-xl">Load post error</h2>
        <button
          className="px-4 py-2 text-white rounded bg-blue-500/80 hover:bg-blue-500"
          type="button"
          onClick={fetchData}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
      <div
        className="pr-2 pb-2 grid gap-4 overflow-auto custom-scroll"
        style={{ maxHeight: "calc(100vh - 9rem)" }}
      >
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <UserPost key={post.id} postData={post} index={index} />
          ))
        ) : (
          <p className="font-medium text-center">No posts yet...</p>
        )}
      </div>
    </main>
  );
}

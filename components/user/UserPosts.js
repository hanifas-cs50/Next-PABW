"use client";

import { useEffect } from "react";
import { usePosts } from "@/lib/context/PostContext";
import UserPost from "./UserPost";

export default function UserPosts({ currUser }) {
  const { posts, isLoading, loadError, loadPosts } = usePosts();

  useEffect(() => {
    loadPosts(currUser.user_id);
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (loadError)
    return (
      <div>
        <p>Error loading posts.</p>
        <button onClick={loadPosts(currUser.user_id)}>Reload</button>
      </div>
    );

  return (
    <main>
      {posts.map((post) => (
        <UserPost key={post.id} post={post} />
      ))}
    </main>
  );
}

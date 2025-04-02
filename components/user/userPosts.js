"use client";

import { useState } from "react";
import Post from "./post";
import AddPost from "./addPost";
import { addPost, deletePost } from "@/actions/postActions";

export default function UserPosts({ user, posts }) {
  const [postItems, setPostItems] = useState([...posts]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async (userId, content) => {
    try {
      setError(null);
      setIsLoading(true);

      if (!content.trim()) {
        throw new Error("Post content cannot be empty");
      }

    const id = (postItems.at(0)?.id || 0) + 1;
    const createdAtUTC = new Date()
      .toISOString()
      .replace("T", " ")
      .slice(0, 19);

      const result = await addPost(userId, content.trim());
      
      if (!result.success) {
        throw new Error("Failed to create post. Please try again.");
      }

    setPostItems((prev) => [
      { id: id, userId, content: content.trim(), createdAt: createdAtUTC },
      ...prev,
    ]);
    } catch (err) {
      setError(err.message);
      console.error("Error creating post:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const removePost = async (id) => {
    try {
      setError(null);
      
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      setIsLoading(true);
      const result = await deletePost(id);
      
      if (!result.success) {
        throw new Error("Failed to delete post. Please try again.");
      }

      setPostItems((prev) => prev.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting post:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {postItems.map((post) => (
          <Post key={post.id} post={post} removePost={removePost} />
        ))}
      </div>

      <div className="border-t">
        <AddPost userId={user.id} createPost={createPost} isLoading={isLoading} />
      </div>
    </div>
  );
}

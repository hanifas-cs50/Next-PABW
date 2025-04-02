"use client";

import { useState } from "react";
import { deletePost } from "@/actions/postActions";
import Link from "next/link";

export default function PostsTable({ posts }) {
  const [postItems, setPostItems] = useState([...posts]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const removePost = async (id) => {
    try {
      setError(null);
      setSuccess(null);
      
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      setDeletingId(id);
      setIsLoading(true);
      const result = await deletePost(id);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to delete post. Please try again.");
      }

      setPostItems((prev) => prev.filter((post) => post.id !== id));
      setSuccess("Post deleted successfully");
    } catch (err) {
      setError(err.message);
      console.error("Error deleting post:", err);
    } finally {
      setIsLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Posts Table</h1>
      
      {error && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 text-sm text-green-500 bg-green-100 border border-green-400 rounded flex items-center justify-between">
          <span>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess(null)}
            className="text-green-500 hover:text-green-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border">No.</th>
              <th className="py-3 px-4 border">Post Content</th>
              <th className="py-3 px-4 border">Username</th>
              <th className="py-3 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postItems.length > 0 ? (
              postItems.map((post, index) => (
                <tr
                  key={post.id}
                  className="border hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4 border text-center">{index + 1}</td>
                  <td className="py-3 px-4 border">{post.content}</td>
                  <td className="py-3 px-4 border">{post.username}</td>
                  <td className="py-3 px-4 border text-center">
                    <Link href={`/admin/posts/${post.id}`}>
                      <button className="text-blue-600 hover:underline cursor-pointer disabled:opacity-50">
                        View
                      </button>
                    </Link>
                    <button 
                      onClick={() => removePost(post.id)} 
                      disabled={isLoading}
                      className={`ml-4 text-red-600 hover:underline cursor-pointer disabled:opacity-50 flex items-center gap-1 ${
                        deletingId === post.id ? 'animate-pulse' : ''
                      }`}
                    >
                      {deletingId === post.id ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /*
    <button className="text-blue-600 hover:underline">
      Edit
    </button>
  */
}

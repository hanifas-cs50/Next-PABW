"use client";

import { deletePost } from "@/zzz_actions/postActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SinglePost({ post }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete(postId) {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }

      setError("");
      setIsLoading(true);

      const result = await deletePost(postId);

      if (!result.success) {
        throw new Error("Failed to delete post. Please try again.");
      }

      // Router redirection after success
      router.push("/admin/posts");
    } catch (err) {
      setError(err.message);
      console.error("Error deleting post:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm border">
        {error && (
          <div
            className="bg-red-100 text-red-700 px-4 py-3 rounded-t relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
              onClick={() => setError(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}

        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Post Detail</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  disabled
                  value={post.username}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm disabled:cursor-not-allowed disabled:opacity-75"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <h5 className="text-sm font-medium text-gray-700">
                Content
              </h5>
              <div className="relative">
                <pre className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm cursor-not-allowed opacity-75">
                  {post.content}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleDelete(post.id)}
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 px-4 py-2 rounded-b-sm text-white bg-red-500/80 hover:bg-red-500/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

// import { updateUserRole } from "@/actions/adminActions";
// const [currentUser, setCurrentUser] = useState(post); // Manage user state

// async function handleSubmit(event) {
//   event.preventDefault();
//   setIsLoading(true);
//   setError("");
//   setSuccess("");

//   try {
//     const formData = new FormData(event.currentTarget);
//     const newRole = formData.get("newRole");

//     const result = await updateUserRole(user.id, newRole);

//     if (!result.success) {
//       throw new Error(result.error || "Failed to update user role");
//     }

//     setSuccess("User role updated successfully");
//   } catch (err) {
//     setError(err.message);
//     console.error("Role update error:", err);
//   } finally {
//     setIsLoading(false);
//   }
// }
// onSubmit={handleSubmit}

{
  /* <div className="p-6 space-y-6 border-t">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-100 border border-green-400 rounded">
              {success}
            </div>
          )}

          <div className="grid gap-2">
            <label
              htmlFor="newRole"
              className="text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <div className="relative">
              <select
                id="newRole"
                name="newRole"
                value={currentUser.role}
                onChange={(event) =>
                  setCurrentUser({ ...currentUser, role: event.target.value })
                }
                disabled={isLoading}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-75 appearance-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div> */
}

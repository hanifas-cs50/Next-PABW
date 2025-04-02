"use client";

import { useState } from "react";
import { updateUserRole } from "@/actions/adminActions";

export default function SingleUser({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentUser, setCurrentUser] = useState(user);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(event.currentTarget);
      const newRole = formData.get("newRole");

      if (newRole === currentUser.role) {
        throw new Error("No changes detected");
      }

      const result = await updateUserRole(user.id, newRole);

      if (!result.success) {
        throw new Error(result.error || "Failed to update user role");
      }

      setSuccess("User role updated successfully");
      setCurrentUser({ ...currentUser, role: newRole });
    } catch (err) {
      setError(err.message);
      console.error("Role update error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const hasChanges = currentUser.role !== user.role;

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-sm border"
      >
        <div className="px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
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
                  value={user.username}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm disabled:cursor-not-allowed disabled:opacity-75"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm disabled:cursor-not-allowed disabled:opacity-75"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 border-t">
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded flex items-center justify-between">
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setError("")}
                className="text-red-500 hover:text-red-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-100 border border-green-400 rounded flex items-center justify-between">
              <span>{success}</span>
              <button
                type="button"
                onClick={() => setSuccess("")}
                className="text-green-500 hover:text-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
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
        </div>

        <div className="px-6 py-4 border-t">
          <button
            type="submit"
            disabled={isLoading || !hasChanges}
            className="w-full px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : hasChanges ? (
              "Update Role"
            ) : (
              "No Changes"
            )}
          </button>
      </div>
      </form>
    </div>
  );
}

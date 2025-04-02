"use client";

import { useState } from "react";
import { changePassword } from "@/actions/userActions";

export default function UserSettings({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData(event.currentTarget);
      const oldPassword = formData.get("oldPassword");
      const newPassword = formData.get("newPassword");
      const confirmNewPassword = formData.get("confirmNewPassword");

      // Validate all fields are filled
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        throw new Error("Please fill in all fields");
      }

      // Validate new password
      if (newPassword.length < 6) {
        throw new Error("New password must be at least 6 characters long");
      }

      // Check if new password is same as old password
      if (oldPassword === newPassword) {
        throw new Error("New password must be different from current password");
      }

      // Validate password confirmation
      if (newPassword !== confirmNewPassword) {
        throw new Error("New passwords do not match");
      }

      const result = await changePassword(user.id, oldPassword, newPassword);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to change password. Please try again.");
      }

      setSuccess("Password changed successfully!");
      event.target.reset();
    } catch (err) {
      setError(err.message);
      console.error("Password change error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full p-4 flex flex-col gap-4 border-t"
    >
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
      <div className="grid gap-1">
        <label htmlFor="oldPassword">Current Password:</label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          required
          disabled={isLoading}
          autoComplete="current-password"
          className="p-1 outline-0 border-2 border-zinc-500 focus:border-black rounded disabled:bg-gray-100"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="newPassword">New Password:</label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          disabled={isLoading}
          autoComplete="new-password"
          placeholder="minimum 6 characters"
          className="p-1 outline-0 border-2 border-zinc-500 focus:border-black rounded disabled:bg-gray-100"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          id="confirmNewPassword"
          name="confirmNewPassword"
          type="password"
          required
          disabled={isLoading}
          autoComplete="new-password"
          className="p-1 outline-0 border-2 border-zinc-500 focus:border-black rounded disabled:bg-gray-100"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 rounded-sm text-white bg-blue-500/80 hover:bg-blue-500/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Changing Password..." : "Change Password"}
      </button>
    </form>
  );
}

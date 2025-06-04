"use client";

import { useState } from "react";
import { changePassword } from "@/lib/action/userActions";

export default function UserSettings({ signedUser }) {
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

      const result = await changePassword(signedUser.user_id, oldPassword, newPassword);
      
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
    <div className="flex-grow max-w-screen-lg w-full py-4 md:py-8 overflow-hidden">
      <UserChangePass
        user_data={{ user_id: userData.user_id, password: userData.password }}
      />

      <UserChangeUser
        user_data={{ user_id: userData.user_id, username: userData.username }}
      />

      <UserChangeEmail
        user_data={{ user_id: userData.user_id, email: userData.email }}
      />

      <UserDeleteAcc
        user_data={{ user_id: userData.user_id, password: userData.password }}
      />
    </div>
  );
}

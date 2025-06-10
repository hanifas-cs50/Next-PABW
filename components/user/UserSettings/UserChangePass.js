"use client";

import { changePassword } from "@/lib/action/UserActions";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";

export default function UserChangePass({ user_data }) {
  const formRef = useRef(null);
  const { user_id, password } = user_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const currPassword = formData.get("curr-password");
    const newPassword = formData.get("new-password");
    const confirmNewPassword = formData.get("confirm-new-password");
    const isValid = compare(currPassword, password);

    try {
      if (!isValid) {
        throw new Error("Current password is invalid");
      }
      if (newPassword === currPassword) {
        throw new Error("Password did not change");
      }
      if (confirmNewPassword !== newPassword) {
        throw new Error(
          "New password is not the same as the confirmed password"
        );
      }

      await changePassword({ userId: user_id, currPassword, newPassword });
      signOut();
      // console.log("New Password: ", newPassword);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-4 space-y-2 rounded bg-white"
    >
      <p className="block font-semibold">Change Password</p>
      <input
        className="w-full p-3 text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="password"
        name="curr-password"
        id="curr-password"
        placeholder="Type your current password..."
        required
      />
      <input
        className="w-full p-3 text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="password"
        name="new-password"
        id="new-password"
        placeholder="Type your new password..."
        required
      />
      <input
        className="w-full p-3 text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="password"
        name="confirm-new-password"
        id="confirm-new-password"
        placeholder="Retype your new password..."
        required
      />
      <button
        className="w-full py-3 font-medium text-sm text-white rounded bg-blue-500/80 hover:bg-blue-500 disabled:bg-zinc-500"
        type="submit"
        disabled={loading}
      >
        Change Password
      </button>

      {error && (
        <div className="w-full px-4 py-3 font-medium text-sm text-white rounded bg-red-400">
          {error}
          <button
            className="float-right cursor-pointer"
            type="button"
            onClick={() => setError("")}
          >
            &#10006;
          </button>
        </div>
      )}
    </form>
  );
}

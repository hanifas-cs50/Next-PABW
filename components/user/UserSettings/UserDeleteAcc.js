"use client";

import { deleteUser } from "@/lib/action/UserActions";
import { compare } from "bcryptjs";
import { useRef, useState } from "react";

export default function UserDeleteAcc({ user_data }) {
  const formRef = useRef(null);
  const { user_id, password } = user_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const confirmPassword = formData.get("confirm-password");
    const isValid = compare(confirmPassword, password);

    try {
      if (!isValid) {
        throw new Error("Wrong password");
      }

      await deleteUser({ userId: user_id, currentPassword: confirmPassword });
      // console.log("Confirm Password: ", confirmPassword);
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
      <label className="block mb-2 font-semibold" htmlFor="confirm-password">
        Delete Account
      </label>
      <input
        className="w-full p-3 text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="password"
        name="confirm-password"
        id="confirm-password"
        placeholder="Type your current password..."
      />
      <button
        className="w-full py-3 font-medium text-sm text-white rounded bg-red-500/80 hover:bg-red-500 disabled:bg-zinc-500"
        type="submit"
        disabled={loading}
      >
        Delete account
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

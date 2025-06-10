"use client";

import { useRef, useState } from "react";
import { changeUsername } from "@/lib/action/UserActions";
import { signOut } from "next-auth/react";

export default function UserChangeUser({ user_data }) {
  const formRef = useRef(null);
  const { user_id, username } = user_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get("change-username");

    try {
      if (newUsername === username) {
        throw new Error("username did not change");
      }

      const response = await changeUsername({ userId: user_id, newUsername });      
      if (response?.success) {
        await signOut();
      }
      // console.log("User_ID: ", user_id);
    } catch (error) {
      // console.log(`Error changing username: ${error.message}`)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="p-4 space-y-2 rounded bg-white"
    >
      <label className="block font-semibold" htmlFor="change-username">
        Change Username
      </label>
      <input
        className="w-full p-3 font-medium text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="text"
        name="change-username"
        id="change-username"
        defaultValue={username}
        placeholder="Type your new username..."
        required
      />
      <div className="flex gap-2">
        <button
          className="w-full py-3 font-medium text-sm text-white rounded bg-blue-500/80 hover:bg-blue-500 disabled:bg-zinc-500"
          type="submit"
          disabled={loading}
        >
          {loading ? "Changing Username..." :"Change Username"}
        </button>
        <button
          className="w-full py-3 font-medium text-sm text-white rounded bg-red-500/80 hover:bg-red-500 disabled:bg-zinc-500 cursor-pointer"
          type="button"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
      </div>

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

"use client";

import { useRef, useState } from "react";
import { changeEmail } from "@/lib/action/UserActions";

export default function UserChangeEmail({ user_data }) {
  const formRef = useRef(null);
  const { user_id, email } = user_data;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const newEmail = formData.get("change-email");

    try {
      if (newEmail === email) {
        throw new Error("Email did not change");
      }
      
      const response = await changeEmail({ userId: user_id, newEmail });      
      if (response?.success) {
        await signOut();
      }
      // console.log("New Email: ", newEmail);
    } catch (error) {
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
      <label className="block mb-2 font-semibold" htmlFor="change-email">
        Change Email
      </label>
      <input
        className="w-full p-3 font-medium text-sm rounded bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors"
        type="email"
        name="change-email"
        id="change-email"
        defaultValue={email}
        placeholder="Type your new email..."
        required
      />
      <div className="flex gap-2">
        <button
          className="w-full py-3 font-medium text-sm text-white rounded bg-blue-500/80 hover:bg-blue-500 disabled:bg-zinc-500"
          type="submit"
          disabled={loading}
        >
          Change Email
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

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { editRole } from "@/lib/action/AdminActions";

export default function AdminUser({ userData }) {
  const router = useRouter();
  const selectRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (user_id) => {
    setIsLoading(true);
    setError("");

    const selectData = selectRef.current.value;

    try {
      await editRole({ user_id, new_role: selectData });
      router.push("/admin/users");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
      <div className="flex flex-col gap-6 justify-between p-6 rounded-lg bg-white">
        <div className="space-y-4 *:font-medium">
          <p>
            Username: <span className="block w-full">{userData.username}</span>
          </p>
          <p>
            Email: <span className="block w-full">{userData.email}</span>
          </p>
          <p>
            Created At:{" "}
            <span className="block w-full">{userData.created_at}</span>
          </p>
          <div className="relative">
            <label htmlFor="roleSelect">Role:</label>
            <select
              className="block w-full p-2 rounded bg-zinc-200 appearance-none cursor-pointer"
              id="roleSelect"
              name="roleSelect"
              defaultValue={userData.role}
              ref={selectRef}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>

            <div className="pointer-events-none absolute bottom-0.5 right-2 flex items-center text-3xl">
              &#9662;
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          {error && (
            <div className="px-6 py-4 text-white rounded bg-red-500/90">
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
          <button
            className="w-full py-4 font-medium text-white rounded bg-blue-500/90 hover:bg-blue-500 disabled:bg-zinc-500"
            onClick={() => handleSubmit(userData.id)}
            disabled={isLoading}
          >
            Update
          </button>
          <Link
            className="w-full py-4 font-medium text-center text-white rounded bg-zinc-500/90 hover:bg-zinc-500"
            href={isLoading ? "#" : "/admin/users"}
          >
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}

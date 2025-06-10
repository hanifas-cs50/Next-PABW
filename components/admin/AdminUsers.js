"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "./AdminPosts/Pagination";
import { loadUsers, deleteUser } from "@/lib/action/AdminActions";

export default function AdminUsers({ currentPage, totalPages, usersPerPage }) {
  const offset = (currentPage - 1) * usersPerPage;

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await loadUsers({ offset, usersPerPage });
        setUsers(result);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [offset, usersPerPage]);

  const handleDelete = async (user_id) => {
    setDeletingId(user_id);
    setDeleteError("");

    try {
      await deleteUser({ user_id });
      setUsers((prev) => prev.filter((user) => user.id !== user_id));
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) return <p className="mx-auto pt-6">Loading...</p>;
  if (loadError) return <p className="mx-auto pt-6">{loadError}</p>;

  return (
    <>
      <main className="flex-grow max-w-screen-lg w-full mx-auto py-2">
        {deleteError && (
          <div className="mb-4 p-4 text-white rounded bg-red-500/90">
            {deleteError}
            <button
              className="float-right cursor-pointer"
              type="button"
              onClick={() => setDeleteError("")}
            >
              &#10006;
            </button>
          </div>
        )}
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr>
              <th className="w-14 border p-2">No.</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr className="h-1" key={user.id}>
                <td className="text-center border p-2">
                  {offset + index + 1}.
                </td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">{user.created_at}</td>
                <td className="w-20 border p-0" style={{ height: "inherit" }}>
                  <Link
                    className={`w-full h-full grid place-content-center font-medium text-white ${
                      deletingId === user.id
                        ? "bg-zinc-500"
                        : "bg-blue-500/90 hover:bg-blue-500"
                    } cursor-pointer`}
                    href={
                      deletingId === user.id ? "#" : `/admin/users/${user.id}`
                    }
                  >
                    Update
                  </Link>
                </td>
                <td className="w-20 border p-0" style={{ height: "inherit" }}>
                  <button
                    className="w-full h-full grid place-content-center font-medium text-white bg-red-500/90 hover:bg-red-500 disabled:bg-zinc-500 cursor-pointer"
                    type="button"
                    onClick={() => handleDelete(user.id)}
                    disabled={deletingId === user.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

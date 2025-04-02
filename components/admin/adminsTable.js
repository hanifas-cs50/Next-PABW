"use client";

import { useState } from "react";

export default function AdminsTable({ admins }) {
  const [adminItems, setAdminItems] = useState([...admins]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admins Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 border">No.</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Username</th>
            </tr>
          </thead>
          <tbody>
            {adminItems.length > 0 ? (
              adminItems.map((admin, index) => (
                <tr
                  key={admin.id}
                  className="border hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4 border text-center">{index + 1}</td>
                  <td className="py-3 px-4 border">{admin.email}</td>
                  <td className="py-3 px-4 border">{admin.username}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /* <th className="py-3 px-4 border">Admin ID</th> */
}
{
  /* <th className="py-3 px-4 border">Actions</th> */
}
{
  /* <td className="py-3 px-4 border text-center">{admin.id}</td> */
}
{
  /*
    <td className="py-3 px-4 border text-center">
      <button className="text-blue-600 hover:underline cursor-pointer">
        View
      </button>
      
      <button className="ml-4 text-red-600 hover:underline cursor-pointer">
        Delete
      </button>
    </td>
  */
}

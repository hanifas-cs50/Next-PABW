"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminNavbar({ user, settings }) {
  const [drop, setDrop] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/admin") {
      return pathname === path;
    } else if (path === "/admin/posts") {
      return pathname === path;
    } else if (path === "/admin/admins") {
      return pathname === path;
    }
  };

  return (
    <nav className="w-full max-h-14 h-full grid grid-cols-3 items-center border-b-2 z-50">
      <div className="px-2 flex justify-start gap-2">
        <Link href={{ pathname: "/admin" }}>
          <button 
            className={`px-3 py-2 text-left font-medium rounded-md transition-colors duration-150 cursor-pointer ${
              isActive("/admin")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Users
          </button>
        </Link>
        <Link href={{ pathname: "/admin/posts" }}>
          <button 
            className={`px-3 py-2 text-left font-medium rounded-md transition-colors duration-150 cursor-pointer ${
              isActive("/admin/posts")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Posts
          </button>
        </Link>

        <Link href={{ pathname: "/admin/admins" }}>
          <button 
            className={`px-3 py-2 text-left font-medium rounded-md transition-colors duration-150 cursor-pointer ${
              isActive("/admin/admins")
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Admins
          </button>
        </Link>
      </div>

      <h1 className="px-4 font-bold text-center text-lg">Posty</h1>

      <div className="relative h-full flex justify-end">
        <button
          onClick={() => setDrop(!drop)}
          className="h-full w-13 grid place-items-center hover:text-white hover:bg-black rounded-l-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {drop ? (
          <div className="absolute top-14 right-0 mr-1 mt-1 w-64 grid rounded-lg border-2 bg-white">
            <div className="px-6 pt-4 pb-1">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Signed in as
              </p>
              <p className="font-medium truncate">{user?.email}</p>
              <p className="text-sm text-gray-500 truncate">
                /{user?.username}
              </p>
            </div>

            <div className="p-2">
              {settings ? (
                <Link href={{ pathname: "/home/profile" }} className="block">
                  <button className="w-full px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      Home
                    </div>
                  </button>
                </Link>
              ) : (
                <Link href={{ pathname: "/home/settings" }} className="block">
                  <button className="w-full px-3 py-2 text-left font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Settings
                    </div>
                  </button>
                </Link>
              )}
            </div>

            <div className="p-2 border-t">
              <button
                onClick={() => signOut()}
                className="w-full px-3 py-2 text-left font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors duration-150 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Sign out
                </div>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

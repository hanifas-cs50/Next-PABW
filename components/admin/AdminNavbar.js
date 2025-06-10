"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminNavbar({ currUser }) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className="h-14 max-w-screen-lg w-full mx-auto pl-3 pr-6 flex justify-between items-center rounded bg-white shadow-md z-50"
      onMouseDown={(e) => handleClickOutside(e.nativeEvent)}
    >
      <div className="relative px-3 py-2 rounded bg-zinc-200" ref={dropdownRef}>
        <button
          className="flex items-center font-semibold cursor-pointer"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currUser.username}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`size-6 ml-2 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-0 w-full mt-5 p-2 space-y-2 font-medium rounded bg-white">
            {/*
            <Link
              className="block w-full px-3 py-2 rounded bg-zinc-200 hover:bg-zinc-300/80"
              href="/admin/settings"
            >
              Settings
            </Link>
            */}
            <button
              className="w-full px-3 py-2 text-start rounded bg-red-500/80 hover:bg-red-500 cursor-pointer"
              type="button"
              onClick={signOut}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="space-x-4">
        <Link
          className="mt-1 font-medium inline-block border-b-2 border-transparent hover:border-black transition-all duration-300"
          href="/admin"
        >
          Posts
        </Link>
        <Link
          className="mt-1 font-medium inline-block border-b-2 border-transparent hover:border-black transition-all duration-300"
          href="/admin/users"
        >
          Users
        </Link>
      </div>
    </nav>
  );
}

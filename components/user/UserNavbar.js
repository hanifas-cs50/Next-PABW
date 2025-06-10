"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import UserAddPost from "./UserAddPost";
import { signOut } from "next-auth/react";

export default function UserNavbar({ currUser, strangerUsername, settings }) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [addState, setAddState] = useState(false);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className="h-14 max-w-screen-lg w-full mx-auto pl-3 pr-6 flex justify-between items-center rounded bg-white shadow-md z-50"
        onMouseDown={(e) => handleClickOutside(e.nativeEvent)}
      >
        {strangerUsername ? (
          <>
            <div className="pl-2 font-semibold">
              {strangerUsername.username}&apos;s Page
            </div>
            <Link
              className="mt-1 font-medium border-b-2 border-transparent hover:border-black transition-all duration-300"
              href="/user"
            >
              Go Home
            </Link>
          </>
        ) : (
          <>
            <div
              className="relative px-3 py-2 rounded bg-zinc-200"
              ref={dropdownRef}
            >
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

            <div className="flex gap-4 items-center">
              {settings ? (
                <Link
                  className="mt-1 font-medium border-b-2 border-transparent hover:border-black transition-all duration-300"
                  href="/user"
                >
                  Home
                </Link>
              ) : (
                <>
                  <button
                    className={`px-4 py-2 font-medium rounded ${
                      addState
                        ? "bg-red-500/80 hover:bg-red-500"
                        : "bg-blue-500/80 hover:bg-blue-500"
                    } transition-all duration-300 cursor-pointer`}
                    type="button"
                    onClick={() => setAddState(!addState)}
                  >
                    {addState ? "Cancel" : "Post +"}
                  </button>
                  <Link
                    className="mt-1 font-medium border-b-2 border-transparent hover:border-black transition-all duration-300"
                    href="/user/settings"
                  >
                    Settings
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </nav>

      {addState && (
        <UserAddPost currUser={currUser} setAddState={setAddState} />
      )}
    </>
  );
}

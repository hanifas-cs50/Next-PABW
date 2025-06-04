"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserNavbar({ currUser, stranger, settings }) {
  const [drop, setDrop] = useState(false);

  return (
    <nav className="w-full grid grid-cols-3 items-center border-b">
      <div>
        {stranger ? (
          <>
            <Link href="/user">
              <button>
                &larr;
              </button>
            </Link>
            <span>{stranger?.username}</span>
          </>
        ) : (
          <span>{currUser?.username}</span>
        )}
      </div>

      <h1>Posty</h1>

      <div className="relative">
        <button onClick={() => setDrop(!drop)}>
          &#9776;
        </button>

        {drop && (
          <div className="absolute top-full right-0 bg-white border">
            <div>
              <p>{currUser?.email}</p>
              <p>/{currUser?.username}</p>
            </div>

            <div>
              <Link href={settings ? "/user" : "/user/settings"}>
                <button>
                  {settings ? "Home" : "Settings"}
                </button>
              </Link>
            </div>

            <div>
              <button onClick={() => signOut()}>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

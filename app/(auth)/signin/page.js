"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username");
      const password = formData.get("password");

      if (!username || !password) {
        throw new Error("Please fill in all fields");
      }

      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (!result?.ok) {
        throw new Error("Invalid username or password");
      }

      router.refresh();
    } catch (err) {
      setError(err.message);
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center p-24">
      <div className="max-w-sm w-full p-6 rounded-lg bg-white shadow">
        <h1 className="mb-4 text-center text-3xl font-bold">Sign in</h1>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <form className="w-full grid gap-3" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="username"
              autoComplete="username"
              autoFocus={true}
              required
              disabled={isLoading}
              className="w-full px-2 py-1 mt-1 outline-0 border-2 border-zinc-500/80 focus:border-blue-500 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              className="w-full px-2 py-1 mt-1 outline-0 border-2 border-zinc-500/80 focus:border-blue-500 rounded disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 rounded-sm text-white bg-blue-500/80 hover:bg-blue-500/90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <Link href="/">
            <button 
              className="w-full px-4 py-2 rounded-sm text-white bg-zinc-500/80 hover:bg-zinc-500/90 cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              Back
            </button>
          </Link>
        </form>
      </div>

      <div className="max-w-sm w-full px-4 py-2 bg-white rounded-lg">
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

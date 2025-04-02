"use client";

import Link from "next/link";
import { useState } from "react";
import { signUp } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      const username = formData.get("username");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      // Validate all fields are filled
      if (
        !email?.trim() ||
        !username?.trim() ||
        !password ||
        !confirmPassword
      ) {
        throw new Error("Please fill in all fields");
      }

      // Validate username format
      if (username.length < 5 && username.length > 21) {
        throw new Error("Username must be at least 5 and less than 21 characters long");
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error(
          "Username can only contain letters, numbers, and underscores"
        );
      }

      // Validate password
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // Validate password confirmation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const result = await signUp({
        username: username.trim(),
        email: email.trim(),
        password: password,
      });

      if (!result.success) {
        throw new Error(
          result.error || "Failed to create account. Please try again."
        );
      }

      router.push("/signin");
    } catch (err) {
      setError(err.message);
      console.error("Sign up error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 justify-center items-center p-24">
      <div className="max-w-sm w-full p-6 rounded-lg bg-white shadow">
        <h1 className="mb-4 text-center text-3xl font-bold">Sign up</h1>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <form className="w-full grid gap-3" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus={true}
              required
              disabled={isLoading}
              className="w-full px-2 py-1 mt-1 outline-0 border-2 border-zinc-500/80 focus:border-blue-500 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              disabled={isLoading}
              placeholder="letters, numbers, and underscores only"
              className="w-full px-2 py-1 mt-1 outline-0 border-2 border-zinc-500/80 focus:border-blue-500 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isLoading}
              placeholder="minimum 6 characters"
              className="w-full px-2 py-1 mt-1 outline-0 border-2 border-zinc-500/80 focus:border-blue-500 rounded disabled:bg-gray-100"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
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
            {isLoading ? "Creating account..." : "Create account"}
          </button>

          <Link href="/signin">
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
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { signUp } from "@/lib/action/UserActions";

export default function Signup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") || "").trim();
    const username = (formData.get("username") || "").trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      // Validate all fields are filled
      if (!email || !username || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      // Validate username format
      if (username.length < 5 && username.length > 20) {
        throw new Error(
          "Username must be atleast 5 and less than 20 characters long"
        );
      }

      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        throw new Error(
          "Username can only contain letters, numbers, and underscores"
        );
      }

      // Validate password
      if (password.length < 4) {
        throw new Error("Password must be at least 4 characters long");
      }

      // Validate password confirmation
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const result = await signUp({ username, email, password });

      if (result.error) {
        throw new Error(
          result.error || "Failed to create account. Please try again."
        );
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error("Failed to login");
      }

      // console.log(result);
      router.push("/user");
    } catch (err) {
      setError(err.message);
      // console.error("Sign up error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex flex-col justify-center items-center gap-4 bg-zinc-200">
      <form
        className="w-full max-w-sm grid gap-y-4 rounded bg-white mb-4 px-6 pt-6 pb-8"
        onSubmit={onSubmit}
      >
        <h1 className="text-center text-3xl font-bold">Posty Sign Up</h1>
        {error && (
          <div className="rounded border border-red-400 bg-red-100 p-3 text-sm font-medium text-red-500">
            {error}
          </div>
        )}
        <div className="grid gap-y-1">
          <label className="font-medium" htmlFor="username">
            Username:
          </label>
          <input
            className="rounded border-2 border-transparent bg-zinc-200 px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-zinc-500 focus:border-zinc-500"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-y-1">
          <label className="font-medium" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded border-2 border-transparent bg-zinc-200 px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-zinc-500 focus:border-zinc-500"
            type="email"
            name="email"
            id="email"
            autoComplete="off"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-y-1">
          <label className="font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded border-2 border-transparent bg-zinc-200 px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-zinc-500 focus:border-zinc-500"
            type="password"
            name="password"
            id="password"
            required
            disabled={isLoading}
          />
        </div>
        <div className="grid gap-y-1 mb-3">
          <label className="font-medium" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <input
            className="rounded border-2 border-transparent bg-zinc-200 px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-zinc-500 focus:border-zinc-500"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-y-2 font-semibold text-sm text-white">
        <button
            type="submit"
            className="py-3 rounded bg-blue-500/80 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </button>

          <Link
            className="py-3 text-center rounded bg-zinc-500/80 hover:bg-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            aria-disabled={isLoading}
            href={isLoading ? "#" : "/"}
          >
            Back
          </Link>
        </div>
      </form>

      <div className="w-full max-w-sm grid gap-y-4 font-medium rounded bg-white p-4">
        <p className="text-center">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-500/80 hover:text-blue-500 underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

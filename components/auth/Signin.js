"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      // console.log(result);

      if (!result?.ok) {
        throw new Error("Invalid email or password");
      }

      // console.log(result);
      router.push("/user");
    } catch (err) {
      setError(err.message);
      // console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 flex flex-col justify-center items-center gap-4 bg-zinc-200">
      <form
        className="w-full max-w-sm grid gap-y-4 rounded bg-white p-6"
        onSubmit={onSubmit}
      >
        <h1 className="text-center text-3xl font-bold">Posty Sign In</h1>
        {error && (
          <div className="rounded border border-red-400 bg-red-100 p-3 text-sm font-medium text-red-500">
            {error}
          </div>
        )}
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
        <div className="grid gap-y-1 mb-3">
          <label className="font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded border-2 border-transparent bg-zinc-200 px-3 py-2 text-sm outline-none transition-colors duration-300 hover:border-zinc-500 focus:border-zinc-500"
            type="password"
            name="password"
            id="password"
            autoComplete="off"
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
            {isLoading ? "Signing in..." : "Sign in"}
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
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-500/80 hover:text-blue-500 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

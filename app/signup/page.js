"use client";

import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { signUp } from "@/zzz_actions/auth";

export default function Page() {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      // Validate all fields are filled
      if (!email?.trim() || !username?.trim() || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      // Validate username format
      if (username.length < 5 && username.length > 21) {
        throw new Error("Username must be at least 6 and less than 21 characters long");
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

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!signInResult?.ok) {
        throw new Error("Invalid email or password");
      }

      console.log(result);
      // router.push("/user");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div>
      <h1>Posty Sign Up</h1>

      {error && <div>{error}</div>}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            autoFocus
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            autoFocus
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="off"
            required
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <Link href={isLoading ? "#" : "/"}>
          Back
        </Link>
      </form>
      <div>
        <p>
          Already have an account? <Link href={isLoading ? "#" : "/signin"}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

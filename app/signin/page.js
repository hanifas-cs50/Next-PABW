"use client";

import Link from "next/link";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Page() {
  // const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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

      if (!result?.ok) {
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
      <h1>Posty Sign In</h1>

      {error && <div>{error}</div>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <Link href={isLoading ? "#" : "/"}>
          Back
        </Link>
      </form>
      <div>
        <p>
          Don't have an account? <Link href={isLoading ? "#" : "/signup"}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

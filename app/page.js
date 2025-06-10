import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full p-4 flex flex-col justify-center items-center gap-4 bg-zinc-200">
      <h1 className="font-semibold text-xl">Hello World!!!</h1>
      <div className="flex gap-2">
        <Link
          className="w-24 py-2 text-center text-white rounded bg-blue-500/80 hover:bg-blue-500"
          href="/signin"
        >
          Login
        </Link>
        <Link
          className="w-24 py-2 text-center text-white rounded bg-blue-500/80 hover:bg-blue-500"
          href="/signup"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

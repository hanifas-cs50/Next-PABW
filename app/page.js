import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center p-24">
      <h1 className="text-4xl font-bold">Hello World!</h1>
      <div className="flex gap-4">
        <Link href="/signin">
          <button className="min-w-24 py-2 text-black/80 font-medium bg-blue-500/80 hover:bg-blue-500 rounded cursor-pointer">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="min-w-24 py-2 text-black/80 font-medium bg-blue-500/80 hover:bg-blue-500 rounded cursor-pointer">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
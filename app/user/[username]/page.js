import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getGuestUser } from "@/lib/action/UserActions";
import { PostProvider } from "@/lib/context/PostContext";
import UserNavbar from "@/components/user/UserNavbar";
import StrangerPosts from "@/components/stranger/StrangerPosts";

export default async function Page({ params }) {
  const { username } = await params;
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  if (session.user.role !== "user") redirect("/admin");

  const currUser = session && {
    user_id: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };
  const user = await getGuestUser({ username });

  if (!user) {
    return (
      <>
        <UserNavbar currUser={currUser} settings={true} />
        <div className="flex-grow flex flex-col items-center py-4 md:py-8">
          Not Found -\( ' ' )/-
          <Link
            className="mt-2 px-3 py-2 text-center text-white font-medium bg-blue-500/80 hover:bg-blue-500 rounded cursor-pointer"
            href="/user"
          >
            Back home
          </Link>
        </div>
      </>
    );
  }

  return (
    <PostProvider>
      <UserNavbar currUser={currUser} strangerUsername={user} />
      <StrangerPosts currUser={currUser} strangerUsername={user} />
    </PostProvider>
  );
}

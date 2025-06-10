import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { PostProvider } from "@/lib/context/PostContext";
import UserNavbar from "@/components/user/UserNavbar";
import UserPosts from "@/components/user/UserPosts";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");
  if (session.user.role !== "user") redirect("/admin");

  const currUser = session && {
    user_id: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };
  // console.log(currUser);

  return (
    <PostProvider>
      <UserNavbar currUser={currUser} />
      <UserPosts key={currUser.user_id} currUser={currUser} />
    </PostProvider>
  );
}

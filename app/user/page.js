import { PostProvider } from "@/lib/context/PostContext";
import UserNavbar from "@/components/user/UserNavbar";
import UserPosts from "@/components/user/UserPosts";

export default async function Page() {
  const currUser = await useUser();
  return (
    <PostProvider>
      <UserNavbar currUser={currUser} />
      <UserPosts currUser={currUser} />
    </PostProvider>
  );
}

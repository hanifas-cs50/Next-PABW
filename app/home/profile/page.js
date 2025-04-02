import UserPosts from "@/components/user/userPosts";
import UserNavbar from "@/components/user/navbar";
import { getPosts } from "@/actions/postActions";
import { getCurrentUser } from "@/actions/auth";

export default async function UserHome() {
  const user = await getCurrentUser();
  const posts = await getPosts(user.id);

  return (
    <div className="max-w-5xl h-screen mx-auto bg-white">
      <div className="flex flex-col h-full">
        <UserNavbar user={user} />
        <div className="flex-1 min-h-0">
          <UserPosts user={user} posts={posts} />
        </div>
      </div>
    </div>
  );
}

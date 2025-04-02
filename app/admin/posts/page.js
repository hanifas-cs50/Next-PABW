import { getAllPosts } from "@/actions/adminActions";
import { getCurrentUser } from "@/actions/auth";
import AdminNavbar from "@/components/admin/navbar";
import PostsTable from "@/components/admin/postsTable";

export default async function AdminPostsDash() {
  const user = await getCurrentUser();
  const posts = await getAllPosts();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <AdminNavbar user={user} />
        <PostsTable posts={posts} />
      </div>
    </div>
  );
}

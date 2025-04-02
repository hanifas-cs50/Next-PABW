import { getCurrentUser } from "@/actions/auth";
import AdminNavbar from "@/components/admin/navbar";
import SinglePost from "@/components/admin/singlePost";
import { getPost } from "@/actions/adminActions";

export default async function PostDetail({ params }) {
  const { postid } = await params;
  const post = await getPost(postid);

  const signedUser = await getCurrentUser();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <AdminNavbar user={signedUser} />
        <SinglePost post={post} />
      </div>
    </div>
  );
}

import { getPost } from "@/lib/action/AdminActions";
import AdminPost from "@/components/admin/AdminPost";

export default async function Page({ params }) {
  const { post_id } = await params;
  const postData = await getPost({ post_id });

  return <AdminPost postData={postData} />;
}

import AdminPosts from "@/components/admin/AdminPosts";
import { totalPostsCount } from "@/lib/action/AdminActions";

const POSTS_PER_PAGE = 12;

export default async function Page({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const totalPosts = await totalPostsCount();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <AdminPosts
      currentPage={currentPage}
      totalPages={totalPages}
      postsPerPage={POSTS_PER_PAGE}
    />
  );
}

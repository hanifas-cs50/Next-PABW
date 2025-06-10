import AdminUsers from "@/components/admin/AdminUsers";
import { totalUsersCount } from "@/lib/action/AdminActions";

const USERS_PER_PAGE = 10;

export default async function Page({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const totalPosts = await totalUsersCount();
  const totalPages = Math.ceil(totalPosts / USERS_PER_PAGE);

  return (
    <AdminUsers
      currentPage={currentPage}
      totalPages={totalPages}
      usersPerPage={USERS_PER_PAGE}
    />
  );
}

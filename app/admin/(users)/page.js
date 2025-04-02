import { getUsers } from "@/actions/adminActions";
import { getCurrentUser } from "@/actions/auth";
import UsersTable from "@/components/admin/usersTable";
import AdminNavbar from "@/components/admin/navbar";

export default async function AdminUsersDash() {
  const user = await getCurrentUser();
  const users = await getUsers();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <AdminNavbar user={user} />
        <UsersTable users={users} />
      </div>
    </div>
  );
}

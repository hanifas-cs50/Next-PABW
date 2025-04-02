import { getAdmins } from "@/actions/adminActions";
import { getCurrentUser } from "@/actions/auth";
import AdminsTable from "@/components/admin/adminsTable";
import UserNavbar from "@/components/admin/navbar";

export default async function AdminAdminsDash() {
  const user = await getCurrentUser();
  const admins = await getAdmins();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <UserNavbar user={user} />
        <AdminsTable admins={admins} />
      </div>
    </div>
  );
}

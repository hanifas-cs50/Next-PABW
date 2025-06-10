import { getUser } from "@/lib/action/AdminActions";
import AdminUser from "@/components/admin/AdminUser";

export default async function Page({ params }) {
  const { user_id } = await params;
  const userData = await getUser({ user_id });

  return <AdminUser userData={userData} />;
}

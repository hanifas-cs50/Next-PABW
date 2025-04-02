import { getCurrentUser } from "@/actions/auth";
import { getUser } from "@/actions/adminActions";
import SingleUser from "@/components/admin/singleUser";
import AdminNavbar from "@/components/admin/navbar";

export default async function UserProfile({ params }) {
  const { userid } = await params;
  const user = await getUser(userid);

  const signedUser = await getCurrentUser();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <AdminNavbar user={signedUser} />
        <SingleUser user={user} />
      </div>
    </div>
  );
}

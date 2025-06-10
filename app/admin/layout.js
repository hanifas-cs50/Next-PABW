import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  if (session.user.role !== "admin") redirect("/user");

  // Later when navbar is fully established it will need current user
  const currUser = session && {
    user_id: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };

  return (
    <div className="min-h-screen w-full p-4 flex flex-col gap-4 bg-zinc-200">
      <AdminNavbar currUser={currUser} />
      {children}
    </div>
  );
}

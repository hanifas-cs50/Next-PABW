import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import UserNavbar from "@/components/user/UserNavbar";
import UserSettings from "@/components/user/UserSettings";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");

  if (session.user.role !== "user") redirect("/admin");

  const currUser = session && {
    user_id: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };

  return (
    <>
      <UserNavbar currUser={currUser} settings={true} />
      <UserSettings currUser={currUser} />
    </>
  );
}

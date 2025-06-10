import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Signin from "@/components/auth/Signin";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session.user.role === "admin") redirect("/admin");
    else if (session.user.role === "user") redirect("/user");
  }

  return <Signin />;
}

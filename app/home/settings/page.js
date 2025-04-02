import { getCurrentUser } from "@/actions/auth";
import UserNavbar from "@/components/user/navbar";
import UserSettings from "@/components/user/userSettings";

export default async function UserSettingPage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
      <div className="flex flex-col">
        <UserNavbar user={user} settings={true} />
        <UserSettings user={user} />
      </div>
    </div>
  );
}

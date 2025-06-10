import { getUserInfo } from "@/lib/action/UserActions";
import UserChangePass from "./UserSettings/UserChangePass";
import UserChangeUser from "./UserSettings/UserChangeUser";
import UserChangeEmail from "./UserSettings/UserChangeEmail";
import UserDeleteAcc from "./UserSettings/UserDeleteAcc";

export default async function UserSettings({ currUser }) {
  const signedUser = await getUserInfo({ id: currUser.user_id });

  return (
    <main className="flex-grow max-w-screen-lg w-full mx-auto py-4 space-y-4">
      <UserChangePass
        user_data={{ user_id: signedUser.id, password: signedUser.password }}
      />

      <UserChangeUser
        user_data={{ user_id: signedUser.id, username: signedUser.username }}
      />

      <UserChangeEmail
        user_data={{ user_id: signedUser.id, email: signedUser.email }}
      />

      <UserDeleteAcc
        user_data={{ user_id: signedUser.id, password: signedUser.password }}
      />
    </main>
  );
}

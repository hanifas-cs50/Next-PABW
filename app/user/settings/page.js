import { useUser } from "@/lib/context/UserContext";
import UserNavbar from "@/components/user/UserNavbar";
import UserSettings from "@/components/user/UserSettings";

export default async function Page() {
  const currUser = useUser();
  const signedUser = await getUserInfo({ id: currUser.user_id });

  return (
    <>
        <UserNavbar currUser={currUser} settings={true} />
        {/* <UserSettings signedUser={signedUser} /> */}
    </>
  );
}

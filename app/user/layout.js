import { UserContext } from "@/lib/context/UserContext";

export default async function Layout({ children }) {
  const session = await getServerSession(authOptions);

  const currUser = session && {
    user_id: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };

  return (
    <UserContext.Provider value={currUser}>
      <div>
        {children}
      </div>
    </UserContext.Provider>
  );
}

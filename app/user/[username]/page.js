import { useUser } from "@/lib/context/UserContext";
import { getGuestUser } from "@/lib/action/userActions";

export default async function Page({ params }) {
    const { username } = await params;
    const currUser = await useUser();
    const user = await getGuestUser({ username });

    if (!user) {
      return (
        <div className="max-w-5xl min-h-screen mx-auto grid bg-white">
           <div className="flex flex-col justify-center items-center">
             Not Found -\( ' ' )/-
             <Link href={{ pathname: "/user" }}>
               <button
                 type="button"
                 className="mt-2 px-3 py-2 text-white font-medium bg-blue-500/80 hover:bg-blue-500 rounded cursor-pointer"
               >
                 Back home
               </button>
             </Link>
           </div>
        </div>
      );
    }

    // const posts = await getPosts(user.id);

  return (
    <>
        <UserNavbar currUser={currUser} stranger={user} />
    </>
  );
}

// <div className="flex-1 min-h-0">
//   <StrangerPosts posts={posts} />
// </div>

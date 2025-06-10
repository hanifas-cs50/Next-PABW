"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Pagination from "./AdminPosts/Pagination";
import { loadPosts } from "@/lib/action/AdminActions";

export default function AdminPosts({ currentPage, totalPages, postsPerPage }) {
  const offset = (currentPage - 1) * postsPerPage;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setLoadError("");
      try {
        const result = await loadPosts({ offset, postsPerPage });
        setPosts(result);
      } catch (error) {
        setLoadError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [offset, postsPerPage]);

  if (isLoading) return <p className="mx-auto pt-6">Loading...</p>;
  if (loadError) return <p className="mx-auto pt-6">{loadError}</p>;

  return (
    <>
      <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
        <div
          className="pr-2 pb-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto custom-scroll"
          style={{ maxHeight: "calc(100vh - 13rem)" }}
        >
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col justify-between gap-4 p-4 rounded bg-white shadow-md hover:shadow-lg"
              >
                <div className="space-y-2">
                  {post.pic_url && (
                    <Image
                      src={`/uploads/${post.pic_url}`}
                      width={100}
                      height={100}
                      alt="Post Pic"
                      className="w-full aspect-square object-cover rounded"
                    />
                  )}
                  <p className="font-semibold text-sm leading-relaxed">
                    {post.content.length > 40
                      ? `${post.content.slice(0, 40)}...`
                      : post.content}
                  </p>
                </div>
                <Link
                  href={`/admin/post/${post.id}`}
                  className="w-full py-2 text-sm font-medium text-center text-white bg-blue-500 rounded"
                >
                  Details
                </Link>
              </article>
            ))
          ) : (
            <p className="col-span-full font-medium text-center">Nobody posted yet...</p>
          )}
        </div>
      </main>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

// <table className="mb-4 w-full border-collapse">
//   <thead>
//     <tr>
//       <th className="w-14 border p-2">No.</th>
//       <th className="border p-2">Pic Preview</th>
//       <th className="border p-2">Content</th>
//       <th className="border p-2">Username</th>
//       <th className="border p-2">Created At</th>
//       <th className="border p-2">Action</th>
//     </tr>
//   </thead>
//   <tbody className="text-center">
//     <tr>
//       <td className="border p-2">i + 1.</td>
//       <td className="border p-2">
//         <Image
//           className="size-40 mx-auto rounded-xl"
//           src={`/uploads/${post.pic_url}`}
//           width={100}
//           height={100}
//           priority={true}
//           alt="Post pic"
//         />
//       </td>
//       <td className="border p-2">content</td>
//       <td className="border p-2">username</td>
//       <td className="border p-2">created_at</td>
//       <td className="w-20 border p-0">
//         <button
//           className="h-44 w-full font-medium text-white bg-red-500/90 hover:bg-red-500 disabled:bg-zinc-500 cursor-pointer"
//           type="button"
//           // onclick={() => onDelete(id)}
//           // disabled={deletingId === id}
//         >
//           Delete
//         </button>
//       </td>
//     </tr>
//   </tbody>
// </table>

"use client";

export default function StrangerPosts({ posts }) {
  const postItems = [...posts];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {postItems.map((post) => (
          <div key={post.id} className="px-4 py-3 rounded border-2">
            <div className="pb-2 flex items-center justify-between border-b">
              <h5 className="m-0">
                {new Date(post.createdAt + "Z").toLocaleString("id-ID", {
                  timeZone: "Asia/Jakarta",
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h5>
            </div>
            <pre className="pt-2 font-sans border-t">{post.content}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

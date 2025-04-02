export default function Post({ post, removePost }) {
  if (!post) return null;
  return (
    <div className="px-4 py-3 rounded border-2">
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
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => removePost(post.id)}
            className="w-16 py-0.5 text-white font-medium bg-red-500/80 hover:bg-red-500 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
      <pre className="pt-2 font-sans border-t">{post.content}</pre>
    </div>
  );
}

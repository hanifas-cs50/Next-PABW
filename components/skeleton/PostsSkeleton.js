export default function PostsSkeleton() {
  return (
    <main className="flex-grow max-w-screen-lg w-full mx-auto py-4">
      <div
        className="pr-2 pb-2 grid gap-4 overflow-auto custom-scroll"
        style={{ maxHeight: "calc(100vh - 9rem)" }}
      >
        {[...Array(3)].map((_, i) => (
          <article
            key={i}
            className="max-w-xl w-full mx-auto p-4 flex flex-col justify-between rounded bg-white shadow-md hover:shadow-lg"
          >
            <div className="mb-3 pr-2 flex justify-between items-center">
              <div className="w-full">
                <span className="inline-block h-4 mr-2 bg-zinc-300 rounded w-1/6"></span>
                &bull;
                <span className="inline-block h-4 ml-2 bg-zinc-300 rounded w-1/6"></span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="4"
                    d="M5 12h.01M12 12h.01M19 12h.01"
                  />
                </svg>
              </div>
            </div>

            <div className="h-96 w-full mb-3 bg-zinc-300 rounded-xl"></div>

            <div className="space-y-2">
              <div className="h-4 bg-zinc-300 rounded w-full"></div>
              <div className="h-4 bg-zinc-300 rounded w-5/6"></div>
              <div className="h-4 bg-zinc-300 rounded w-3/4"></div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

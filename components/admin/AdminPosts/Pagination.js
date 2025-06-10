import Link from "next/link";

export default function Pagination({ currentPage, totalPages }) {
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div className="h-14 max-w-screen-lg w-full mx-auto px-4 flex justify-center items-center rounded bg-white shadow-md">
      {prevPage ? (
        <Link
          href={`?page=${prevPage}`}
          className="px-2 py-1 rounded bg-white border"
        >
          &#9664;
        </Link>
      ) : (
        <span className="px-2 py-1 text-gray-400">&#9664;</span>
      )}

      <span className="px-4 py-1">
        {currentPage} / {totalPages}
      </span>

      {nextPage ? (
        <Link
          href={`?page=${nextPage}`}
          className="px-2 py-1 rounded bg-white border"
        >
          &#9654;
        </Link>
      ) : (
        <span className="px-2 py-1 text-gray-400">&#9654;</span>
      )}
    </div>
  );
}

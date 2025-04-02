"use client";

import { useRef, useState } from "react";

export default function AddPost({ userId, createPost, isLoading }) {
  const formRef = useRef(null);
  const [fold, setFold] = useState(true);

  async function handleAdd(event) {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const userId = formData.get("userId");
    const content = formData.get("content");

    if (!userId || !content.trim()) {
      alert("Please enter a post.");
      return;
    }

    await createPost(userId, content);

    // Use the form ref to reset instead <= ChatGPT
    formRef.current.reset();
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      handleAdd(event);
    }
  }

  return (
    <div className="w-full h-max grid border-t">
      <div className="h-14 mx-4 pl-2 pr-1 flex items-center justify-between">
        <h3 className="font-medium">New Post:</h3>
        <button
          onClick={() => setFold(!fold)}
          type="button"
          disabled={isLoading}
          className="h-max p-1 text-white bg-black rounded cursor-pointer disabled:opacity-50"
        >
          {fold ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6 my-0.25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {fold ? null : (
        <form ref={formRef} className="grid px-4 pb-4" onSubmit={handleAdd}>
          <input id="userId" name="userId" type="hidden" value={userId} />
          <textarea
            id="content"
            name="content"
            rows={5}
            className="w-full mb-2 px-3 py-2 outline-0 border-2 rounded disabled:bg-gray-100"
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="What's on your mind?"
          ></textarea>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 font-medium text-white bg-blue-500/80 hover:bg-blue-500 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Posting..." : "Post (Shift + Enter)"}
          </button>
        </form>
      )}
    </div>
  );
}

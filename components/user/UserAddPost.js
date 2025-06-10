"use client";

import { useRef, useState } from "react";
import { usePosts } from "@/lib/context/PostContext";

export default function UserAddPost({ currUser, setAddState }) {
  const formRef = useRef(null);
  const { add_post } = usePosts();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setAddState(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select an image file (JPEG, PNG, etc.)");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size too large (max 5MB)");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content").trim();

    if (!content) {
      setError("Please enter a post.");
      setIsLoading(false);
      return;
    }

    try {
      let pic_url = "";

      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("pic", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: imageFormData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        pic_url = result.filename;
      }

      await add_post({ currUser, content, pic_url });
      setFile(null);
      formRef.current?.reset();
      setAddState(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog
      className="absolute inset-0 h-screen w-screen flex justify-center items-center bg-zinc-900/50"
      onMouseDown={handleClickOutside}
    >
      <form
        ref={formRef}
        className="max-w-screen-sm w-full p-6 space-y-2 rounded-lg bg-white z-50"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">Post:</h2>

        <textarea
          className="h-48 w-full p-3 rounded-lg bg-zinc-200 outline-none border-2 border-transparent hover:border-zinc-500 focus:border-zinc-500 transition-colors resize-none"
          placeholder="Type what's on your mind..."
          id="content"
          name="content"
          required
          disabled={isLoading}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-zinc-200 file:text-zinc-800
              hover:file:bg-zinc-300 cursor-pointer"
          id="pic"
          name="pic"
          disabled={isLoading}
        />

        {error && (
          <div className="w-full px-4 py-3 font-medium text-sm text-white rounded bg-red-500/80">
            {error}
            <button
              className="float-right cursor-pointer"
              type="button"
              onClick={() => setError("")}
            >
              &#10006;
            </button>
          </div>
        )}
        
        <button
          className="w-full py-3 font-medium text-white rounded bg-blue-500/80 hover:bg-blue-500 disabled:bg-zinc-500"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
        <button
          className="w-full py-3 font-medium text-white rounded bg-red-500/80 hover:bg-red-500 disabled:bg-zinc-500 cursor-pointer"
          type="button"
          onClick={() => {
            formRef.current?.reset();
            setFile(null);
          }}
          disabled={isLoading}
        >
          Clear
        </button>
      </form>
    </dialog>
  );
}

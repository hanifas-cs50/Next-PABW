"use client";

import { usePosts } from "@/lib/context/PostContext";
import { useUser } from "@/lib/context/UserContext";
import { useRef } from "react";

export default function UserAddPost() {
  const currUser = useUser();
  const { add_post } = usePosts();
  const formRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      handleAdd(e);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");

    add_post({ currUser, content, pic_url: "" });
    formRef.current.reset();
    close();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <textarea
        id="content"
        name="content"
        rows={5}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder="What's on your mind?"
      ></textarea>
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Posting..." : "Post (Shift + Enter)"}
      </button>
    </form>
  );
}

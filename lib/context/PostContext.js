"use client";

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";
import { addPost, deletePost, loadPosts } from "../action/PostActions";

export const PostContext = createContext(null);

export const usePosts = () => useContext(PostContext);

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const add_post = useCallback(
    async ({ currUser, content, pic_url }) => {
      setIsLoading(true);
      setLoadError("");

      try {
        const result = await addPost({ currUser, content, pic_url });
        // console.log(result);
        setPosts((prev) => [result, ...prev]);
      } catch (error) {
        // console.error("Post add error:", error);
        setLoadError("Failed to add post");
      } finally {
        setIsLoading(false);
      }
    },
    [addPost]
  );

  const delete_post = useCallback(async (post_id) => {
    setIsLoading(true);
    setLoadError("");

    try {
      const result = await deletePost({ post_id });

      setPosts((prev) => prev.filter((post) => post.id !== result));
    } catch (error) {
      // console.error("Post delete error:", error);
      setLoadError("Failed to delete post");
    } finally {
      setIsLoading(false);
    }
  }, [deletePost]);

  const load_posts = useCallback(async (user_id) => {
    setIsLoading(true);
    setLoadError("");
    
    try {
      const data = await loadPosts({ user_id });
      setPosts(data);
    } catch (error) {
      // console.error("Post load error:", error);
      setLoadError("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  }, [loadPosts]);

  const value = useMemo(
    () => ({
      posts,
      isLoading,
      loadError,
      add_post,
      delete_post,
      load_posts,
    }),
    [posts, isLoading, loadError, add_post, delete_post, load_posts]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

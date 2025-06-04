"use client";
// import { db } from "../db";
import { createContext, useContext, useMemo, useCallback, useState } from "react";

export const PostContext = createContext(null);

export const usePosts = () => useContext(PostContext);

const mockData = [
  {
    id: 4,
    user_id: 2,
    username: "Hanif424",
    content: "Lorem Ipsum",
    pic_url: "1747456088984-507572859.webp",
    created_at: "2025-05-16 11:14:45",
  },
  {
    id: 3,
    user_id: 2,
    username: "Hanif424",
    content:
      "My hobbies include Physics and Computer science. This Website is for showing my portfolios...",
    pic_url: "1747456002900-62527857.webp",
    created_at: "2023-11-01 14:30:45",
  },
  {
    id: 2,
    user_id: 3,
    username: "Test353",
    content: "Lorem Ipsum",
    pic_url: "1747456002900-62527857.webp",
    created_at: "2025-05-16 11:14:45",
  },
  {
    id: 1,
    user_id: 3,
    username: "Test353",
    content:
      "My hobbies include Physics and Computer science. This Website is for showing my portfolios...",
    pic_url: "1747456088984-507572859.webp",
    created_at: "2023-11-01 14:30:45",
  },
];

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const add_post = ({ currUser, content, pic_url }) => {
    setIsLoading(true);
    const newPost = {
      id: posts.length > 0 ? posts[0].id + 1 : 1,
      user_id: currUser.user_id,
      username: currUser.username,
      content,
      pic_url,
      created_at: new Date().toISOString(),
    };

    try {
      // Optimistic update
      setPosts((prev) => [newPost, ...prev]); // When using db, comment this line

      // TODO: Actual Drizzle call
      // const [dbPost] = await db
      //   .insert(posts)
      //   .values({ user_id: currUser.user_id, content, pic_url, created_at: new Date().toISOString() })
      //   .returning();

      // setPosts((prev) => [dbPost, ...prev]);
    } catch (error) {
      setLoadError("Failed to add post");
      setPosts((prev) => prev.filter((p) => p.id !== newPost.id));
    } finally {
      setIsLoading(false);
    }
  };

  const delete_post = (post_id) => {
    try {
      // TODO: Drizzle delete
      // const result = await db.delete(posts).where(eq(posts.id, post_id));
      // if (result.rowCount === 0) {
      //   setLoadError("Failed to delete post");
      //   return;
      // }

      // Optimistic update
      setPosts((prev) => prev.filter((post) => post.id !== post_id));
    } catch {
      setLoadError("Failed to delete post");
    }
  };

  const loadPosts = async (user_id) => {
    setIsLoading(true);
    setLoadError("");
    try {
      // TODO: Replace with Drizzle query
      // const data = await db.select().from(posts).where(eq(posts.user_id, user_id))
      // setPosts(data);
      const data = mockData.filter((mock) => mock.user_id === user_id);
      setPosts(data);
    } catch {
      setLoadError("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      posts,
      isLoading,
      loadError,
      add_post,
      delete_post,
      loadPosts,
    }),
    [posts, isLoading, loadError]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

// export function PostProvider({ children, currUser }) {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");

//   // Memoize stable functions with useCallback
//   const add_post = useCallback(
//     async ({ content, pic_url }) => {},
//     [currUser.username, currUser.user_id, posts.length]
//   );

//   const delete_post = useCallback(async (post_id) => {
//     try {
//       // TODO: Drizzle delete
//       // const result = await db.delete(posts).where(eq(posts.id, post_id));
//       // if (result.rowCount === 0) {
//       //   setLoadError("Failed to delete post");
//       //   return;
//       // }

//       // Optimistic update
//       setPosts((prev) => prev.filter((post) => post.id !== post_id));
//     } catch {
//       setLoadError("Failed to delete post");
//     }
//   }, []);

//   const loadPosts = useCallback(async () => {
//     setIsLoading(true);
//     setLoadError("");
//     try {
//       // TODO: Replace with Drizzle query
//       // const data = await db.select().from(posts).where(eq(posts.user_id, currUser.username))
//       // setPosts(data);
//     } catch {
//       setLoadError("Failed to load posts");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [currUser.username]);

//   useEffect(() => {
//     loadPosts();
//   }, [loadPosts]);

//   // Proper memoization of context value
//   const value = useMemo(
//     () => ({
//       posts,
//       isLoading,
//       loadError,
//       add_post,
//       delete_post,
//       reloadPosts: loadPosts,
//     }),
//     [posts, isLoading, loadError, add_post, delete_post, loadPosts]
//   );

//   return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
// }

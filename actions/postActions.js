"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { posts } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export const getPosts = async (userId) => {
  try {
    const postsRes = await db
      .select()
      .from(posts)
      .where(eq(posts.userId, userId))
      .orderBy(desc(posts.createdAt))
      .execute();

    return postsRes || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const addPost = async (userId, postText) => {
  await db.insert(posts).values({
    content: postText,
    userId: userId,
  });
  return { success: true, message: "Post made" };
};

export const deletePost = async (id) => {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/");
    return { success: true, message: "Post deleted" };
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: "Failed to delete post" };
  }
};

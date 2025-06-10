"use server";

import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { postsTable, users } from "../db/schema";

export async function loadPosts({ user_id }) {
  try {
    const data = await db
      .select({
        id: postsTable.id,
        user_id: postsTable.user_id,
        username: users.username,
        content: postsTable.content,
        pic_url: postsTable.pic_url,
        created_at: postsTable.created_at,
      })
      .from(postsTable)
      .where(eq(postsTable.user_id, user_id))
      .leftJoin(users, eq(postsTable.user_id, users.id))
      .orderBy(desc(postsTable.created_at));
    
    return data;
  } catch (error) {
    console.error("Post load error:", error);
    throw new Error(`Post load error: ${error}`);
  }
}

export async function addPost({ currUser, content, pic_url }) {
  try {
    const [dbPost] = await db
      .insert(postsTable)
      .values({
        user_id: currUser.user_id,
        content,
        pic_url,
      })
      .returning();
    // created_at: new Date().toISOString(),

    const enrichedPost = {
      username: currUser.username,
      ...dbPost,
    };

    return enrichedPost;
  } catch (error) {
    console.error("Post add error:", error);
    throw new Error(`Post add error: ${error}`);
  }
}

export async function deletePost({ post_id }) {
  try {
    const result = await db
      .delete(postsTable)
      .where(eq(postsTable.id, post_id));
      
    if (result.rowCount === 0) {
      throw new Error("Failed to delete post");
    }

    return post_id
  } catch (error) {
    console.error("Post delete error:", error);
    throw new Error(`Post delete error: ${error}`);
  }  
}
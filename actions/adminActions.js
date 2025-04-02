"use server";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { users, posts } from "@/lib/db/schema";

export async function getUser(id) {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), eq(users.role, "user")))
    .get();

  return user || null;
}

export const getUsers = async () => {
  try {
    const usersRes = await db
      .select()
      .from(users)
      .where(eq(users.role, "user"))
      .orderBy(desc(users.createdAt))
      .execute();

    return usersRes || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteUser = async (id) => {
  try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath("/");
    return { success: true, message: "User deleted" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const updateUserRole = async (id, role) => {
  try {
    await db.update(users).set({ role: role }).where(eq(users.id, id));
    return { success: true, message: "Role changed" };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user" };
  }
};

export const getAdmins = async () => {
  try {
    const usersRes = await db
      .select()
      .from(users)
      .where(eq(users.role, "admin"))
      .orderBy(desc(users.createdAt))
      .execute();

    return usersRes || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getAllPosts = async () => {
  try {
    const postsRes = await db
      .select({
        id: posts.id,
        username: users.username,
        content: posts.content,
      })
      .from(posts)
      .leftJoin(users, eq(users.id, posts.userId))
      .orderBy(desc(posts.createdAt))
      .execute();
    // .where(eq(posts.role, "post"))

    return postsRes || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getPost = async (postId) => {
  try {
    const postRes = await db
      .select({
        id: posts.id,
        username: users.username,
        content: posts.content,
      })
      .from(posts)
      .where(eq(posts.id, postId))
      .leftJoin(users, eq(users.id, posts.userId))
      .get();

    return postRes;
  } catch (error) {
    console.error("Error fetching post:", error);
    return { success: false, message: "Failed to fetch post" };
  }
};

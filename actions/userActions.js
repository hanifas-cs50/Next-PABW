"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema";
import { compare, hash } from "bcryptjs";

export async function getUser({ username }) {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.username, username), eq(users.role, "user")))
    .get();

  return user || null;
}

export async function changePassword(userId, currentPassword, newPassword) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .get();

  const isValidCurrentPassword = await compare(currentPassword, user.password);

  if (!isValidCurrentPassword) {
    return {
      success: false,
      error: "Current password is incorrect",
    };
  }

  const hashedNewPassword = await hash(newPassword, 10);

  try {
    await db
      .update(users)
      .set({ password: hashedNewPassword })
      .where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Password change failed",
    };
  }
}

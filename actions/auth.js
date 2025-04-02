"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db/index";
import { users } from "@/lib/db/schema";
import { authOptions } from "@/lib/auth/index";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session || !session.user?.id) return null;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .execute();

  // console.log("Fetched user:", user[0]); // Debug log

  return user[0] || null;
}

export async function signUp({ username, email, password }) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .execute();

  if (existingUser.length > 0) {
    return { error: "Username already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .insert(users)
    .values({
      username: username,
      email: email,
      password: hashedPassword,
    })
    .execute();
  // If want to make admin
  // role: "admin",

  return { success: true };
}

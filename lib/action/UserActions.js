"use server";

import { compare, hash } from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index";
import { users } from "../db/schema";

export async function getGuestUser({ username }) {
  const user = await db
    .select({
      id: users.id,
      username: users.username,
    })
    .from(users)
    .where(and(eq(users.username, username), eq(users.role, "user")))
    .get();

  // return mockUser.find((item) => item.username === username);
  return user || null;
}

export async function getUserInfo({ id }) {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), eq(users.role, "user")))
    .get();

  // return mockUser.find((item) => item.id === id);
  return user || null;
}

export async function signUp({ username, email, password }) {
  const hashedPassword = await hash(password, 10);

  try {
    const [user] = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPassword,
        role: "user",
      })
      .returning({ id: users.id });

    // If want to make admin
    // role: "admin",

    // If want to make user
    // role: "user",

    return { success: true, userId: user.id };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: users.username")) {
      throw new Error("Username is already taken");
    } else if (
      error.message.includes("UNIQUE constraint failed: users.email")
    ) {
      throw new Error("Email is already registered");
    }

    console.error("Error signing up:", error);
    throw new Error("Unexpected error during signup");
  }
}

export async function changePassword({ userId, currentPassword, newPassword }) {
  const user = await db.select().from(users).where(eq(users.id, userId)).get();

  const isValidCurrentPassword = await compare(currentPassword, user.password);
  if (!isValidCurrentPassword) {
    throw new Error("Current password is incorrect");
  }

  const hashedNewPassword = await hash(newPassword, 10);

  try {
    const result = await db
      .update(users)
      .set({ password: hashedNewPassword })
      .where(eq(users.id, userId));

    if (result.length === 0) {
      throw new Error("User not found or password unchanged");
    }

    return { success: true };
  } catch (error) {
    console.error("Error changing password: ", error);
    throw new Error(`Error changing password: ${error}`);
  }
}

export async function changeEmail({ userId, newEmail }) {
  // console.log({ userId, newEmail });
  try {
    const result = await db
      .update(users)
      .set({ email: newEmail })
      .where(eq(users.id, userId));

    if (result.length === 0) {
      throw new Error("User not found or email unchanged");
    }

    return { success: true };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: users.email")) {
      throw new Error("Email is already registered");
    }
    console.error("Error changing email: ", error);
    throw new Error(`Error changing email: ${error}`);
  }
}

export async function changeUsername({ userId, newUsername }) {
  // console.log({ userId, newUsername });
  try {
    const result = await db
      .update(users)
      .set({ username: newUsername })
      .where(eq(users.id, userId));

    if (result.length === 0) {
      throw new Error("User not found or username unchanged");
    }

    return { success: true };
  } catch (error) {
    if (error.message.includes("UNIQUE constraint failed: users.username")) {
      throw new Error("Username is already taken");
    }

    console.error("Error changing username: ", error);
    throw new Error(`Error changing username: ${error}`);
  }
}

export async function deleteUser({ userId, currentPassword }) {
  const user = await db.select().from(users).where(eq(users.id, userId)).get();

  const isValid = await compare(currentPassword, user.password);
  if (!isValid) {
    throw new Error("Password is incorrect");
  }

  try {
    const result = await db.delete(users).where(eq(users.id, userId));

    if (result.rowCount === 0) {
      console.error("User not found");
      throw new Error("Failed to delete post");
    }

    return { ok: true };
  } catch (error) {
    console.error("User delete error: ", error);
    throw new Error(`User delete error: ${error}`);
  }
}

// const usernameExists = mockUser.filter((user) => user.username === username);
// if (usernameExists.length > 0) {
//   throw new Error("Username is already taken");
// }

// const emailExists = mockUser.filter((user) => user.email === email);
// if (emailExists.length > 0) {
//   throw new Error("Email is already registered");
// }

// mockUser.push({
//   id: mockUser.length + 1,
//   username: username,
//   email: email,
//   password: hashedPassword,
//   role: "user",
// });

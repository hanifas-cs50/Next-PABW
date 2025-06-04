"use server";

// import { and, eq } from "drizzle-orm";
// import { db } from "@/lib/db/index";
// import { users } from "@/lib/db/schema";
import { compare, hash } from "bcryptjs";

const mockUser = [
  {
    id: 1,
    username: "admin",
    email: "admin@test.com",
    password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
    role: "admin",
  },
  {
    id: 2,
    username: "Hanif424",
    email: "test@test.com",
    password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
    role: "user",
  },
  {
    id: 3,
    username: "test353",
    email: "second@test.com",
    password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
    role: "user",
  },
];

export async function getGuestUser({ username }) {
  // const user = await db
  //   .select()
  //   .from(users)
  //   .where(and(eq(users.username, username), eq(users.role, "user")))
  //   .get();

  // return user || null;
  return mockUser.find((item) => item.username == username);
}

export async function getUserInfo({ id }) {
  // const user = await db
  //   .select()
  //   .from(users)
  //   .where(and(eq(users.username, username), eq(users.role, "user")))
  //   .get();

  // return user || null;
  return mockUser.find((item) => item.id == id);
}

export async function signUp({ username, email, password }) {
  // const existingUser = await db
  //   .select()
  //   .from(users)
  //   .where(eq(users.username, username))
  //   .execute();
  const existingUser = mockUser.filter((user) => (user.username === username || user.email === email));

  if (existingUser.length > 0) {
    return { error: "Username already registered" };
  }

  const hashedPassword = await hash(password, 10);
  mockUser.push({
    id: mockUser.length + 1,
    username: username,
    email: email,
    password: hashedPassword,
    role: "user", // default role
  });
  
  // await db
  //   .insert(users)
  //   .values({
  //     username: username,
  //     email: email,
  //     password: hashedPassword,
  //   })
  //   .execute();

  // If want to make admin
  // role: "admin",

  return { success: true };
}

// export async function changePassword(userId, currentPassword, newPassword) {
//   const user = await db.select().from(users).where(eq(users.id, userId)).get();

//   const isValidCurrentPassword = await compare(currentPassword, user.password);

//   if (!isValidCurrentPassword) {
//     return {
//       success: false,
//       error: "Current password is incorrect",
//     };
//   }

//   const hashedNewPassword = await hash(newPassword, 10);

//   try {
//     await db
//       .update(users)
//       .set({ password: hashedNewPassword })
//       .where(eq(users.id, userId));
//     return { success: true };
//   } catch (error) {
//     return {
//       success: false,
//       error: "Password change failed",
//     };
//   }
// }
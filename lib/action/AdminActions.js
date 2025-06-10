"use server";

import { desc, eq, count } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { postsTable } from "../db/schema";

export async function totalPostsCount() {
  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(postsTable);
  // const totalCount = mockData.length;

  return totalCount;
}

export async function loadPosts({ offset, postsPerPage }) {
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
      .orderBy(desc(postsTable.created_at))
      .leftJoin(users, eq(postsTable.user_id, users.id))
      .limit(postsPerPage)
      .offset(offset);
    // const data = mockData.slice(offset, offset + postsPerPage); // When using db, comment this line

    return data;
  } catch (error) {
    console.error("Posts load error: ", error);
    throw new Error(`Posts load error: ${error.message}`);
  }
}

export async function getPost({ post_id }) {
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
      .leftJoin(users, eq(postsTable.user_id, users.id))
      .where(eq(postsTable.id, post_id))
      .get();
    // const data = mockData.find((data) => data.id == post_id); // When using db, comment this line

    if (!data) {
      console.error("Post not found");
      throw new Error("Post not found");
    }

    return data;
  } catch (error) {
    console.error("Post load error: ", error);
    throw new Error(`Post load error: ${error.message}`);
  }
}

export async function deletePost({ post_id }) {
  try {
    const result = await db
      .delete(postsTable)
      .where(eq(postsTable.id, post_id));

    if (result.rowCount === 0) {
      console.error("Post not found");
      throw new Error("Post not found");
    }

    return { post_id };
  } catch (error) {
    console.error("Post delete error: ", error);
    throw new Error(`Post delete error: ${error}`);
  }
}

export async function totalUsersCount() {
  const [{ count: totalCount }] = await db
    .select({ count: count() })
    .from(users);
  // const totalCount = mockUser.length;

  return totalCount;
}

export async function loadUsers({ offset, usersPerPage }) {
  try {
    const data = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
      })
      .from(users)
      .limit(usersPerPage)
      .offset(offset);
    // const data = mockUser.slice(offset, offset + usersPerPage); // When using db, comment this line

    return data;
  } catch (error) {
    console.error("Users load error: ", error);
    throw new Error(`Users load error: ${error.message}`);
  }
}

export async function getUser({ user_id }) {
  try {
    const data = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        role: users.role,
        created_at: users.created_at,
      })
      .from(users)
      .where(eq(users.id, user_id))
      .get();
    // const data = mockUser.find((data) => data.id == user_id); // When using db, comment this line

    if (!data) {
      throw new Error("User not found");
    }

    return data;
  } catch (error) {
    console.error("User load error: ", error);
    throw new Error(`User load error: ${error.message}`);
  }
}

export async function editRole({ user_id, new_role }) {
  const validRoles = ["admin", "user"];

  if (!validRoles.includes(new_role)) {
    throw new Error(`Invalid role: ${new_role}`);
  }

  try {
    const result = await db
      .update(users)
      .set({ role: new_role })
      .where(eq(users.id, user_id));

    if (result.length === 0) {
      throw new Error("User not found or role unchanged");
    }

    return { ok: true };
  } catch (error) {
    console.error("Role update error: ", error);
    throw new Error(`Role update error: ${error.message}`);
  }
}

export async function deleteUser({ user_id }) {
  try {
    const result = await db.delete(users).where(eq(users.id, user_id));

    if (result.rowCount === 0) {
      console.error("User not found");
      throw new Error("User not found");
    }

    return { ok: true };
  } catch (error) {
    console.error("User delete error: ", error);
    throw new Error(`User delete error: ${error}`);
  }
}

// export const mockData = [
//   {
//     id: 1,
//     user_id: 3,
//     username: "Test353",
//     content: "Exploring quantum mechanics and building React projects.",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-01 10:00:00",
//   },
//   {
//     id: 2,
//     user_id: 2,
//     username: "Hanif424",
//     content: "Love working on side projects and listening to podcasts.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-02 11:20:00",
//   },
//   {
//     id: 3,
//     user_id: 3,
//     username: "Test353",
//     content: "Currently learning Rust and loving it.",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-03 14:00:00",
//   },
//   {
//     id: 4,
//     user_id: 4,
//     username: "AliceDev",
//     content: "Just deployed my first full-stack app!",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-04 15:45:00",
//   },
//   {
//     id: 5,
//     user_id: 2,
//     username: "Hanif424",
//     content: "Coffee and code — the perfect combo.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-05 09:30:00",
//   },
//   {
//     id: 6,
//     user_id: 4,
//     username: "AliceDev",
//     content:
//       "Exploring backend systems with Go and PostgreSQL. Finally got connection pooling working properly, and it's made a massive difference in performance. Highly recommend diving into connection handling early!",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-06 08:15:00",
//   },
//   {
//     id: 7,
//     user_id: 3,
//     username: "Test353",
//     content:
//       "Physics is more fun when you try to simulate it. I'm working on a particle motion simulation using vanilla JS and Canvas. Once I get collision physics right, I'll turn it into a little game.",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-07 17:10:00",
//   },
//   {
//     id: 8,
//     user_id: 2,
//     username: "Hanif424",
//     content:
//       "Trying out new image generation models! Midjourney is great, but experimenting with open-source alternatives like Stable Diffusion locally has been super educational. Bonus: GPU finally gets some love.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-08 20:00:00",
//   },
//   {
//     id: 9,
//     user_id: 4,
//     username: "AliceDev",
//     content: "Attended my first hackathon, it was wild!",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-09 13:10:00",
//   },
//   {
//     id: 10,
//     user_id: 3,
//     username: "Test353",
//     content:
//       "Working on a portfolio website from scratch. Not using any frameworks — just plain HTML, CSS, and JavaScript. It's refreshing to go back to basics, even though I'm tempted to add Tailwind!",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-10 11:40:00",
//   },
//   {
//     id: 11,
//     user_id: 2,
//     username: "Hanif424",
//     content: "Music, coffee, and code. Weekend mood.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-11 07:25:00",
//   },
//   {
//     id: 12,
//     user_id: 4,
//     username: "AliceDev",
//     content:
//       "Debugging for hours, and it was a missing semicolon. Classic dev moment. I’ve started using linting plugins more aggressively now to avoid this in the future.",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-12 16:55:00",
//   },
//   {
//     id: 13,
//     user_id: 3,
//     username: "Test353",
//     content: "Finally understood the Schrödinger equation!",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-13 19:30:00",
//   },
//   {
//     id: 14,
//     user_id: 2,
//     username: "Hanif424",
//     content:
//       "Baking while my code compiles — multitasking! I tried sourdough again and I think it actually turned out okay this time. Next step: CI/CD for sourdough?",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-14 12:00:00",
//   },
//   {
//     id: 15,
//     user_id: 4,
//     username: "AliceDev",
//     content:
//       "Refactored 300 lines into 20. So satisfying! Just using better structure and breaking things into clear utilities helped reduce repetition across the board.",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-15 18:20:00",
//   },
//   {
//     id: 16,
//     user_id: 2,
//     username: "Hanif424",
//     content: "Trying out a new CSS framework today.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-16 10:15:00",
//   },
//   {
//     id: 17,
//     user_id: 3,
//     username: "Test353",
//     content:
//       "Building physics visualizations in D3.js. It's complex but powerful. I'm visualizing wave functions and will eventually try dynamic rendering of tunneling effects.",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-17 14:00:00",
//   },
//   {
//     id: 18,
//     user_id: 4,
//     username: "AliceDev",
//     content: "Night coding sessions are the best!",
//     pic_url: "1749108493707-993795554.webp",
//     created_at: "2024-11-18 23:00:00",
//   },
//   {
//     id: 19,
//     user_id: 3,
//     username: "Test353",
//     content:
//       "Starting a YouTube channel to teach physics! Planning to break down tough concepts like relativity and thermodynamics with animations and analogies. Wish me luck!",
//     pic_url: "1747456088984-507572859.webp",
//     created_at: "2024-11-19 09:45:00",
//   },
//   {
//     id: 20,
//     user_id: 2,
//     username: "Hanif424",
//     content:
//       "Spinning up a new Node.js project today. This time I'm actually writing tests from the start — trying to be better about TDD and not just write everything in one go.",
//     pic_url: "1747456002900-62527857.webp",
//     created_at: "2024-11-20 08:10:00",
//   },
// ];

// export const mockUser = [
//   {
//     id: 1,
//     username: "admin",
//     email: "admin@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "admin",
//     created_at: "2023-11-01 10:00:00",
//   },
//   {
//     id: 2,
//     username: "Hanif424",
//     email: "first@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "user",
//     created_at: "2024-11-01 10:00:00",
//   },
//   {
//     id: 3,
//     username: "Test353",
//     email: "second@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "user",
//     created_at: "2024-11-01 10:00:00",
//   },
//   {
//     id: 4,
//     username: "AliceDev",
//     email: "third@test.com",
//     password: "$2b$10$pQEZlBQulWLHbHXro5DveektYKjLyRULOvZi7xjkzShSHiUobf1yS", // testpass
//     role: "user",
//     created_at: "2024-11-01 10:00:00",
//   },
// ];

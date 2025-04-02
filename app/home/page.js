"use server";

import { redirect } from "next/navigation";

export default async function UserRedir() {
  redirect(`/home/profile`);
}
"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export default async function resolveUsersAction() {
  const { sessionClaims } = await auth();
  const clerk = await clerkClient();

  const res = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string],
  });

  const users = res.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Anon-user",
    avatar: user.imageUrl,
  }));

  console.log(users);

  return users;
}

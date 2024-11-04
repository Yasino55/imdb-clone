import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function favorite() {
  const session = await auth();
  console.log(session);
}

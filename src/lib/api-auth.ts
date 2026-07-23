import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export function unauthorized() {
  return NextResponse.json(
    { success: false, error: "Unauthorized" },
    { status: 401 }
  );
}

export function forbidden() {
  return NextResponse.json(
    { success: false, error: "Forbidden" },
    { status: 403 }
  );
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return unauthorized();
  if (session.user.role !== "SUPER_ADMIN" && session.user.role !== "CONTENT_MANAGER") {
    return forbidden();
  }
  return session;
}

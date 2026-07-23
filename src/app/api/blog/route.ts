import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(posts);
  } catch {
    return errorResponse("Failed to fetch blog posts", 500);
  }
}

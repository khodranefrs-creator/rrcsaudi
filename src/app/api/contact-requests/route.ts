import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const requests = await prisma.contactRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return successResponse(requests);
  } catch {
    return errorResponse("Failed to fetch contact requests", 500);
  }
}

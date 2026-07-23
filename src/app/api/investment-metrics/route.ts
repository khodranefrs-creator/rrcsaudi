import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const metrics = await prisma.investmentMetric.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return successResponse(metrics);
  } catch {
    return successResponse([]);
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await request.json();
    const metric = await prisma.investmentMetric.create({
      data: {
        titleEn: body.titleEn,
        titleAr: body.titleAr,
        value: body.value,
        descriptionEn: body.descriptionEn || null,
        descriptionAr: body.descriptionAr || null,
        source: body.source || null,
        icon: body.icon || null,
        order: body.order || 0,
        published: body.published ?? false,
      },
    });
    return successResponse(metric, 201);
  } catch {
    return errorResponse("Failed to create metric", 500);
  }
}

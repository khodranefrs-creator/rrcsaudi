import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";
import { serviceSchema } from "@/lib/zod-schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    return successResponse(services);
  } catch {
    return errorResponse("Failed to fetch services", 500);
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await request.json();
    const parsed = serviceSchema.parse(body);
    const service = await prisma.service.create({
      data: {
        titleEn: parsed.title,
        titleAr: parsed.title,
        slug: parsed.slug,
        descriptionEn: parsed.description,
        descriptionAr: parsed.description,
        icon: parsed.icon || null,
        order: parsed.order,
        published: true,
      },
    });
    return successResponse(service, 201);
  } catch {
    return errorResponse("Failed to create service", 500);
  }
}

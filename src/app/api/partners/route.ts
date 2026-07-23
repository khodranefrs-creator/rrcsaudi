import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { partnerSchema } from "@/lib/zod-schemas";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const isPublic = request.nextUrl.searchParams.get("public") === "true";
    const where = isPublic ? { published: true, verified: true } : {};
    const partners = await prisma.partner.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return successResponse(partners);
  } catch {
    return errorResponse("Failed to fetch partners", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = partnerSchema.parse(body);
    const partner = await prisma.partner.create({
      data: {
        nameEn: parsed.name,
        nameAr: parsed.name,
        logo: parsed.logo,
        website: parsed.website || null,
        published: true,
      },
    });
    return successResponse(partner, 201);
  } catch {
    return errorResponse("Failed to create partner", 500);
  }
}

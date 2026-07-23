import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { projectSchema } from "@/lib/zod-schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { media: true },
    });
    return successResponse(projects);
  } catch {
    return errorResponse("Failed to fetch projects", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = projectSchema.parse(body);
    const project = await prisma.project.create({
      data: {
        titleEn: parsed.title,
        titleAr: parsed.title,
        slug: parsed.slug,
        descriptionEn: parsed.description,
        descriptionAr: parsed.description,
        locationEn: parsed.location || "",
        locationAr: parsed.location || "",
        category: "RESIDENTIAL",
        status: parsed.status === "published" ? "COMPLETED" : "PLANNING",
        published: parsed.status === "published",
        featured: parsed.isFeatured,
      },
    });
    return successResponse(project, 201);
  } catch {
    return errorResponse("Failed to create project", 500);
  }
}

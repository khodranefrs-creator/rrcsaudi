import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";
import { inquirySchema } from "@/lib/zod-schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
    return successResponse(inquiries);
  } catch {
    return errorResponse("Failed to fetch inquiries", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = inquirySchema.parse(body);
    const inquiry = await prisma.inquiry.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        phone: parsed.phone || null,
        company: parsed.company || null,
        message: parsed.message,
        interestArea: parsed.service || null,
      },
    });
    return successResponse(inquiry, 201);
  } catch {
    return errorResponse("Failed to create inquiry", 500);
  }
}

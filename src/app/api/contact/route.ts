import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { contactSchema } from "@/lib/zod-schemas";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.parse(body);
    const contact = await prisma.contactRequest.create({
      data: {
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
        company: body.company || null,
        phone: body.phone || null,
        service: body.service || null,
      },
    });
    return successResponse(contact, 201);
  } catch {
    return errorResponse("Failed to send message", 500);
  }
}

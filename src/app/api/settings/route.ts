import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/api-helpers";
import { requireAdmin } from "@/lib/api-auth";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, unknown> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return successResponse(map);
  } catch {
    return successResponse({});
  }
}

export async function PUT(request: NextRequest) {
  const session = await requireAdmin();
  if (session instanceof Response) return session;

  try {
    const body = await request.json();
    const results: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      const setting = await prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as Prisma.InputJsonValue },
        create: { key, value: value as Prisma.InputJsonValue },
      });
      results[key] = setting.value;
    }
    return successResponse(results);
  } catch {
    return errorResponse("Failed to save settings", 500);
  }
}

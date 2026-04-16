import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const response = await prisma.file.findUnique({
      where: {
        id: id!,
      },
    });
    return NextResponse.json({
      chat: response?.chat,
      title: response?.name,
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching documents" });
  }
}

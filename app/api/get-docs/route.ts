import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    console.log(id);
    const documents = await prisma.file.findMany({
      where: {
        userId: id!,
      },
    });
    return NextResponse.json({ documents, status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching documents" });
  }
}

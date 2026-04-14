import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const documents = await prisma.file.findMany();
    return NextResponse.json({ documents, status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error fetching documents" });
  }
}

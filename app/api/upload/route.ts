import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let { fileId, fileName, userId } = await request.json();
    if (!fileName) {
      fileName = "New document";
    }
    await prisma.file.create({
      data: {
        id: fileId,
        name: fileName,
        userId: userId,
        uploadedAt: new Date(),
      },
    });
    return NextResponse.json({
      message: "Uploaded successfully!",
      status: 201,
    });
  } catch (err) {
    return NextResponse.json({ message: "Error uploading file" + err });
  }
}

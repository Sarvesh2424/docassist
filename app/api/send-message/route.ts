import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const { chat, id } = await request.json();
    console.log(id)
    await prisma.file.update({
      where: {
        id: id,
      },
      data: {
        chat: chat,
      },
    });
    return NextResponse.json({
      message: "Message sent successfully",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({ message: "Error sending message"+err });
  }
}

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    console.log("userId", userId, "title", title);
    const response = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    console.log("response", response);
    return new NextResponse(JSON.stringify(response), { status: 201 });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

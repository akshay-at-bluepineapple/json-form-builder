import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Form submitted:", body);

  return NextResponse.json({
    message: "Form received successfully",
    data: body,
  });
}

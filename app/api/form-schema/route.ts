import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let storedSchema: any = null; // simple in-memory storage

export async function POST(req: Request) {
  const body = await req.json();
  storedSchema = body;
  return NextResponse.json({ message: "Schema saved" });
}

export async function GET() {
  if (!storedSchema) {
    return NextResponse.json({ message: "No schema yet" }, { status: 404 });
  }
  return NextResponse.json(storedSchema);
}

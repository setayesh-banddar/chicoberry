import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import path from "path";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: segments } = await params;
    const filePath = path.join(process.cwd(), "public", "uploads", ...segments);
    const s = await stat(filePath);
    if (!s.isFile()) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const buffer = await readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeMap: Record<string, string> = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".svg": "image/svg+xml",
    };
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mimeMap[ext] || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

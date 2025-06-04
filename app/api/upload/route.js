import { NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pic");

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Generate unique filename with .webp extension
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await sharp(buffer)
      .resize(600, 600, { fit: "inside", withoutEnlargement: true }) // Resize but maintain aspect ratio
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toFile(filepath);

    return NextResponse.json({ filename });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    );    
  }
}
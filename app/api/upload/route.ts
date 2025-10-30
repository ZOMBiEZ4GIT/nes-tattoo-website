import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type (images only)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid file type. Please upload an image (JPEG, PNG, WebP, or HEIC).",
        },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "File too large. Maximum size is 10MB.",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", "coverups");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `coverup_${timestamp}_${randomString}.${extension}`;
    const filepath = join(uploadsDir, filename);

    // Save file to disk
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/coverups/${filename}`;

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully",
        url: publicUrl,
        filename,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload file. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

// Configure file upload size limit (10MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

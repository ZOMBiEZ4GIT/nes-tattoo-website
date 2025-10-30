import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for booking data
export interface BookingFormData {
  bookingType: "custom" | "coverup";
  style?: string;
  designDescription?: string;
  coverupPhoto?: string; // Base64 encoded image or file path
  size?: string;
  placement?: string;
  dates: string[];
  name: string;
  email: string;
  phone?: string;
}

// Server-side validation helper
function validateBookingData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.bookingType || !["custom", "coverup"].includes(data.bookingType)) {
    errors.push("Valid booking type is required (custom or coverup)");
  }

  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required");
  }

  if (!data.dates || !Array.isArray(data.dates) || data.dates.length === 0) {
    errors.push("At least one preferred date is required");
  }

  // Conditional validation based on booking type
  if (data.bookingType === "custom") {
    if (!data.designDescription || data.designDescription.trim().length < 10) {
      errors.push("Design description must be at least 10 characters");
    }
  }

  if (data.bookingType === "coverup" && !data.coverupPhoto) {
    errors.push("Cover-up photo is required for cover-up bookings");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json();

    // Validate the booking data
    const validation = validateBookingData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Check if artist email is configured
    const artistEmail = process.env.ARTIST_EMAIL || "noreply@example.com";

    // Format the email content
    const emailSubject = `New ${body.bookingType === "custom" ? "Custom Tattoo" : "Cover-Up"} Booking Request`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0A0A0A; background: #FFFFFF; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
          .header { text-align: center; padding-bottom: 30px; border-bottom: 2px solid #0A0A0A; margin-bottom: 30px; }
          .header h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 32px; font-weight: 300; margin: 0; color: #0A0A0A; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6B6B6B; margin-bottom: 10px; }
          .section-content { font-size: 16px; color: #0A0A0A; margin: 0; }
          .booking-type { display: inline-block; background: #0A0A0A; color: #FFFFFF; padding: 8px 16px; font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
          .footer { margin-top: 40px; padding-top: 30px; border-top: 1px solid #E5E5E5; text-align: center; font-size: 14px; color: #6B6B6B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NES TATTOO</h1>
            <p style="margin: 10px 0 0; color: #6B6B6B; font-size: 16px;">New Booking Request</p>
          </div>

          <div class="booking-type">${body.bookingType === "custom" ? "Custom Work" : "Cover-Up"}</div>

          <div class="section">
            <div class="section-title">Client Information</div>
            <p class="section-content"><strong>Name:</strong> ${body.name}</p>
            <p class="section-content"><strong>Email:</strong> ${body.email}</p>
            ${body.phone ? `<p class="section-content"><strong>Phone:</strong> ${body.phone}</p>` : ""}
          </div>

          ${body.style ? `
          <div class="section">
            <div class="section-title">Style Preference</div>
            <p class="section-content">${body.style}</p>
          </div>
          ` : ""}

          ${body.designDescription ? `
          <div class="section">
            <div class="section-title">Design Description</div>
            <p class="section-content">${body.designDescription}</p>
          </div>
          ` : ""}

          ${body.size ? `
          <div class="section">
            <div class="section-title">Size</div>
            <p class="section-content">${body.size}</p>
          </div>
          ` : ""}

          ${body.placement ? `
          <div class="section">
            <div class="section-title">Placement</div>
            <p class="section-content">${body.placement}</p>
          </div>
          ` : ""}

          <div class="section">
            <div class="section-title">Preferred Dates</div>
            <p class="section-content">${body.dates.join(", ")}</p>
          </div>

          ${body.coverupPhoto ? `
          <div class="section">
            <div class="section-title">Cover-Up Photo</div>
            <p class="section-content">A cover-up photo was attached to this booking request.</p>
          </div>
          ` : ""}

          <div class="footer">
            <p>This booking was submitted via nestattoo.com</p>
            <p style="margin-top: 15px;">Reply directly to this email to contact the client.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "NES TATTOO Booking <bookings@resend.dev>", // Update this when you have a custom domain
      to: [artistEmail],
      replyTo: body.email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend email error:", error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send booking request. Please try again or contact us directly.",
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again.",
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests for CORS (if needed)
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

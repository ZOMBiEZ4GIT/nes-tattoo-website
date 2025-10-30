import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Type definitions for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Server-side validation helper
function validateContactData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push("Valid email address is required");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate the contact data
    const validation = validateContactData(body);
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
    const emailSubject = body.subject || `New Contact Form Message from ${body.name}`;

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
          .message-content { background: #F5F5F5; padding: 20px; border-left: 3px solid #0A0A0A; margin-top: 10px; font-size: 16px; line-height: 1.8; }
          .footer { margin-top: 40px; padding-top: 30px; border-top: 1px solid #E5E5E5; text-align: center; font-size: 14px; color: #6B6B6B; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NES TATTOO</h1>
            <p style="margin: 10px 0 0; color: #6B6B6B; font-size: 16px;">New Contact Form Message</p>
          </div>

          <div class="section">
            <div class="section-title">From</div>
            <p class="section-content"><strong>${body.name}</strong></p>
            <p class="section-content">${body.email}</p>
          </div>

          ${body.subject ? `
          <div class="section">
            <div class="section-title">Subject</div>
            <p class="section-content">${body.subject}</p>
          </div>
          ` : ""}

          <div class="section">
            <div class="section-title">Message</div>
            <div class="message-content">${body.message.replace(/\n/g, "<br>")}</div>
          </div>

          <div class="footer">
            <p>This message was sent via nestattoo.com contact form</p>
            <p style="margin-top: 15px;">Reply directly to this email to respond to ${body.name}.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "NES TATTOO Contact <contact@resend.dev>", // Update this when you have a custom domain
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
          message: "Failed to send message. Please try again or contact us directly.",
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        emailId: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
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

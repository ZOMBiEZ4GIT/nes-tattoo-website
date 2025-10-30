# NES TATTOO - API & Backend Setup Guide

This guide explains how to set up the backend API routes and email notifications for the NES TATTOO website.

## Overview

The website includes three API endpoints:
1. **`/api/booking`** - Handles tattoo booking form submissions
2. **`/api/contact`** - Handles contact form submissions
3. **`/api/upload`** - Handles cover-up photo uploads

All endpoints send email notifications via [Resend](https://resend.com).

---

## Prerequisites

1. **Node.js 18+** installed
2. **Resend account** - Sign up at [https://resend.com](https://resend.com)
3. **Email address** for receiving booking/contact notifications

---

## Setup Instructions

### Step 1: Install Dependencies

All dependencies are already installed via `npm install`, including:
- `resend` - Email API service

### Step 2: Create Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your configuration:
   ```env
   # Resend API Key
   # Get from: https://resend.com/api-keys
   RESEND_API_KEY=re_your_actual_api_key_here

   # Artist Email (where notifications will be sent)
   ARTIST_EMAIL=your-email@example.com
   ```

### Step 3: Get Your Resend API Key

1. Go to [https://resend.com/api-keys](https://resend.com/api-keys)
2. Click **"Create API Key"**
3. Name it (e.g., "NES TATTOO Production")
4. Copy the API key (starts with `re_`)
5. Paste it into your `.env.local` file

### Step 4: Configure Email Address

In `.env.local`, set `ARTIST_EMAIL` to the email address where you want to receive booking and contact notifications.

```env
ARTIST_EMAIL=nes@nestattoo.com
```

### Step 5: Test the Setup

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000/booking](http://localhost:3000/booking)

3. Fill out the booking form and submit

4. Check your email inbox for the notification

---

## API Endpoints Documentation

### POST /api/booking

Handles tattoo booking form submissions.

**Request Body:**
```json
{
  "bookingType": "custom" | "coverup",
  "style": "Minimalist | Geometric | Traditional | Blackwork | Other",
  "designDescription": "Description of desired tattoo...",
  "coverupPhoto": "/uploads/coverups/photo.jpg", // (coverup only)
  "size": "Small | Medium | Large | Sleeve",
  "placement": "Arm, back, etc...",
  "dates": ["2025-11-01", "2025-11-05"],
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234" // (optional)
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking request submitted successfully",
  "emailId": "abc123..."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"] // (400 only)
}
```

---

### POST /api/contact

Handles general contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Question about pricing", // (optional)
  "message": "I'd like to know more about..."
}
```

**Response:** Same structure as `/api/booking`

---

### POST /api/upload

Handles file uploads for cover-up photos.

**Request:** `multipart/form-data` with file field named `file`

**Accepted File Types:**
- `image/jpeg`
- `image/jpg`
- `image/png`
- `image/webp`
- `image/heic`

**Max File Size:** 10MB

**Success Response (200):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "url": "/uploads/coverups/coverup_1234567890_abc123.jpg",
  "filename": "coverup_1234567890_abc123.jpg"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Invalid file type. Please upload an image (JPEG, PNG, WebP, or HEIC)."
}
```

---

## Email Templates

### Booking Email

Sent to `ARTIST_EMAIL` when a booking is submitted.

**Subject:** `New Custom Tattoo Booking Request` or `New Cover-Up Booking Request`

**Contents:**
- Booking type badge (Custom Work / Cover-Up)
- Client information (name, email, phone)
- Style preference
- Design description
- Size & placement
- Preferred dates
- Cover-up photo indicator (if applicable)

**Reply-To:** Client's email address for easy responses

---

### Contact Email

Sent to `ARTIST_EMAIL` when a contact form is submitted.

**Subject:** User-provided subject or `New Contact Form Message from [Name]`

**Contents:**
- Sender's name and email
- Subject line
- Message content (formatted with line breaks)

**Reply-To:** Sender's email address

---

## File Upload Storage

Cover-up photos are stored in:
```
public/uploads/coverups/
```

**Filename Format:** `coverup_[timestamp]_[random].jpg`

Example: `coverup_1698765432_abc123.jpg`

**Public URL:** `/uploads/coverups/coverup_1698765432_abc123.jpg`

---

## Server-Side Validation

All API routes include server-side validation:

### Booking Validation
- ✅ `bookingType` must be "custom" or "coverup"
- ✅ `name` must be at least 2 characters
- ✅ `email` must be valid format
- ✅ `dates` array must have at least one date
- ✅ `designDescription` required for custom (min 10 chars)
- ✅ `coverupPhoto` required for cover-up bookings

### Contact Validation
- ✅ `name` must be at least 2 characters
- ✅ `email` must be valid format
- ✅ `message` must be at least 10 characters

### Upload Validation
- ✅ File type must be image (JPEG, PNG, WebP, HEIC)
- ✅ File size must be ≤ 10MB

---

## Troubleshooting

### Emails Not Sending

1. **Check Resend API Key**
   - Verify `.env.local` has the correct API key
   - Make sure it starts with `re_`
   - Regenerate the key if needed

2. **Check Artist Email**
   - Verify `ARTIST_EMAIL` is set correctly
   - Check spam folder

3. **Check Console Logs**
   - Run `npm run dev` in terminal
   - Submit a form
   - Look for error messages in the console

### File Uploads Not Working

1. **Check File Size**
   - Max 10MB
   - Compress large images

2. **Check File Type**
   - Must be JPEG, PNG, WebP, or HEIC
   - Not supported: GIF, BMP, TIFF

3. **Check Directory Permissions**
   - Ensure `public/uploads/coverups/` directory is writable
   - Created automatically by the upload route

### Validation Errors

Check the `errors` array in the response for specific validation failures:

```json
{
  "success": false,
  "errors": [
    "Valid email address is required",
    "Design description must be at least 10 characters"
  ]
}
```

---

## Production Deployment

### Environment Variables

When deploying to production (DigitalOcean, Vercel, etc.), set these environment variables:

1. `RESEND_API_KEY` - Your Resend API key
2. `ARTIST_EMAIL` - Email for notifications

### Custom Email Domain (Optional)

By default, emails are sent from `bookings@resend.dev` and `contact@resend.dev`.

To use a custom domain (e.g., `bookings@nestattoo.com`):

1. Add and verify your domain in Resend dashboard
2. Update the `from` field in API routes:

```typescript
// In app/api/booking/route.ts
from: "NES TATTOO Booking <bookings@nestattoo.com>",

// In app/api/contact/route.ts
from: "NES TATTOO Contact <contact@nestattoo.com>",
```

---

## Security Considerations

1. **Never commit `.env.local`** - It contains sensitive API keys
2. **File upload directory** - Files are public; consider adding authentication for sensitive uploads
3. **Rate limiting** - Consider adding rate limiting in production to prevent spam
4. **CORS** - API routes include OPTIONS handlers for CORS support

---

## Next Steps

- [ ] Test booking form end-to-end
- [ ] Test contact form
- [ ] Test file upload with cover-up booking
- [ ] Verify emails are received
- [ ] Check email formatting on mobile devices
- [ ] Set up custom email domain (optional)
- [ ] Add rate limiting for production (recommended)

---

**Need Help?**

- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Next.js API Routes: [https://nextjs.org/docs/app/building-your-application/routing/route-handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    // Enforce JSON content-type
    const contentType = req.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const body = (await req.json()) as {
      name?: unknown;
      email?: unknown;
      message?: unknown;
    };

    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    // Validate required fields
    if (!name || name.length === 0) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || email.length === 0) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Length guards
    if (name.length > 200 || email.length > 320 || message.length > 1000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    // Sanitize for HTML email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Service temporarily unavailable." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);

    const fromAddress =
      process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    await resend.emails.send({
      from: `CanaryBox Waitlist <${fromAddress}>`,
      to: [process.env.RESEND_TO_EMAIL ?? "admin@canary-box.com"],
      reply_to: email,
      subject: `New Waitlist Sign-up: ${safeName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Waitlist Sign-up</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;max-width:600px;">
          <!-- Header -->
          <tr>
            <td style="background:#0f172a;padding:28px 32px;border-bottom:3px solid #f59e0b;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#f59e0b;">CanaryBox</p>
              <h1 style="margin:6px 0 0;font-size:20px;font-weight:800;color:#f1f5f9;">New Waitlist Sign-up</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 24px;font-size:14px;color:#475569;">Someone just joined the CanaryBox pilot waitlist. Here are their details:</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px 0 0 6px;font-weight:700;color:#0f172a;width:110px;">Name</td>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-left:none;border-radius:0 6px 6px 0;color:#1e293b;">${safeName}</td>
                </tr>
                <tr><td colspan="2" style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px 0 0 6px;font-weight:700;color:#0f172a;">Email</td>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-left:none;border-radius:0 6px 6px 0;color:#1e293b;">${safeEmail}</td>
                </tr>
                ${
                  safeMessage
                    ? `<tr><td colspan="2" style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px 0 0 6px;font-weight:700;color:#0f172a;vertical-align:top;">Building</td>
                  <td style="padding:12px 16px;background:#f8fafc;border:1px solid #e2e8f0;border-left:none;border-radius:0 6px 6px 0;color:#1e293b;line-height:1.6;">${safeMessage}</td>
                </tr>`
                    : ""
                }
              </table>
              <div style="margin-top:28px;padding:16px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;">
                <p style="margin:0;font-size:13px;color:#92400e;">
                  <strong>Next step:</strong> Reply directly to this email to reach ${safeName}.
                </p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                Sent from the CanaryBox Pilot Waitlist &middot; ${new Date().toUTCString()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist submission error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please try again later." },
      { status: 500 }
    );
  }
}

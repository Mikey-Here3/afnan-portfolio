import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, collaborationType, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!collaborationType || typeof collaborationType !== "string") {
      return NextResponse.json(
        { error: "Please select a collaboration category." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a brief project message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    // In production, integration with Resend / Nodemailer / Webhook can be plugged in here.
    // For now, record the valid inquiry safely:
    console.log("[INQUIRY_RECEIVED]", {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      collaborationType,
      messageLength: message.length,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. Afnan will review your project details and get back to you.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[CONTACT_API_ERROR]", error);
    return NextResponse.json(
      { error: "Server error processing your inquiry. Please try again or reach out via Instagram." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY || "missing");
        const { name, email, project } = await request.json();

        if (!name || !email || !project) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // You can use this for testing, later change to your verified domain
            to: "muneebazhar42@gmail.com",
            replyTo: email, // This allows you to reply directly to the person who contacted you
            subject: `New contact from ${name}`,
            html: `
                <h2>New contact request from your portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Project:</strong></p>
                <p>${project.replace(/\n/g, "<br/>")}</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
    } catch (error) {
        console.error("Error in /api/contact:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const { name, email, project } = await request.json();

        if (!name || !email || !project) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
            to: "muneebazhar42@gmail.com",
            subject: `New contact from ${name}`,
            text: `You have a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\nProject details:\n${project}`,
            html: `<h2>New contact request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Project:</strong></p><p>${project.replace(/\n/g, "<br/>")}</p>`,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error in /api/contact:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}

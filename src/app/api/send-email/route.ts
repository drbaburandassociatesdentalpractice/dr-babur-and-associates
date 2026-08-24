import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log('📨 API route called: /api/send-email');

  try {
    const body = await request.json();
    const { name, email, phone, dentist, service, message, date, time } = body;

    // Validate required fields
    if (!name || !email || !phone || !dentist || !service || !date || !time) {
      console.log('❌ Missing fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('✅ All fields present');
    console.log('📧 Patient Email:', email);
    console.log('📧 Admin Email:', process.env.ADMIN_EMAIL);

    const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy');

    // Create transporter using your Gmail
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER, // drbaburandassociates@gmail.com
        pass: process.env.SMTP_PASS, // App password
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log('✅ SMTP connected successfully');

    // ============ ADMIN EMAIL (goes to drbaburandassociates@gmail.com) ============
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Appointment Request</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          }
          .header {
            background: linear-gradient(135deg, #173782 0%, #22255C 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; }
          .header .badge {
            display: inline-block;
            background: #F7F700;
            color: #000000;
            padding: 4px 16px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 8px;
          }
          .content { padding: 30px; }
          .content h2 { color: #173782; font-size: 20px; margin-bottom: 5px; }
          .content .subtitle { color: #6B7280; font-size: 14px; margin-bottom: 20px; }
          .divider { border: none; height: 2px; background: #F7F700; margin: 20px 0; }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin: 20px 0;
          }
          .info-item { background: #F8FAFC; padding: 12px 16px; }
          .info-item .label {
            font-size: 11px;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
          }
          .info-item .value {
            font-size: 15px;
            color: #173782;
            font-weight: 600;
            margin-top: 2px;
          }
          .message-box {
            background: #F8FAFC;
            padding: 16px;
            margin: 16px 0;
            border-left: 3px solid #F7F700;
          }
          .message-box p { color: #374151; font-size: 14px; line-height: 1.6; }
          .footer {
            background: #F8FAFC;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
          }
          .footer p { color: #6B7280; font-size: 12px; margin: 2px 0; }
          .btn-group { display: flex; gap: 12px; flex-wrap: wrap; margin: 16px 0; }
          .btn {
            padding: 10px 24px;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
          }
          .btn-primary { background: #173782; color: #ffffff; }
          .btn-yellow { background: #F7F700; color: #000000; }
          .btn-green { background: #25D366; color: #ffffff; }
          .action-box {
            background: #F0FDF4;
            padding: 12px 16px;
            border-left: 3px solid #22C55E;
            margin: 16px 0;
          }
          .action-box p { color: #166534; font-size: 13px; margin: 0; }
          @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; }
            .content { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦷 Dr. Babur &amp; Associates</h1>
            <div class="badge">New Appointment Request</div>
          </div>
          <div class="content">
            <h2>Appointment Details</h2>
            <p class="subtitle">A new patient has requested an appointment. Please confirm within 24 hours.</p>
            <hr class="divider" />
            <div class="info-grid">
              <div class="info-item">
                <div class="label">Patient Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="info-item">
                <div class="label">Contact Number</div>
                <div class="value">${phone}</div>
              </div>
              <div class="info-item">
                <div class="label">Email Address</div>
                <div class="value">${email}</div>
              </div>
              <div class="info-item">
                <div class="label">Appointment Date</div>
                <div class="value">${formattedDate}</div>
              </div>
              <div class="info-item">
                <div class="label">Preferred Time</div>
                <div class="value">${time}</div>
              </div>
              <div class="info-item">
                <div class="label">Service Required</div>
                <div class="value">${service}</div>
              </div>
              <div class="info-item" style="grid-column: 1 / -1;">
                <div class="label">Preferred Dentist</div>
                <div class="value">${dentist}</div>
              </div>
            </div>
            ${message ? `
              <div class="message-box">
                <div class="label" style="font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                  Patient's Notes
                </div>
                <p>${message}</p>
              </div>
            ` : ''}
            <hr class="divider" />
            <div class="btn-group">
              <a href="tel:${phone}" class="btn btn-primary">📞 Call Patient</a>
              <a href="mailto:${email}" class="btn btn-yellow">✉️ Email Patient</a>
              <a href="https://wa.me/${phone.replace(/\s/g, '')}" class="btn btn-green">💬 WhatsApp</a>
            </div>
            <div class="action-box">
              <p>✅ <strong>Action Required:</strong> Please confirm this appointment with the patient.</p>
            </div>
          </div>
          <div class="footer">
            <p>Dr. Babur &amp; Associates Dental Practice</p>
            <p>11-C, 9th Commercial Lane, Zamzama Blvd, DHA Phase 5, Karachi</p>
            <p style="margin-top: 8px; font-size: 13px; color: #173782;">
              📞 +92 21 3583 2633 | 💬 +92 334 8222296
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // ============ PATIENT CONFIRMATION EMAIL ============
    const patientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 2px 20px rgba(0,0,0,0.05);
          }
          .header {
            background: linear-gradient(135deg, #173782 0%, #22255C 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 { color: #ffffff; font-size: 24px; font-weight: 700; }
          .header .tagline { color: #F7F700; font-size: 14px; margin-top: 4px; }
          .content { padding: 30px; }
          .content h2 { color: #173782; font-size: 22px; margin-bottom: 8px; }
          .content .greeting { color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
          .divider { border: none; height: 2px; background: #F7F700; margin: 20px 0; }
          .appointment-card { background: #F8FAFC; padding: 20px; margin: 16px 0; }
          .appointment-card .row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #E5E7EB;
          }
          .appointment-card .row:last-child { border-bottom: none; }
          .appointment-card .label { color: #6B7280; font-size: 14px; }
          .appointment-card .value { color: #173782; font-weight: 600; font-size: 14px; }
          .info-box {
            background: #F0FDF4;
            padding: 16px;
            border-left: 3px solid #22C55E;
            margin: 16px 0;
          }
          .info-box p { color: #166534; font-size: 14px; margin: 4px 0; }
          .location-box {
            background: #F8FAFC;
            padding: 16px;
            margin: 16px 0;
            border-left: 3px solid #F7F700;
          }
          .location-box p { color: #374151; font-size: 14px; margin: 4px 0; }
          .cta-button {
            display: inline-block;
            background: #173782;
            color: #ffffff;
            padding: 12px 32px;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            margin: 16px 0;
          }
          .footer {
            background: #F8FAFC;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
          }
          .footer p { color: #6B7280; font-size: 12px; margin: 2px 0; }
          .emergency-note {
            background: #FEF2F2;
            padding: 12px 16px;
            margin: 16px 0;
            border-left: 3px solid #DC2626;
          }
          .emergency-note p { color: #991B1B; font-size: 13px; margin: 0; }
          @media (max-width: 600px) {
            .appointment-card .row { flex-direction: column; padding: 10px 0; }
            .content { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🦷 Dr. Babur &amp; Associates</h1>
            <div class="tagline">Your Smile is Our Priority</div>
          </div>
          <div class="content">
            <h2>Appointment Request Received</h2>
            <p class="greeting">Dear <strong>${name}</strong>,</p>
            <p class="greeting" style="margin-top: -10px;">
              Thank you for choosing Dr. Babur &amp; Associates. We have received your appointment request
              and will confirm it with you within 24 hours.
            </p>
            <hr class="divider" />
            <h3 style="color: #173782; font-size: 16px; margin-bottom: 12px;">Appointment Details</h3>
            <div class="appointment-card">
              <div class="row">
                <span class="label">📅 Date</span>
                <span class="value">${formattedDate}</span>
              </div>
              <div class="row">
                <span class="label">⏰ Time</span>
                <span class="value">${time}</span>
              </div>
              <div class="row">
                <span class="label">👨‍⚕️ Dentist</span>
                <span class="value">${dentist}</span>
              </div>
              <div class="row">
                <span class="label">🦷 Service</span>
                <span class="value">${service}</span>
              </div>
            </div>
            <div class="info-box">
              <p>✅ We will confirm your appointment via phone or email within 24 hours.</p>
              <p>📌 Please arrive 10 minutes before your scheduled time.</p>
            </div>
            <div class="location-box">
              <p><strong>📍 Clinic Location</strong></p>
              <p>11-C, 9th Commercial Lane, Zamzama Boulevard (behind OKRA), DHA Phase 5, Karachi</p>
              <p style="margin-top: 8px; color: #173782; font-weight: 600;">
                📞 +92 21 3583 2633 | 💬 +92 334 8222296
              </p>
            </div>
            <div class="emergency-note">
              <p>🚨 <strong>Emergency:</strong> For urgent dental care, call us at +92 21 3583 2633.</p>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <a href="tel:+923348222296" class="cta-button">📞 Contact Us</a>
            </div>
          </div>
          <div class="footer">
            <p>Dr. Babur &amp; Associates Dental Practice</p>
            <p>11-C, 9th Commercial Lane, Zamzama Blvd, DHA Phase 5, Karachi</p>
            <p style="margin-top: 6px; font-size: 13px; color: #173782;">
              📞 +92 21 3583 2633 | 💬 +92 334 8222296
            </p>
            <p style="margin-top: 10px; font-size: 10px; color: #9CA3AF;">
              © ${new Date().getFullYear()} Dr. Babur &amp; Associates. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // ============ SEND ADMIN EMAIL (to drbaburandassociates@gmail.com) ============
    await transporter.sendMail({
      from: `"Dr. Babur & Associates" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL, // drbaburandassociates@gmail.com
      subject: `🦷 New Appointment Request - ${name}`,
      html: adminHtml,
    });
    console.log('✅ Admin email sent to:', process.env.ADMIN_EMAIL);

    // ============ SEND PATIENT CONFIRMATION EMAIL ============
    await transporter.sendMail({
      from: `"Dr. Babur & Associates" <${process.env.SMTP_USER}>`,
      to: email, // Patient's email
      subject: '✅ Appointment Request Received - Dr. Babur & Associates',
      html: patientHtml,
    });
    console.log('✅ Patient confirmation email sent to:', email);

    return NextResponse.json(
      { success: true, message: 'Emails sent successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('❌ Error:', error.message);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
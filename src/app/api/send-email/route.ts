import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { format, isBefore, startOfDay } from "date-fns";

import {
  dentists,
  services,
  dentistServices,
  unavailableWeekdays,
  timeSlots,
  type DentistValue,
  type ServiceValue,
  type TimeSlot,
} from "@/lib/constants/appointment-data";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP configuration is incomplete.",
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

function getDentist(value: string) {
  return dentists.find(
    (dentist) => dentist.value === value,
  );
}

function getService(value: string) {
  return services.find(
    (service) => service.value === value,
  );
}

function isValidDentist(
  value: string,
): value is DentistValue {
  return dentists.some(
    (dentist) => dentist.value === value,
  );
}

function isValidService(
  value: string,
): value is ServiceValue {
  return services.some(
    (service) => service.value === value,
  );
}

function isValidTime(
  value: string,
): value is TimeSlot {
  return timeSlots.some(
    (time) => time === value,
  );
}

function isValidAppointmentDate(
  dentist: DentistValue,
  dateString: string,
) {
  const date = new Date(
    `${dateString}T00:00:00`,
  );

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  // No past dates.
  if (
    isBefore(
      startOfDay(date),
      startOfDay(new Date()),
    )
  ) {
    return false;
  }

  const unavailableDays =
    unavailableWeekdays[dentist];

  if (
    unavailableDays.some(
      (day) => day === date.getDay(),
    )
  ) {
    return false;
  }

  return true;
}

export async function POST(
  request: Request,
) {
  console.log(
    "📨 Appointment API called",
  );

  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      dentist,
      service,
      message,
      date,
      time,
    } = body ?? {};

    /*
     * Basic validation
     */
    if (
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide your full name.",
        },
        { status: 400 },
      );
    }

    if (
      typeof email !== "string" ||
      !email.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide your email address.",
        },
        { status: 400 },
      );
    }

    if (
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      return NextResponse.json(
        {
          error:
            "Please provide your phone number.",
        },
        { status: 400 },
      );
    }

    if (
      typeof dentist !== "string" ||
      !isValidDentist(dentist)
    ) {
      return NextResponse.json(
        {
          error:
            "Please select a valid dentist.",
        },
        { status: 400 },
      );
    }

    if (
      typeof service !== "string" ||
      !isValidService(service)
    ) {
      return NextResponse.json(
        {
          error:
            "Please select a valid treatment.",
        },
        { status: 400 },
      );
    }

    if (
      typeof date !== "string" ||
      !date
    ) {
      return NextResponse.json(
        {
          error:
            "Please select an appointment date.",
        },
        { status: 400 },
      );
    }

    if (
      typeof time !== "string" ||
      !isValidTime(time)
    ) {
      return NextResponse.json(
        {
          error:
            "Please select a valid appointment time.",
        },
        { status: 400 },
      );
    }

    /*
     * Check whether the selected treatment
     * belongs to the selected dentist.
     */
    const allowedServices =
      dentistServices[dentist];

    if (
      !allowedServices.some(
        (allowedService) =>
          allowedService === service,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "The selected treatment is not available with this dentist.",
        },
        { status: 400 },
      );
    }

    /*
     * Validate dentist availability.
     */
    if (
      !isValidAppointmentDate(
        dentist,
        date,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "The selected dentist is not available on this date.",
        },
        { status: 400 },
      );
    }

    const selectedDentist =
      getDentist(dentist);

    const selectedService =
      getService(service);

    if (
      !selectedDentist ||
      !selectedService
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid appointment details.",
        },
        { status: 400 },
      );
    }

    /*
     * SMTP
     */
    const transporter =
      createTransporter();

    const smtpUser =
      process.env.SMTP_USER;

    const adminEmail =
      process.env.ADMIN_EMAIL ||
      smtpUser;

    if (!smtpUser || !adminEmail) {
      throw new Error(
        "Email configuration is incomplete.",
      );
    }

    const clinicName =
      "Dr. Babur & Associates Dental Practice";

    const clinicAddress =
      "11-C, 9th 3rd Zamzama Commercial Lane, behind OKRA restaurant, DHA Phase 5, Karachi, Pakistan";

    const clinicPhone =
      "+92 334 8222296";

    /*
     * Optional public logo URL.
     *
     * Add EMAIL_LOGO_URL to .env.local
     * when you have your deployed logo URL.
     */
    const logoUrl =
      process.env.EMAIL_LOGO_URL || "";

    const appointmentDate =
      new Date(`${date}T00:00:00`);

    const formattedDate =
      format(
        appointmentDate,
        "EEEE, MMMM d, yyyy",
      );

    const safeMessage =
      typeof message === "string"
        ? message.trim()
        : "";

    /*
     * Logo HTML
     */
    const logoHtml = logoUrl
      ? `
        <div style="margin-bottom: 24px;">
          <img
            src="${logoUrl}"
            alt="${clinicName}"
            style="display:block;max-width:180px;height:auto;"
          />
        </div>
      `
      : "";

    /*
     * Admin email
     */
    const adminHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#171717;">
        ${logoHtml}

        <h2 style="margin:0 0 8px;font-size:24px;">
          New Appointment Request
        </h2>

        <p style="margin:0 0 24px;color:#666;">
          A new online appointment request has been submitted.
        </p>

        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;">
          <h3 style="margin:0 0 16px;font-size:16px;">
            Patient Information
          </h3>

          <p style="margin:8px 0;">
            <strong>Name:</strong>
            ${name.trim()}
          </p>

          <p style="margin:8px 0;">
            <strong>Email:</strong>
            ${email.trim()}
          </p>

          <p style="margin:8px 0;">
            <strong>Phone:</strong>
            ${phone.trim()}
          </p>

          <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0;" />

          <h3 style="margin:0 0 16px;font-size:16px;">
            Appointment Details
          </h3>

          <p style="margin:8px 0;">
            <strong>Dentist:</strong>
            ${selectedDentist.label}
          </p>


          <p style="margin:8px 0;">
            <strong>Treatment:</strong>
            ${selectedService.label}
          </p>

          <p style="margin:8px 0;">
            <strong>Date:</strong>
            ${formattedDate}
          </p>

          <p style="margin:8px 0;">
            <strong>Time:</strong>
            ${time}
          </p>

          ${
            safeMessage
              ? `
                <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0;" />

                <h3 style="margin:0 0 12px;font-size:16px;">
                  Patient Message
                </h3>

                <p style="margin:0;white-space:pre-wrap;color:#444;">
                  ${safeMessage}
                </p>
              `
              : ""
          }
        </div>

        <p style="margin:24px 0 0;color:#777;font-size:13px;">
          ${clinicName}<br />
          ${clinicAddress}<br />
          ${clinicPhone}
        </p>
      </div>
    `;

    /*
     * Patient confirmation email
     */
    const patientHtml = `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;color:#171717;">
        ${logoHtml}

        <h2 style="margin:0 0 8px;font-size:24px;">
          Appointment Request Received
        </h2>

        <p style="margin:0 0 24px;color:#666;">
          Dear ${name.trim()},
        </p>

        <p style="line-height:1.7;">
          Thank you for contacting
          ${clinicName}.
          We have received your appointment request.
        </p>

        <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin:24px 0;">
          <p style="margin:8px 0;">
            <strong>Dentist:</strong>
            ${selectedDentist.label}
          </p>

          <p style="margin:8px 0;">
            <strong>Treatment:</strong>
            ${selectedService.label}
          </p>

          <p style="margin:8px 0;">
            <strong>Date:</strong>
            ${formattedDate}
          </p>

          <p style="margin:8px 0;">
            <strong>Time:</strong>
            ${time}
          </p>
        </div>

        <p style="line-height:1.7;">
          Please note that this is an appointment request,
          not a confirmed booking. Our team will contact
          you to confirm the appointment.
        </p>

        <p style="margin-top:24px;line-height:1.7;">
          Regards,<br />
          <strong>${clinicName}</strong><br />
          ${clinicAddress}<br />
          ${clinicPhone}
        </p>
      </div>
    `;

    /*
     * Send admin email.
     */
    await transporter.sendMail({
      from: `"${clinicName}" <${smtpUser}>`,
      to: adminEmail,
      replyTo: email.trim(),
      subject: `New Appointment Request — ${name.trim()}`,
      html: adminHtml,
    });

    /*
     * Send patient confirmation.
     */
    await transporter.sendMail({
      from: `"${clinicName}" <${smtpUser}>`,
      to: email.trim(),
      subject: "Appointment Request Received",
      html: patientHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Appointment request sent successfully.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "Appointment email error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to send your appointment request right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
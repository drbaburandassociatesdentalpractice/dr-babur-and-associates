"use client";

import { AppointmentForm } from './appointment-form';

export const ContactSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div id='contact' className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-dental-yellow/10 text-dental-dark-blue text-sm font-semibold px-4 py-1.5 rounded-none mb-4">
            Appointment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-dental-dark-blue">
            Book Your Visit
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Schedule your appointment online and we'll confirm it within 24 hours. 
            We look forward to welcoming you!
          </p>
        </div>

        <AppointmentForm />
      </div>
    </section>
  );
};
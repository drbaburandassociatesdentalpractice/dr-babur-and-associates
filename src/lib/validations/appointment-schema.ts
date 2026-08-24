import { z } from 'zod';

export const appointmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15, 'Phone number is too long'),
  dentist: z.string().min(1, 'Please select a dentist'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
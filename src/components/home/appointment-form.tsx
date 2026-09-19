"use client";

import { useEffect, useMemo, useState } from "react";
import { format, isBefore, startOfDay } from "date-fns";
import {
  CalendarIcon,
  CheckCircle2,
  Clock3,
  Stethoscope,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  dentists,
  services,
  dentistServices,
  unavailableWeekdays,
  timeSlots,
} from "@/lib/constants/appointment-data";

import {
  appointmentSchema,
  type AppointmentFormData,
} from "@/lib/validations/appointment-schema";

type SubmittedAppointment = {
  dentist: string;
  service: string;
  date: string;
  time: string;
};

export function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] =
    useState<SubmittedAppointment | null>(null);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dentist: "",
      service: "",
      date: "",
      time: "",
      message: "",
      terms: false,
    },
  });

  const selectedDentist = form.watch("dentist");
  const selectedService = form.watch("service");
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");

  const errors = form.formState.errors;

  const availableServices = useMemo(() => {
    if (!selectedDentist) return [];

    const allowedServices =
      dentistServices[
        selectedDentist as keyof typeof dentistServices
      ];

    if (!allowedServices) return [];

    return services.filter((service) =>
      allowedServices.some(
        (allowedService) => allowedService === service.value,
      ),
    );
  }, [selectedDentist]);

  useEffect(() => {
    if (!selectedDentist) return;

    form.setValue("service", "");
    form.setValue("date", "");
    form.setValue("time", "");
  }, [selectedDentist, form]);

  const isDateUnavailable = (date: Date) => {
    if (!selectedDentist) return true;

    if (isBefore(startOfDay(date), startOfDay(new Date()))) {
      return true;
    }

    const unavailableDays =
      unavailableWeekdays[
        selectedDentist as keyof typeof unavailableWeekdays
      ];

    if (!unavailableDays) return false;

    return unavailableDays.some((day) => day === date.getDay());
  };

  const handleDentistChange = (value: string) => {
    form.setValue("dentist", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("service", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("date", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("time", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleServiceChange = (value: string) => {
    form.setValue("service", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date || isDateUnavailable(date)) return;

    form.setValue("date", format(date, "yyyy-MM-dd"), {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("time", "", {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onSubmit = async (values: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          dentist: values.dentist,
          service: values.service,
          date: values.date,
          time: values.time,
          message: values.message?.trim() || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.error ||
            "Unable to send your appointment request.",
        );
      }

      setSubmittedAppointment({
        dentist: values.dentist,
        service: values.service,
        date: values.date,
        time: values.time,
      });

      form.reset();
      setShowSuccess(true);

      toast.success("Appointment request sent successfully.");
    } catch (error) {
      console.error("Appointment submission error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDateValue = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : undefined;

  const selectedDentistInfo = dentists.find(
    (dentist) => dentist.value === submittedAppointment?.dentist,
  );

  const selectedServiceInfo = services.find(
    (service) => service.value === submittedAppointment?.service,
  );

  const submittedDateValue = submittedAppointment?.date
    ? new Date(`${submittedAppointment.date}T00:00:00`)
    : undefined;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="w-full rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-7 lg:p-8">

          {/* HEADER */}

          <div className="mb-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#6E9CCE]">
              Appointment request
            </p>

            <h2 className="mt-1.5 text-2xl font-light tracking-[-0.035em] text-black sm:text-3xl">
              Book your visit
            </h2>

            <p className="mt-1.5 text-sm leading-5 text-black/45">
              Choose your dentist, treatment, preferred date and appointment time.
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >

            {/* PATIENT INFORMATION */}

            <section className="space-y-3.5">
              <div>
                <h3 className="text-sm font-medium text-black">
                  Patient information
                </h3>

                <p className="mt-0.5 text-xs text-black/40">
                  Tell us how we can contact you.
                </p>
              </div>

              <div className="grid w-full gap-3.5 sm:grid-cols-2">

                {/* NAME */}

                <div className="w-full space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-xs font-medium text-black/60"
                  >
                    Full name
                  </label>

                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.name}
                    className="h-11 w-full rounded-xl border-black/10 shadow-none focus-visible:border-[#6E9CCE] focus-visible:ring-[#6E9CCE]/20"
                  />

                  {errors.name?.message && (
                    <p className="text-xs text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* PHONE */}

                <div className="w-full space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-xs font-medium text-black/60"
                  >
                    Phone number
                  </label>

                  <Input
                    id="phone"
                    {...form.register("phone")}
                    type="tel"
                    placeholder="+92 300 1234567"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.phone}
                    className="h-11 w-full rounded-xl border-black/10 shadow-none focus-visible:border-[#6E9CCE] focus-visible:ring-[#6E9CCE]/20"
                  />

                  {errors.phone?.message && (
                    <p className="text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL */}

              <div className="w-full space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-black/60"
                >
                  Email address
                </label>

                <Input
                  id="email"
                  {...form.register("email")}
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  aria-invalid={!!errors.email}
                  className="h-11 w-full rounded-xl border-black/10 shadow-none focus-visible:border-[#6E9CCE] focus-visible:ring-[#6E9CCE]/20"
                />

                {errors.email?.message && (
                  <p className="text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </section>

            {/* APPOINTMENT DETAILS */}

            <section className="space-y-3.5">
              <div>
                <h3 className="text-sm font-medium text-black">
                  Appointment details
                </h3>

                <p className="mt-0.5 text-xs text-black/40">
                  Select a dentist first. Available treatments will automatically update.
                </p>
              </div>

              <div className="grid w-full gap-3.5 sm:grid-cols-2">

                {/* DENTIST */}

                <div className="min-w-0 w-full space-y-1.5">
                  <label
                    htmlFor="dentist"
                    className="text-xs font-medium text-black/60"
                  >
                    Dentist
                  </label>

                  <Select
                    value={selectedDentist}
                    onValueChange={handleDentistChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger
                      id="dentist"
                      className="h-11 w-full min-w-0 rounded-xl border-black/10 bg-white shadow-none focus:ring-[#6E9CCE]/20"
                      aria-invalid={!!errors.dentist}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <Stethoscope className="h-4 w-4 shrink-0 text-[#6E9CCE]" />

                        <SelectValue
                          placeholder="Select a dentist"
                          className="truncate"
                        />
                      </div>
                    </SelectTrigger>

                    <SelectContent className="max-w-(--radix-select-trigger-width)">
                      {dentists.map((dentist) => (
                        <SelectItem
                          key={dentist.value}
                          value={dentist.value}
                        >
                          {dentist.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.dentist?.message && (
                    <p className="text-xs text-red-600">
                      {errors.dentist.message}
                    </p>
                  )}
                </div>

                {/* TREATMENT */}

                <div className="min-w-0 w-full space-y-1.5">
                  <label
                    htmlFor="service"
                    className="text-xs font-medium text-black/60"
                  >
                    Treatment
                  </label>

                  <Select
                    value={selectedService}
                    onValueChange={handleServiceChange}
                    disabled={!selectedDentist || isSubmitting}
                  >
                    <SelectTrigger
                      id="service"
                      className="h-11 w-full min-w-0 rounded-xl border-black/10 bg-white shadow-none focus:ring-[#6E9CCE]/20"
                      aria-invalid={!!errors.service}
                    >
                      <SelectValue
                        placeholder={
                          selectedDentist
                            ? "Select a treatment"
                            : "Select a dentist first"
                        }
                        className="truncate"
                      />
                    </SelectTrigger>

                    <SelectContent className="max-w-(--radix-select-trigger-width)">
                      {availableServices.map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.service?.message && (
                    <p className="text-xs text-red-600">
                      {errors.service.message}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* DATE + TIME */}

            <section className="grid w-full gap-3.5 md:grid-cols-2">

              {/* DATE */}

              <div className="min-w-0 w-full space-y-1.5">
                <label className="text-xs font-medium text-black/60">
                  Appointment date
                </label>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!selectedDentist || isSubmitting}
                      className={`h-11 w-full min-w-0 justify-between rounded-xl border-black/10 bg-white px-4 font-normal shadow-none ${
                        !selectedDate
                          ? "text-black/35"
                          : "text-black"
                      }`}
                    >
                      <span className="min-w-0 truncate">
                        {selectedDateValue
                          ? format(selectedDateValue, "PPP")
                          : selectedDentist
                            ? "Select a date"
                            : "Select a dentist first"}
                      </span>

                      <CalendarIcon className="h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={selectedDateValue}
                      onSelect={handleDateChange}
                      disabled={isDateUnavailable}
                    />
                  </PopoverContent>
                </Popover>

                {selectedDentist === "dr-babur" && (
                  <p className="text-[10px] leading-4 text-black/35">
                    Unavailable Sunday, Wednesday and Saturday.
                  </p>
                )}

                {selectedDentist === "dr-haroon" && (
                  <p className="text-[10px] leading-4 text-black/35">
                    Unavailable Sunday.
                  </p>
                )}

                {errors.date?.message && (
                  <p className="text-xs text-red-600">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* TIME */}

              <div className="min-w-0 w-full space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="time"
                    className="text-xs font-medium text-black/60"
                  >
                    Appointment time
                  </label>

                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-black/35">
                    <Clock3 className="h-3 w-3" />
                    4–7 PM
                  </span>
                </div>

                <Select
                  value={selectedTime}
                  onValueChange={(value) =>
                    form.setValue("time", value, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                  disabled={
                    !selectedDate ||
                    !selectedDentist ||
                    isSubmitting
                  }
                >
                  <SelectTrigger
                    id="time"
                    className="h-11 w-full min-w-0 rounded-xl border-black/10 bg-white shadow-none focus:ring-[#6E9CCE]/20"
                    aria-invalid={!!errors.time}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <Clock3 className="h-4 w-4 shrink-0 text-[#6E9CCE]" />

                      <SelectValue
                        placeholder={
                          !selectedDentist
                            ? "Select a dentist first"
                            : !selectedDate
                              ? "Select a date first"
                              : "Select a preferred time"
                        }
                        className="truncate"
                      />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="max-w-(--radix-select-trigger-width)">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.time?.message && (
                  <p className="text-xs text-red-600">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </section>

            {/* MESSAGE */}

            <section className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-xs font-medium text-black/60"
              >
                Message{" "}
                <span className="font-normal text-black/30">
                  (optional)
                </span>
              </label>

              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Tell us anything you'd like the dentist to know..."
                className="min-h-22.5 w-full resize-none rounded-xl border-black/10 shadow-none focus-visible:border-[#6E9CCE] focus-visible:ring-[#6E9CCE]/20"
                disabled={isSubmitting}
                aria-invalid={!!errors.message}
              />

              {errors.message?.message && (
                <p className="text-xs text-red-600">
                  {errors.message.message}
                </p>
              )}
            </section>

            {/* TERMS */}

            <div className="rounded-xl bg-black/2.5 p-3.5">
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  {...form.register("terms")}
                  disabled={isSubmitting}
                  className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-black/20 accent-[#6E9CCE]"
                />

                <label
                  htmlFor="terms"
                  className="cursor-pointer text-xs leading-5 text-black/50"
                >
                  I understand that this is an appointment request and not a confirmed booking.
                </label>
              </div>

              {errors.terms?.message && (
                <p className="mt-1.5 text-xs text-red-600">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}

            <Button
              type="submit"
              size="lg"
              className="h-11 w-full rounded-full bg-black text-sm font-medium text-white hover:bg-[#173782]"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Sending request..."
                : "Request appointment"}
            </Button>

            <p className="text-center text-[10px] leading-4 text-black/30">
              This is a tentative appointment request. Our clinic will contact you by phone within 24 hours to confirm.
            </p>
          </form>
        </div>
      </motion.div>

      {/* SUCCESS DIALOG */}

      <Dialog
        open={showSuccess}
        onOpenChange={setShowSuccess}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#6E9CCE]/10">
              <CheckCircle2 className="h-7 w-7 text-[#6E9CCE]" />
            </div>

            <DialogTitle className="text-xl">
              Appointment request received
            </DialogTitle>

            <DialogDescription className="pt-2 leading-6">
              Thank you. Your appointment request has been submitted successfully.
            </DialogDescription>
          </DialogHeader>

          {submittedAppointment && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/10 bg-black/2 p-4 text-sm">
                <div className="space-y-3">
                  {selectedDentistInfo && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-black/40">
                        Dentist
                      </span>

                      <span className="text-right font-medium text-black">
                        {selectedDentistInfo.label}
                      </span>
                    </div>
                  )}

                  {selectedServiceInfo && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-black/40">
                        Treatment
                      </span>

                      <span className="text-right font-medium text-black">
                        {selectedServiceInfo.label}
                      </span>
                    </div>
                  )}

                  {submittedDateValue && (
                    <div className="flex items-start justify-between gap-4">
                      <span className="shrink-0 text-black/40">
                        Date
                      </span>

                      <span className="text-right font-medium text-black">
                        {format(submittedDateValue, "PPP")}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <span className="shrink-0 text-black/40">
                      Time
                    </span>

                    <span className="text-right font-medium text-black">
                      {submittedAppointment.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#6E9CCE]/20 bg-[#6E9CCE]/5 p-4">
                <p className="text-sm font-medium leading-6 text-black">
                  Your appointment is currently tentative.
                </p>

                <p className="mt-2 text-xs leading-5 text-black/55">
                  The clinic will contact you by phone within 24 hours to confirm your appointment. Until you receive confirmation from the clinic, your appointment is not confirmed.
                </p>
              </div>
            </div>
          )}

          <Button
            type="button"
            onClick={() => {
              setShowSuccess(false);
              setSubmittedAppointment(null);
            }}
            className="h-11 w-full rounded-full bg-black hover:bg-[#173782]"
          >
            Done
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AppointmentForm;
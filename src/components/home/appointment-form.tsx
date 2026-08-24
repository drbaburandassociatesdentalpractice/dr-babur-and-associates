"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  format,
  isSunday,
  isSaturday,
  isMonday,
  parseISO,
  startOfDay,
} from "date-fns";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  AppointmentFormData,
  appointmentSchema,
} from "@/lib/validations/appointment-schema";

import {
  dentists,
  services,
} from "@/lib/constants/appointment-data";

export const AppointmentForm = () => {
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] =
    useState<AppointmentFormData | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dentist: "",
      service: "",
      message: "",
      date: "",
      time: "",
      terms: false,
    },
  });

  const watchDate = watch("date");

  const today = startOfDay(new Date());

  const getAvailableDates = () => {
    const dates = [];

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);

      if (!isSunday(date)) {
        dates.push(date);
      }
    }

    return dates;
  };

  const availableDates = getAvailableDates();

  const getDayType = (date: string) => {
    if (!date) return null;

    const selected = parseISO(date);

    if (isSaturday(selected)) return "saturday";
    if (isMonday(selected)) return "monday";

    return "weekday";
  };

  const getTimeSlots = (date: string) => {
    if (!date) return [];

    const dayType = getDayType(date);

    if (
      dayType === "saturday" ||
      dayType === "monday"
    ) {
      return [
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
      ];
    }

    return [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
      "7:30 PM",
      "8:00 PM",
      "8:30 PM",
    ];
  };

  const onSubmit = async (data: AppointmentFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          dentist: data.dentist,
          service: data.service,
          message: data.message || "",
          date: data.date,
          time: data.time,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData(data);
        setShowSuccessDialog(true);

        reset();
        setSelectedTime("");

        toast.success(
          "Appointment request submitted successfully!"
        );
      } else {
        toast.error(
          "Failed to send appointment request. Please try again."
        );
      }
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    setFormData(null);
  };

  const inputClass = (hasError?: boolean) =>
    `
      h-12
      w-full
      rounded-xl
      border
      bg-white
      pl-11
      pr-4
      text-sm
      text-black
      outline-none
      transition
      duration-200
      placeholder:text-black/30
      focus:border-[#6E9CCE]
      focus:ring-2
      focus:ring-[#6E9CCE]/15
      ${
        hasError
          ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
          : "border-black/10"
      }
    `;

  const labelClass =
    "text-[11px] font-medium text-black/60";

  const selectClass = (hasError?: boolean) =>
    `
      mt-1.5
      h-12
      rounded-xl
      border
      bg-white
      px-4
      text-sm
      shadow-none
      focus:ring-2
      focus:ring-[#6E9CCE]/15
      ${
        hasError
          ? "border-red-400"
          : "border-black/10 focus:border-[#6E9CCE]"
      }
    `;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.1 }}
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-black/10
          bg-white
          shadow-[0_16px_60px_rgba(0,0,0,0.05)]
        "
      >
        <div className="h-1 w-full bg-[#6E9CCE]" />

        <div className="p-5 sm:p-7 lg:p-8">

        

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* Name */}

            <div>
              <Label
                htmlFor="name"
                className={labelClass}
              >
                Full Name <span className="text-red-500">*</span>
              </Label>

              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/25" />

                <Input
                  id="name"
                  placeholder="Enter your full name"
                  className={inputClass(!!errors.name)}
                  {...register("name")}
                />
              </div>

              {errors.name && (
                <ErrorMessage>
                  {errors.name.message}
                </ErrorMessage>
              )}
            </div>

            {/* Email + Phone */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <Label
                  htmlFor="email"
                  className={labelClass}
                >
                  Email Address{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/25" />

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass(!!errors.email)}
                    {...register("email")}
                  />
                </div>

                {errors.email && (
                  <ErrorMessage>
                    {errors.email.message}
                  </ErrorMessage>
                )}
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className={labelClass}
                >
                  Phone Number{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <div className="relative mt-1.5">
                  <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/25" />

                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+92 300 1234567"
                    className={inputClass(!!errors.phone)}
                    {...register("phone")}
                  />
                </div>

                {errors.phone && (
                  <ErrorMessage>
                    {errors.phone.message}
                  </ErrorMessage>
                )}
              </div>

            </div>

            {/* Dentist + Service */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <Label className={labelClass}>
                  Select Dentist{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Select
                  onValueChange={(value) => {
                    setValue("dentist", value);
                    trigger("dentist");
                  }}
                >
                  <SelectTrigger
                    className={selectClass(!!errors.dentist)}
                  >
                    <SelectValue placeholder="Select a dentist" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
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

                {errors.dentist && (
                  <ErrorMessage>
                    {errors.dentist.message}
                  </ErrorMessage>
                )}
              </div>

              <div>
                <Label className={labelClass}>
                  Select Service{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Select
                  onValueChange={(value) => {
                    setValue("service", value);
                    trigger("service");
                  }}
                >
                  <SelectTrigger
                    className={selectClass(!!errors.service)}
                  >
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
                    {services.map((service) => (
                      <SelectItem
                        key={service.value}
                        value={service.value}
                      >
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.service && (
                  <ErrorMessage>
                    {errors.service.message}
                  </ErrorMessage>
                )}
              </div>

            </div>

            {/* Date + Time */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              <div>
                <Label
                  htmlFor="date"
                  className={labelClass}
                >
                  Select Date{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <div className="relative mt-1.5">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-black/25" />

                  <select
                    id="date"
                    aria-invalid={!!errors.date}
                    className={`
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-black
                      outline-none
                      transition
                      focus:border-[#6E9CCE]
                      focus:ring-2
                      focus:ring-[#6E9CCE]/15
                      ${
                        errors.date
                          ? "border-red-400"
                          : "border-black/10"
                      }
                    `}
                    {...register("date")}
                    onChange={(e) => {
                      setValue("date", e.target.value);
                      setValue("time", "");
                      setSelectedTime("");
                      trigger("date");
                      trigger("time");
                    }}
                  >
                    <option value="">
                      Select a date
                    </option>

                    {availableDates.map((date) => {
                      const dateStr = format(
                        date,
                        "yyyy-MM-dd"
                      );

                      return (
                        <option
                          key={dateStr}
                          value={dateStr}
                        >
                          {format(
                            date,
                            "EEEE, MMMM d, yyyy"
                          )}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {errors.date && (
                  <ErrorMessage>
                    {errors.date.message}
                  </ErrorMessage>
                )}

                {watchDate && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-black/40">
                    <Clock className="h-3 w-3" />

                    {isSaturday(parseISO(watchDate)) ||
                    isMonday(parseISO(watchDate))
                      ? "Available 4:00 PM – 7:00 PM"
                      : "Available 9:00 AM – 9:00 PM"}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="time"
                  className={labelClass}
                >
                  Select Time{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <div className="relative mt-1.5">
                  <Clock className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-black/25" />

                  <select
                    id="time"
                    aria-invalid={!!errors.time}
                    disabled={!watchDate}
                    className={`
                      h-12
                      w-full
                      appearance-none
                      rounded-xl
                      border
                      bg-white
                      pl-11
                      pr-4
                      text-sm
                      text-black
                      outline-none
                      transition
                      focus:border-[#6E9CCE]
                      focus:ring-2
                      focus:ring-[#6E9CCE]/15
                      disabled:cursor-not-allowed
                      disabled:bg-black/[0.03]
                      ${
                        errors.time
                          ? "border-red-400"
                          : "border-black/10"
                      }
                    `}
                    value={selectedTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      setValue("time", e.target.value);
                      trigger("time");
                    }}
                  >
                    <option value="">
                      Select a time
                    </option>

                    {getTimeSlots(watchDate).map(
                      (slot) => (
                        <option
                          key={slot}
                          value={slot}
                        >
                          {slot}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {errors.time && (
                  <ErrorMessage>
                    {errors.time.message}
                  </ErrorMessage>
                )}
              </div>

            </div>

            {/* Message */}

            <div>
              <Label
                htmlFor="message"
                className={labelClass}
              >
                Message{" "}
                <span className="font-normal text-black/30">
                  (Optional)
                </span>
              </Label>

              <div className="relative mt-1.5">
                <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-black/25" />

                <Textarea
                  id="message"
                  placeholder="Any specific requirements or symptoms..."
                  className="
                    min-h-[100px]
                    resize-y
                    rounded-xl
                    border
                    border-black/10
                    bg-white
                    pl-11
                    pr-4
                    pt-3.5
                    text-sm
                    shadow-none
                    placeholder:text-black/30
                    focus:border-[#6E9CCE]
                    focus:ring-2
                    focus:ring-[#6E9CCE]/15
                  "
                  {...register("message")}
                />
              </div>

              {errors.message && (
                <ErrorMessage>
                  {errors.message.message}
                </ErrorMessage>
              )}
            </div>

            {/* Terms */}

            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-3.5">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    cursor-pointer
                    accent-[#6E9CCE]
                    focus:ring-2
                    focus:ring-[#6E9CCE]/30
                  "
                  {...register("terms")}
                />

                <div>
                  <Label
                    htmlFor="terms"
                    className="
                      cursor-pointer
                      text-xs
                      font-normal
                      leading-relaxed
                      text-black/50
                    "
                  >
                    I agree to the{" "}
                    <a
                      href="/privacy-policy"
                      className="
                        font-medium
                        text-black
                        underline
                        underline-offset-2
                        transition
                        hover:text-[#6E9CCE]
                      "
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to the processing of my
                    personal data for scheduling my
                    appointment.
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </Label>

                  {errors.terms && (
                    <ErrorMessage>
                      {errors.terms.message}
                    </ErrorMessage>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  h-13
                  w-full
                  rounded-full
                  bg-black
                  px-6
                  text-sm
                  font-medium
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#6E9CCE]
                  focus-visible:ring-2
                  focus-visible:ring-[#6E9CCE]
                  focus-visible:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Submit Appointment Request

                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                )}
              </Button>

              <p className="mt-2 text-center text-[10px] text-black/30">
                <span className="text-red-500">*</span>{" "}
                Required fields · Confirmation within 24 hours
              </p>
            </div>

          </form>
        </div>
      </motion.div>

      {/* Success Dialog */}

      <Dialog
        open={showSuccessDialog}
        onOpenChange={handleCloseDialog}
      >
        <DialogContent className="max-w-md overflow-hidden rounded-[24px] border border-black/10 bg-white p-0 shadow-2xl">

          <div className="h-1 w-full bg-[#6E9CCE]" />

          <div className="p-6 sm:p-7">

            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#6E9CCE]/10">
                  <CheckCircle className="h-7 w-7 text-[#6E9CCE]" />
                </div>
              </div>

              <DialogTitle className="text-center text-2xl font-light tracking-[-0.03em] text-black">
                Appointment request sent
              </DialogTitle>

              <DialogDescription className="pt-2 text-center text-sm leading-relaxed text-black/45">
                Thank you for choosing Dr. Babur &
                Associates. We'll confirm your appointment
                within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/10">
              <div className="border-b border-black/10 bg-black/[0.02] px-4 py-2.5">
                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-black/35">
                  Appointment Summary
                </p>
              </div>

              <div className="divide-y divide-black/10">
                <SummaryRow
                  label="Name"
                  value={formData?.name}
                />

                <SummaryRow
                  label="Date"
                  value={
                    formData?.date
                      ? format(
                          parseISO(formData.date),
                          "EEEE, MMMM d, yyyy"
                        )
                      : ""
                  }
                />

                <SummaryRow
                  label="Time"
                  value={formData?.time}
                />

                <SummaryRow
                  label="Dentist"
                  value={
                    formData?.dentist
                      ? dentists.find(
                          (d) =>
                            d.value === formData.dentist
                        )?.label
                      : ""
                  }
                />

                <SummaryRow
                  label="Service"
                  value={
                    formData?.service
                      ? services.find(
                          (s) =>
                            s.value === formData.service
                        )?.label
                      : ""
                  }
                />
              </div>
            </div>

            <Button
              onClick={handleCloseDialog}
              className="
                mt-5
                h-12
                w-full
                rounded-full
                bg-black
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#6E9CCE]
                focus-visible:ring-2
                focus-visible:ring-[#6E9CCE]
                focus-visible:ring-offset-2
              "
            >
              Done
            </Button>

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ErrorMessage = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-[10px] text-red-500"
    >
      <AlertCircle className="h-3 w-3" />
      {children}
    </p>
  );
};

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => {
  return (
    <div className="flex items-start justify-between gap-5 px-4 py-2.5">
      <span className="shrink-0 text-xs text-black/35">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-black">
        {value}
      </span>
    </div>
  );
};
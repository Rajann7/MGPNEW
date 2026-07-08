import { z } from "zod";

export const mobileSchema = z.object({
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(13, "Enter a valid mobile number")
    .regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
});

export const otpSchema = z.object({
  mobile: z.string().min(10),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name too long"),
  email: z
    .string()
    .email("Enter a valid email address")
    .max(200, "Email too long")
    .optional()
    .or(z.literal("")),
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(13, "Enter a valid mobile number")
    .regex(/^(\+91)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  role: z.enum(["owner", "broker", "builder"], {
    message: "Select a valid role",
  }),
  termsAccepted: z.literal(true, {
    message: "You must accept Terms & Conditions",
  }),
  privacyAccepted: z.literal(true, {
    message: "You must accept the Privacy Policy",
  }),
  marketingOptIn: z.boolean().default(false),
});

export const adminLoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(200, "Password too long"),
});

export type MobileInput = z.infer<typeof mobileSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

/** Normalize mobile: strip +91 prefix, keep 10 digits */
export function normalizeMobile(mobile: string): string {
  return mobile.replace(/^\+91/, "").replace(/\D/g, "").slice(-10);
}

/** Safe redirect URL validation — internal paths only */
export function isSafeRedirectUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  if (!url.startsWith("/")) return false;
  if (url.startsWith("//")) return false;
  try {
    const parsed = new URL(url, "http://localhost");
    if (parsed.hostname !== "localhost") return false;
  } catch {
    return false;
  }
  return true;
}

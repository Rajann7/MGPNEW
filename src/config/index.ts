// ============================================================
// My Gujarat Property — App Configuration
// ============================================================

export const APP_CONFIG = {
  name: "My Gujarat Property",
  shortName: "MGP",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://mygujaratproperty.com",
  supportEmail: "support@mygujaratproperty.com",
  adminLoginPath: "/admin/login",
  defaultLocale: "en",
} as const;

export const SETUP_REQUIRED_MESSAGE =
  "This feature requires provider configuration. Please contact the platform administrator.";

/** Tailwind responsive breakpoint reference (px) */
export const BREAKPOINTS = {
  xs: 320,
  sm: 360,
  md: 768,
  lg: 1024,
  xl: 1366,
} as const;

/** Role display labels */
export const ROLE_LABELS: Record<string, string> = {
  guest: "Guest",
  owner: "Owner",
  broker: "Broker / Agent",
  builder: "Builder / Developer",
  super_admin: "Super Admin",
  admin: "Admin",
  verification_manager: "Verification Manager",
  support_manager: "Support Manager",
  content_manager: "Content Manager",
  seo_manager: "SEO Manager",
  ads_manager: "Ads Manager",
  billing_manager: "Billing Manager",
  payment_manager: "Payment Manager",
  city_manager: "City Manager",
  user_manager: "User Manager",
  notification_manager: "Notification Manager",
  system_manager: "System Manager",
  security_manager: "Security Manager",
  reports_manager: "Reports Manager",
  audit_manager: "Audit Manager",
};

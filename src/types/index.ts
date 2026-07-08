// ============================================================
// My Gujarat Property — Domain Types
// ============================================================

/** Platform-wide feature implementation status */
export type FeatureStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "DONE"
  | "PARTIAL"
  | "BLOCKED"
  | "SETUP_REQUIRED";

/** External provider / API configuration status */
export type ProviderStatus =
  | "NOT_CONFIGURED"
  | "DEV_ONLY"
  | "SETUP_REQUIRED"
  | "CONFIGURED"
  | "TESTING"
  | "ACTIVE"
  | "FAILED"
  | "DISABLED"
  | "BLOCKED";

/** Public-facing user roles */
export type PublicRole = "guest" | "owner" | "broker" | "builder";

/** Internal admin / staff roles */
export type InternalRole =
  | "super_admin"
  | "admin"
  | "verification_manager"
  | "support_manager"
  | "content_manager"
  | "seo_manager"
  | "ads_manager"
  | "billing_manager"
  | "payment_manager"
  | "city_manager"
  | "user_manager"
  | "notification_manager"
  | "system_manager"
  | "security_manager"
  | "reports_manager"
  | "audit_manager";

/** All roles combined */
export type UserRole = PublicRole | InternalRole;

/** Listing / content approval status */
export type ApprovalStatus =
  | "draft"
  | "pending"
  | "need_changes"
  | "approved"
  | "rejected"
  | "paused"
  | "expired"
  | "archived"
  | "deleted";

/** Identity / document verification status */
export type VerificationStatus =
  | "not_started"
  | "pending"
  | "under_review"
  | "need_changes"
  | "verified"
  | "rejected"
  | "expired"
  | "revoked";

/** Standard API / server action response shape */
export type ActionResult<T = null> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// ============================================================
// Auth Types
// ============================================================

export type AccountStatus =
  "active" | "pending" | "suspended" | "banned" | "deleted";
export type StaffStatus =
  "invited" | "active" | "disabled" | "suspended" | "deleted";
export type StaffInviteStatus = "pending" | "accepted" | "expired" | "revoked";
export type RoleChangeStatus =
  "pending" | "approved" | "rejected" | "cancelled";
export type ConsentType =
  "terms" | "privacy" | "otp_data_notice" | "contact_sharing" | "marketing";

/** User profile row */
export interface Profile {
  id: string;
  auth_user_id: string;
  public_role: "owner" | "broker" | "builder";
  full_name: string;
  display_name: string | null;
  email: string | null;
  mobile: string | null;
  mobile_verified: boolean;
  email_verified: boolean;
  account_status: AccountStatus;
  verification_status: VerificationStatus;
  avatar_media_id: string | null;
  city_id: string | null;
  language_preference: "en" | "gu" | "hi";
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/** Public-safe profile (no mobile/email) */
export interface PublicProfile {
  id: string;
  public_role: "owner" | "broker" | "builder";
  display_name: string | null;
  avatar_media_id: string | null;
  city_id: string | null;
  verification_status: VerificationStatus;
  created_at: string;
}

/** Staff profile row */
export interface StaffProfile {
  id: string;
  auth_user_id: string | null;
  email: string;
  full_name: string;
  internal_role: InternalRole;
  staff_status: StaffStatus;
  last_login_at: string | null;
  created_by_staff_id: string | null;
  created_at: string;
  updated_at: string;
  disabled_at: string | null;
}

/** Staff permission row */
export interface StaffPermission {
  id: string;
  staff_profile_id: string;
  module: string;
  can_read: boolean;
  can_create: boolean;
  can_update: boolean;
  can_approve: boolean;
  can_reject: boolean;
  can_delete: boolean;
  can_export: boolean;
  can_bulk_action: boolean;
  can_view_sensitive: boolean;
  can_manage_provider: boolean;
  can_manage_security: boolean;
  can_manage_payment: boolean;
  can_manage_staff: boolean;
  can_manage_feature_flags: boolean;
  can_manage_system: boolean;
}

/** Permission module identifiers (Prompt 07) */
export type PermissionModule =
  | "users"
  | "staff"
  | "properties"
  | "projects"
  | "requirements"
  | "verification"
  | "support"
  | "reports"
  | "fraud"
  | "billing"
  | "payments"
  | "plans"
  | "coupons"
  | "trials"
  | "ads"
  | "notifications"
  | "providers"
  | "settings"
  | "feature_flags"
  | "cms"
  | "blog"
  | "legal"
  | "seo"
  | "locations"
  | "audit_logs"
  | "system_health"
  | "security"
  | "exports";

/** Staff invite row */
export interface StaffInvite {
  id: string;
  email: string;
  internal_role: InternalRole;
  invited_by_staff_id: string | null;
  status: StaffInviteStatus;
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Admin audit log row (Prompt 07) — broad internal action trail */
export interface AdminAuditLog {
  id: string;
  actor_staff_profile_id: string | null;
  actor_internal_role: string | null;
  action: string;
  module: string;
  target_type: string | null;
  target_id: string | null;
  target_profile_id: string | null;
  before_snapshot_safe: Record<string, unknown> | null;
  after_snapshot_safe: Record<string, unknown> | null;
  metadata_safe: Record<string, unknown> | null;
  created_at: string;
}

/** Maker-checker high-risk action request (Prompt 07 foundation) */
export type AdminActionRequestStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "cancelled"
  | "executed"
  | "expired";

export interface AdminActionRequest {
  id: string;
  action_type: string;
  module: string;
  target_type: string | null;
  target_id: string | null;
  requested_by_staff_id: string;
  payload_safe: Record<string, unknown> | null;
  reason: string | null;
  status: AdminActionRequestStatus;
  created_at: string;
  updated_at: string;
}

/** Entity moderation queue row (property/project/requirement — admin view) */
export interface ModerationQueueItem {
  id: string;
  title: string;
  entity_type: "property" | "project" | "requirement";
  status: EntityStatus;
  approval_status: EntityApprovalStatus;
  city_text: string | null;
  submitted_at: string | null;
  created_at: string;
  submitted_by_name: string | null;
}

/** Auth multi-step flow state */
export type AuthStep =
  | "mobile_entry"
  | "otp_verify_login"
  | "registration_form"
  | "otp_verify_register"
  | "complete";

/** Registration form data */
export interface RegistrationData {
  fullName: string;
  email: string;
  mobile: string;
  role: "owner" | "broker" | "builder";
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingOptIn: boolean;
}

/** Auth modal trigger intent */
export type AuthIntent =
  | "login"
  | "inquiry"
  | "contact_reveal"
  | "save"
  | "post_property"
  | "post_requirement"
  | "dashboard";

// ============================================================
// Entity Types — Property, Project, Requirement
// ============================================================

export type EntityStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "need_changes"
  | "approved"
  | "published"
  | "rejected"
  | "paused"
  | "expired"
  | "deleted"
  | "archived";

export type EntityApprovalStatus =
  | "draft"
  | "pending"
  | "under_review"
  | "need_changes"
  | "approved"
  | "rejected";

export type EntityVisibilityStatus =
  "private" | "public" | "hidden" | "paused" | "expired" | "deleted";

export type ContactVisibility =
  | "hidden"
  | "show_after_login"
  | "show_after_approval"
  | "show_to_verified_users"
  | "public";

export type PropertyPurpose =
  "sell" | "rent" | "lease" | "pg" | "business_sale";
export type PropertyCategory =
  | "residential"
  | "commercial"
  | "industrial"
  | "land_plot"
  | "pg_hostel_room"
  | "business";
export type PropertyType = string;

export type ProjectType =
  | "apartment_project"
  | "villa_project"
  | "plotting_project"
  | "commercial_project"
  | "industrial_project"
  | "township_project"
  | "mixed_use_project"
  | "society_project"
  | "industrial_zone_project";
export type ProjectCategory =
  | "residential"
  | "commercial"
  | "industrial"
  | "land_plot"
  | "township"
  | "mixed_use"
  | "society"
  | "industrial_zone";
export type ProjectPurpose = "sell" | "rent" | "lease";

export type RequirementPurpose =
  "buy" | "rent" | "lease" | "pg" | "business_buy";
export type RequirementCategory =
  | "residential"
  | "commercial"
  | "industrial"
  | "land_plot"
  | "pg_hostel_room"
  | "business"
  | "project";

export type AreaUnit =
  "sq_ft" | "sq_m" | "sq_yd" | "acre" | "bigha" | "guntha" | "hectare";

/** Property listing row */
export interface Property {
  id: string;
  owner_profile_id: string;
  created_by_profile_id: string;
  public_role: "owner" | "broker";
  title: string;
  slug: string | null;
  description: string | null;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  property_type: string;
  price: number | null;
  rent_amount: number | null;
  deposit_amount: number | null;
  maintenance_amount: number | null;
  price_negotiable: boolean;
  area_value: number | null;
  area_unit: AreaUnit | null;
  built_up_area: number | null;
  carpet_area: number | null;
  plot_area: number | null;
  land_area: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floor_number: number | null;
  total_floors: number | null;
  furnishing_status:
    "unfurnished" | "semi_furnished" | "fully_furnished" | null;
  property_age: string | null;
  possession_status:
    "ready_to_move" | "under_construction" | "on_request" | null;
  available_from: string | null;
  ownership_type: string | null;
  facing: string | null;
  parking: "none" | "open" | "covered" | "both" | null;
  amenities: string[];
  extra_attributes: Record<string, unknown>;
  city_id: string | null;
  locality_id: string | null;
  society_id: string | null;
  building_name: string | null;
  landmark: string | null;
  address_line: string | null;
  city_text: string | null;
  locality_text: string | null;
  pin_code: string | null;
  map_visibility: "hidden" | "approximate" | "exact";
  contact_visibility: ContactVisibility;
  cover_media_id: string | null;
  media_count: number;
  media_status:
    "no_media" | "pending_upload" | "uploaded" | "processing" | "ready";
  status: EntityStatus;
  approval_status: EntityApprovalStatus;
  visibility_status: EntityVisibilityStatus;
  admin_review_note: string | null;
  rejection_reason: string | null;
  need_changes_reason: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  published_at: string | null;
  paused_at: string | null;
  expires_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Project listing row */
export interface Project {
  id: string;
  builder_profile_id: string;
  created_by_profile_id: string;
  project_name: string;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  project_type: ProjectType;
  category: ProjectCategory;
  purpose: ProjectPurpose;
  price_min: number | null;
  price_max: number | null;
  price_visible: boolean;
  total_area_value: number | null;
  total_area_unit: AreaUnit | null;
  total_towers: number | null;
  total_wings: number | null;
  total_floors: number | null;
  total_units: number | null;
  available_units: number | null;
  unit_configurations: unknown[];
  construction_status: string | null;
  possession_date: string | null;
  launch_date: string | null;
  phase_name: string | null;
  rera_registered: boolean;
  rera_number: string | null;
  rera_status: string | null;
  rera_valid_until: string | null;
  rera_disclaimer_required: boolean;
  amenities: string[];
  specifications: Record<string, unknown>;
  city_id: string | null;
  locality_id: string | null;
  landmark: string | null;
  address_line: string | null;
  city_text: string | null;
  locality_text: string | null;
  pin_code: string | null;
  map_visibility: "hidden" | "approximate" | "exact";
  cover_media_id: string | null;
  video_media_id: string | null;
  brochure_media_id: string | null;
  virtual_tour_url: string | null;
  media_count: number;
  status: EntityStatus;
  approval_status: EntityApprovalStatus;
  visibility_status: EntityVisibilityStatus;
  admin_review_note: string | null;
  rejection_reason: string | null;
  need_changes_reason: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  published_at: string | null;
  paused_at: string | null;
  expires_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Requirement row */
export interface Requirement {
  id: string;
  created_by_profile_id: string;
  public_role: "owner" | "broker";
  title: string;
  slug: string | null;
  description: string | null;
  purpose: RequirementPurpose;
  category: RequirementCategory;
  requirement_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
  rent_min: number | null;
  rent_max: number | null;
  area_min: number | null;
  area_max: number | null;
  area_unit: AreaUnit | null;
  bedrooms_min: number | null;
  bedrooms_max: number | null;
  preferred_floor: string | null;
  furnishing_preference:
    "any" | "unfurnished" | "semi_furnished" | "fully_furnished" | null;
  possession_timeline: string | null;
  preferred_amenities: string[];
  city_id: string | null;
  locality_id: string | null;
  city_text: string | null;
  preferred_localities_text: string | null;
  contact_visibility: ContactVisibility;
  status: EntityStatus;
  approval_status: EntityApprovalStatus;
  visibility_status: EntityVisibilityStatus;
  admin_review_note: string | null;
  rejection_reason: string | null;
  need_changes_reason: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  published_at: string | null;
  paused_at: string | null;
  expires_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Leads / CRM / Proposals / Messages / Site Visits (Prompt 08)
// ============================================================

export type LeadTargetType = "property" | "project" | "requirement";

export type LeadSource =
  | "property_detail_contact"
  | "property_detail_inquiry"
  | "project_detail_contact"
  | "project_detail_inquiry"
  | "requirement_detail_proposal"
  | "requirement_match"
  | "search_card_contact"
  | "profile_contact"
  | "dashboard_manual"
  | "admin_manual"
  | "support_escalation";

export type LeadStatus =
  | "new"
  | "open"
  | "contact_requested"
  | "contact_shared"
  | "contact_denied"
  | "contacted"
  | "interested"
  | "follow_up"
  | "site_visit_requested"
  | "site_visit_scheduled"
  | "proposal_sent"
  | "negotiation"
  | "converted"
  | "lost"
  | "closed"
  | "spam"
  | "blocked"
  | "archived";

export type CrmStage =
  | "new"
  | "contacted"
  | "interested"
  | "follow_up"
  | "site_visit"
  | "proposal"
  | "negotiation"
  | "converted"
  | "lost"
  | "closed";

export interface Lead {
  id: string;
  target_type: LeadTargetType;
  target_id: string;
  requester_profile_id: string;
  receiver_profile_id: string;
  source: LeadSource;
  status: LeadStatus;
  crm_stage: CrmStage;
  requester_message: string | null;
  /** Enquiry-form snapshot fields (participant/staff visibility only). */
  sender_name: string | null;
  profile_phone: string | null;
  lead_phone: string | null;
  phone_source: "profile" | "alternate";
  alternate_phone_used: boolean;
  interest_type: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
}

export type LeadNoteVisibility = "private" | "shared" | "admin";

export interface LeadNote {
  id: string;
  lead_id: string;
  author_profile_id: string | null;
  author_staff_id: string | null;
  visibility: LeadNoteVisibility;
  note: string;
  created_at: string;
}

export type FollowupStatus =
  "pending" | "completed" | "missed" | "cancelled" | "rescheduled";

export interface LeadFollowup {
  id: string;
  lead_id: string;
  profile_id: string;
  due_at: string;
  title: string;
  note: string | null;
  status: FollowupStatus;
  created_at: string;
  updated_at: string;
}

export type CrmEventEntityType = "lead" | "proposal" | "site_visit";

export interface CrmEvent {
  id: string;
  entity_type: CrmEventEntityType;
  entity_id: string;
  event_type: string;
  actor_profile_id: string | null;
  metadata_safe: Record<string, unknown> | null;
  created_at: string;
}

export type ContactRequestStatus =
  | "requested"
  | "pending_owner_response"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled"
  | "blocked";

export type ContactRevealStatus =
  | "not_revealed"
  | "pending"
  | "revealed_to_requester"
  | "revealed_to_owner"
  | "revealed_to_both"
  | "denied"
  | "expired"
  | "revoked";

export interface ContactRequest {
  id: string;
  lead_id: string;
  requester_profile_id: string;
  receiver_profile_id: string;
  status: ContactRequestStatus;
  reveal_status: ContactRevealStatus;
  revealed_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ProposalTargetType = "requirement" | "property" | "project";

export type ProposalStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "shortlisted"
  | "accepted"
  | "rejected"
  | "negotiation"
  | "withdrawn"
  | "expired"
  | "archived";

export interface Proposal {
  id: string;
  proposer_profile_id: string;
  recipient_profile_id: string;
  target_type: ProposalTargetType;
  requirement_id: string | null;
  property_id: string | null;
  project_id: string | null;
  lead_id: string | null;
  title: string;
  message: string | null;
  price_offer: number | null;
  terms_summary: string | null;
  availability_note: string | null;
  valid_until: string | null;
  status: ProposalStatus;
  created_at: string;
  updated_at: string;
}

export type MessageThreadType =
  "lead" | "proposal" | "requirement" | "site_visit" | "support_placeholder";

export interface MessageThread {
  id: string;
  thread_type: MessageThreadType;
  lead_id: string | null;
  proposal_id: string | null;
  participant_a_profile_id: string;
  participant_b_profile_id: string;
  participant_a_last_read_at: string | null;
  participant_b_last_read_at: string | null;
  is_blocked: boolean;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageStatus =
  "sent" | "delivered" | "read" | "failed" | "deleted" | "hidden_by_moderation";

export interface Message {
  id: string;
  thread_id: string;
  sender_profile_id: string;
  body: string;
  status: MessageStatus;
  created_at: string;
}

export type SiteVisitStatus =
  | "requested"
  | "accepted"
  | "scheduled"
  | "rescheduled"
  | "cancelled"
  | "completed"
  | "no_show"
  | "rejected"
  | "expired";

export interface SiteVisit {
  id: string;
  lead_id: string;
  property_id: string | null;
  project_id: string | null;
  requester_profile_id: string;
  host_profile_id: string;
  scheduled_at: string | null;
  meeting_location_type: "at_property" | "office" | "other";
  meeting_note: string | null;
  status: SiteVisitStatus;
  cancel_reason: string | null;
  created_at: string;
  updated_at: string;
}

export type SavedItemType =
  "property" | "project" | "requirement" | "broker_profile" | "builder_profile";

export interface SavedItem {
  id: string;
  profile_id: string;
  item_type: SavedItemType;
  item_id: string;
  created_at: string;
}

export interface SavedSearch {
  id: string;
  profile_id: string;
  title: string;
  query_params: Record<string, unknown>;
  alert_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface RecentlyViewedItem {
  id: string;
  profile_id: string;
  item_type: "property" | "project" | "requirement";
  item_id: string;
  viewed_at: string;
}

export type NotificationType =
  | "new_lead"
  | "contact_requested"
  | "contact_approved"
  | "contact_rejected"
  | "new_message"
  | "proposal_sent"
  | "proposal_viewed"
  | "proposal_accepted"
  | "proposal_rejected"
  | "site_visit_requested"
  | "site_visit_scheduled"
  | "site_visit_rescheduled"
  | "site_visit_cancelled"
  | "followup_due";

export interface AppNotification {
  id: string;
  recipient_profile_id: string;
  notification_type: NotificationType;
  target_type: string | null;
  target_id: string | null;
  title: string;
  body: string | null;
  read_at: string | null;
  created_at: string;
}

export type ReportCategory =
  | "spam"
  | "fraud"
  | "abuse"
  | "wrong_information"
  | "duplicate"
  | "illegal_content"
  | "contact_abuse"
  | "payment_abuse"
  | "harassment"
  | "other";

export interface UserReport {
  id: string;
  reporter_profile_id: string;
  target_type:
    "message" | "thread" | "user" | "property" | "project" | "requirement";
  target_id: string;
  category: ReportCategory;
  description: string | null;
  status: "pending" | "reviewed" | "dismissed" | "actioned";
  created_at: string;
}

export interface UserBlock {
  id: string;
  blocker_profile_id: string;
  blocked_profile_id: string;
  created_at: string;
}

// ============================================================
// Billing / Payment / Subscription / Trial / GST (Prompt 09)
// ============================================================

export type BillingCycle =
  "monthly" | "quarterly" | "yearly" | "one_time" | "trial" | "free";

export interface PlanLimits {
  property_posts_limit?: number;
  project_posts_limit?: number;
  requirement_posts_limit?: number;
  active_listing_limit?: number;
  contact_unlock_limit?: number;
  agent_limit?: number;
  [key: string]: number | undefined;
}

export interface PlanFeatures {
  analytics_access?: boolean;
  public_profile_allowed?: boolean;
  featured_listing_allowed?: boolean;
  ads_allowed?: boolean;
  [key: string]: boolean | undefined;
}

export interface Plan {
  id: string;
  plan_code: string;
  role: PublicRole;
  name: string;
  description: string | null;
  billing_cycle: BillingCycle;
  price_amount: number;
  currency: string;
  gst_inclusive: boolean;
  gst_rate_percent: number;
  is_placeholder_pricing: boolean;
  features: PlanFeatures;
  limits: PlanLimits;
  is_active: boolean;
  is_public: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export type SubscriptionStatus =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "grace"
  | "cancelled"
  | "expired"
  | "paused"
  | "downgraded"
  | "payment_failed"
  | "pending_activation"
  | "admin_granted";

export interface Subscription {
  id: string;
  profile_id: string;
  role: PublicRole;
  plan_id: string | null;
  status: SubscriptionStatus;
  source: "system" | "payment" | "trial" | "admin_grant";
  current_period_start: string | null;
  current_period_end: string | null;
  trial_end_at: string | null;
  grace_start_at: string | null;
  grace_end_at: string | null;
  cancel_at_period_end: boolean;
  cancelled_at: string | null;
  activated_payment_id: string | null;
  granted_by_staff_id: string | null;
  created_at: string;
  updated_at: string;
}

export type PaymentOrderStatus =
  | "created"
  | "checkout_started"
  | "payment_authorized"
  | "payment_captured"
  | "payment_failed"
  | "webhook_verified"
  | "reconciled"
  | "expired"
  | "cancelled";

export interface PaymentOrder {
  id: string;
  profile_id: string;
  role: PublicRole;
  purpose: "subscription" | "add_on" | "renewal";
  plan_id: string | null;
  add_on_id: string | null;
  coupon_id: string | null;
  amount_gross: number;
  discount_amount: number;
  amount_payable: number;
  amount_payable_paise: number;
  currency: string;
  provider: string;
  provider_order_id: string | null;
  status: PaymentOrderStatus;
  idempotency_key: string;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus =
  | "pending"
  | "authorized"
  | "captured"
  | "failed"
  | "refunded"
  | "partially_refunded"
  | "disputed"
  | "chargeback"
  | "cancelled"
  | "verified"
  | "reconciled";

export interface Payment {
  id: string;
  profile_id: string;
  payment_order_id: string | null;
  provider: string;
  provider_payment_id: string | null;
  provider_order_id: string | null;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string | null;
  reconciliation_status: string;
  captured_at: string | null;
  created_at: string;
  updated_at: string;
}

export type InvoiceStatus =
  | "draft"
  | "issued"
  | "paid"
  | "cancelled"
  | "refunded"
  | "partially_refunded"
  | "credit_note_issued"
  | "void";

export interface Invoice {
  id: string;
  invoice_number: string | null;
  profile_id: string;
  payment_id: string | null;
  subscription_id: string | null;
  financial_year: string | null;
  status: InvoiceStatus;
  buyer_legal_name: string | null;
  buyer_gstin: string | null;
  buyer_address: string | null;
  buyer_state_code: string | null;
  place_of_supply: string | null;
  is_b2b: boolean;
  taxable_amount: number;
  cgst_amount: number;
  sgst_amount: number;
  igst_amount: number;
  total_amount: number;
  currency: string;
  notes: string | null;
  issued_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GstProfile {
  id: string;
  profile_id: string;
  legal_name: string | null;
  gstin: string | null;
  address: string | null;
  city: string | null;
  state_code: string | null;
  pin_code: string | null;
  is_b2b: boolean;
  invoice_email: string | null;
  created_at: string;
  updated_at: string;
}

export type TrialStatus =
  "eligible" | "active" | "used" | "expired" | "revoked" | "not_eligible";

export interface Trial {
  id: string;
  profile_id: string;
  role: PublicRole;
  plan_id: string | null;
  status: TrialStatus;
  started_at: string;
  ends_at: string;
  created_at: string;
  updated_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed_amount";
  discount_value: number;
  max_discount: number | null;
  applies_role: PublicRole | null;
  applies_plan_id: string | null;
  min_amount: number;
  usage_limit: number | null;
  per_user_limit: number;
  used_count: number;
  is_active: boolean;
  expires_at: string | null;
}

export interface AddOn {
  id: string;
  add_on_code: string;
  role: PublicRole | null;
  name: string;
  description: string | null;
  price_amount: number;
  currency: string;
  quantity_grant: number;
  feature_key: string;
  is_active: boolean;
  is_public: boolean;
  is_placeholder_pricing: boolean;
  display_order: number;
}

/** Result of a server-side posting/feature gate evaluation. */
export interface GateResult {
  allowed: boolean;
  reason:
    | "ok"
    | "gates_not_enforced"
    | "auth_required"
    | "role_not_allowed"
    | "no_active_plan"
    | "limit_exceeded"
    | "setup_required";
  featureKey?: string;
  limit?: number;
  used?: number;
  planName?: string;
}

// ============================================================
// Canonical actor model (Phase 4 / File 09).
// The nine actor types every authorization decision must use.
// Legacy roles (Buyer, Tenant, Builder Agent, Agency Group,
// Real Estate Group, standalone Agency) are NOT actor types and
// must never be reintroduced (REM-005/REM-009).
// ============================================================

/** Public registration roles — the ONLY roles shown at registration. */
export const PUBLIC_REGISTRATION_ROLES = [
  "owner",
  "broker",
  "builder",
] as const;
export type PublicRegistrationRole = (typeof PUBLIC_REGISTRATION_ROLES)[number];

/** Canonical actor types (File 09). */
export type ActorType =
  | "guest" // unauthenticated visitor
  | "authenticated_account" // valid session, role context not yet resolved/onboarded
  | "owner_principal" // Owner managing own listings
  | "broker_principal" // Broker workspace owner
  | "broker_agent" // invitation-only member of a broker workspace
  | "builder_principal" // Builder/Developer workspace owner
  | "internal_staff" // Admin/internal staff with scoped capabilities
  | "super_admin" // highest internal operator
  | "service_principal"; // jobs/webhooks/cron acting server-side

/** Actor types that may never come from public registration. */
export const NON_REGISTRABLE_ACTORS: readonly ActorType[] = [
  "broker_agent", // invitation-only (accepted broker invitation)
  "internal_staff", // provisioned via internal access management
  "super_admin", // provisioned via internal access management
  "service_principal", // machine identity, never a user account
] as const;

/** Removed legacy role identifiers — resolution must refuse these. */
export const REMOVED_LEGACY_ROLES = [
  "buyer",
  "tenant",
  "builder_agent",
  "agency",
  "agency_group",
  "real_estate_group",
] as const;

export interface ResolvedActor {
  type: ActorType;
  /** profiles.id when a profile exists (null for guest/service). */
  profileId: string | null;
  /** Broker workspace scope for broker_principal/broker_agent. */
  brokerWorkspaceId?: string;
  /** True only when membership came from an accepted invitation. */
  viaInvitation?: boolean;
}

interface ProfileRow {
  id: string;
  public_role: string;
  account_status: string;
}

interface StaffRow {
  id: string;
  is_super_admin: boolean;
}

interface BrokerMembershipRow {
  workspace_broker_profile_id: string;
  status: string;
  invitation_id: string | null;
}

/**
 * Pure actor resolution — DB rows in, actor out. Throws on legacy roles
 * instead of guessing a conversion (Phase 4 rule 10).
 */
export function resolveActor(input: {
  session: { userId: string } | null;
  profile: ProfileRow | null;
  staff: StaffRow | null;
  brokerMembership: BrokerMembershipRow | null;
}): ResolvedActor {
  const { session, profile, staff, brokerMembership } = input;

  if (!session) return { type: "guest", profileId: null };

  if (staff) {
    return {
      type: staff.is_super_admin ? "super_admin" : "internal_staff",
      profileId: profile?.id ?? null,
    };
  }

  if (!profile) return { type: "authenticated_account", profileId: null };

  if (
    (REMOVED_LEGACY_ROLES as readonly string[]).includes(profile.public_role)
  ) {
    throw new Error(
      `[LEGACY_QUARANTINE] Profile ${profile.id} carries removed legacy role "${profile.public_role}". ` +
        "Quarantine the record for manual review — do not guess a role conversion."
    );
  }

  switch (profile.public_role) {
    case "owner":
      return { type: "owner_principal", profileId: profile.id };
    case "builder":
      return { type: "builder_principal", profileId: profile.id };
    case "broker": {
      // Broker Agent exists ONLY through an accepted invitation membership
      // in someone else's broker workspace.
      if (brokerMembership && brokerMembership.status === "active") {
        if (!brokerMembership.invitation_id) {
          throw new Error(
            "[LEGACY_QUARANTINE] Broker membership without an invitation record is invalid: " +
              "Broker Agent is invitation-only. Quarantine for manual review."
          );
        }
        return {
          type: "broker_agent",
          profileId: profile.id,
          brokerWorkspaceId: brokerMembership.workspace_broker_profile_id,
          viaInvitation: true,
        };
      }
      return { type: "broker_principal", profileId: profile.id };
    }
    default:
      throw new Error(
        `[LEGACY_QUARANTINE] Unknown public_role "${profile.public_role}" on profile ${profile.id}. ` +
          "Quarantine for manual review — do not guess."
      );
  }
}

/** Registration validation: only the three public roles are accepted. */
export function isRegistrableRole(
  role: string
): role is PublicRegistrationRole {
  return (PUBLIC_REGISTRATION_ROLES as readonly string[]).includes(role);
}

// ============================================================
// Synthetic actor and workspace fixtures (Phase 3).
// Test-only identities: fake mobiles/emails in reserved ranges,
// no real customer data. Used by unit/integration/E2E suites.
// ============================================================

export type PublicRole = "owner" | "broker" | "builder";

export interface SyntheticActor {
  key: string;
  publicRole: PublicRole | null; // null = internal staff or guest
  fullName: string;
  /** Indian test range 555xxx — never a real subscriber number. */
  mobile: string;
  email: string;
  accountStatus: "active" | "suspended" | "pending";
  isStaff?: boolean;
}

export interface SyntheticWorkspace {
  key: string;
  ownerActorKey: string;
  kind: "owner" | "broker" | "builder";
  displayName: string;
}

export const ACTORS: Record<string, SyntheticActor> = {
  guest: {
    key: "guest",
    publicRole: null,
    fullName: "Guest Visitor",
    mobile: "",
    email: "",
    accountStatus: "active",
  },
  owner1: {
    key: "owner1",
    publicRole: "owner",
    fullName: "Test Owner One",
    mobile: "+915550000001",
    email: "owner1@test.mgp.invalid",
    accountStatus: "active",
  },
  owner2_suspended: {
    key: "owner2_suspended",
    publicRole: "owner",
    fullName: "Test Owner Two (Suspended)",
    mobile: "+915550000002",
    email: "owner2@test.mgp.invalid",
    accountStatus: "suspended",
  },
  broker1: {
    key: "broker1",
    publicRole: "broker",
    fullName: "Test Broker Principal",
    mobile: "+915550000011",
    email: "broker1@test.mgp.invalid",
    accountStatus: "active",
  },
  builder1: {
    key: "builder1",
    publicRole: "builder",
    fullName: "Test Builder One",
    mobile: "+915550000021",
    email: "builder1@test.mgp.invalid",
    accountStatus: "active",
  },
  staff_admin: {
    key: "staff_admin",
    publicRole: null,
    fullName: "Test Staff Admin",
    mobile: "+915550000091",
    email: "staff1@test.mgp.invalid",
    accountStatus: "active",
    isStaff: true,
  },
};

export const WORKSPACES: Record<string, SyntheticWorkspace> = {
  owner1_ws: {
    key: "owner1_ws",
    ownerActorKey: "owner1",
    kind: "owner",
    displayName: "Owner One Workspace",
  },
  broker1_ws: {
    key: "broker1_ws",
    ownerActorKey: "broker1",
    kind: "broker",
    displayName: "Broker One Agency Workspace",
  },
  builder1_ws: {
    key: "builder1_ws",
    ownerActorKey: "builder1",
    kind: "builder",
    displayName: "Builder One Workspace",
  },
};

/** Cross-ownership pairs used by negative permission tests (File 40). */
export const NEGATIVE_ACCESS_CASES = [
  { actor: "owner1", targetWorkspace: "broker1_ws", expect: "denied" },
  { actor: "broker1", targetWorkspace: "builder1_ws", expect: "denied" },
  { actor: "builder1", targetWorkspace: "owner1_ws", expect: "denied" },
  { actor: "guest", targetWorkspace: "owner1_ws", expect: "denied" },
] as const;

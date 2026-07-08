import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Invite — My Gujarat Property",
  robots: { index: false, follow: false },
};

export default function AdminInviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

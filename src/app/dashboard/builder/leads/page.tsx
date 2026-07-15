import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function BuilderLeadsPage() {
  redirect("/dashboard/messages");
}

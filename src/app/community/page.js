import { redirect } from "next/navigation";

// The community is members-only; signed-out visitors go to log in first.
export default function CommunityPage() {
  redirect("/login?next=%2Fcommunity");
}

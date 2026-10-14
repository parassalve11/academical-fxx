import { redirect } from "next/navigation";

// My Learning needs an account; signed-out visitors go to log in first.
export default function LearnPage() {
  redirect("/login?next=%2Flearn");
}

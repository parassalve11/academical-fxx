import AuthShell from "@/components/AuthShell";
import { SignupForm } from "@/components/forms";

export const metadata = { title: "Create your account" };

export default function SignupPage() {
  return (
    <AuthShell>
      <SignupForm />
    </AuthShell>
  );
}

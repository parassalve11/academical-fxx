import AuthShell from "@/components/AuthShell";
import { ForgotForm } from "@/components/forms";

export const metadata = { title: "Reset your password" };

const points = [
  { title: "Secure by design", body: "Reset links are single-use and expire quickly to keep your account safe." },
  { title: "Back to learning fast", body: "Set a new password and pick up your courses right where you left off." },
  { title: "Need help?", body: "Reach our team any time — we're here to keep you on track." },
];

export default function ForgotPasswordPage() {
  return (
    <AuthShell points={points}>
      <ForgotForm />
    </AuthShell>
  );
}

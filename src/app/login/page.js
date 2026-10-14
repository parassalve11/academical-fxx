import AuthShell from "@/components/AuthShell";
import { LoginForm } from "@/components/forms";

export const metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}

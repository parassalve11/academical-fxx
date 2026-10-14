import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("cookies");

export default function CookiesPage() {
  return <LegalPage slug="cookies" />;
}

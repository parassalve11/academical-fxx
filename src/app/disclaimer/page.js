import LegalPage, { legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata("disclaimer");

export default function DisclaimerPage() {
  return <LegalPage slug="disclaimer" />;
}

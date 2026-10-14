import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="wash relative isolate overflow-hidden">
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <Container className="flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-36">
        <p className="tabular font-display text-7xl font-extrabold text-green/20">404</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-green">This page isn&apos;t here</h1>
        <p className="mt-3 max-w-md text-lg text-muted">The link may be old, or the page has moved. Try the courses or head back home.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary px-6 py-3">Go to home</Link>
          <Link href="/courses" className="btn-glass px-6 py-3">Browse courses</Link>
        </div>
      </Container>
    </section>
  );
}

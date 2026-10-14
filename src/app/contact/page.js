import { Clock, GraduationCap, Handshake } from "lucide-react";
import { SocialIcon } from "@/components/Brand";
import { ContactForm } from "@/components/forms";
import { Container, PageHero } from "@/components/ui";
import { socials } from "@/data/site";

export const metadata = {
  title: "Contact us",
  description: "Questions about a course, mentoring, partnerships or support? Send us a message and a real person will get back to you.",
};

const topics = [
  { icon: GraduationCap, title: "Course and learning questions", body: "Not sure where to start, or which programme fits you? We'll point you in the right direction." },
  { icon: Handshake, title: "Partnerships and mentoring", body: "Want to teach with us, collaborate, or partner? Tell us a little about what you have in mind." },
  { icon: Clock, title: "Fast, human replies", body: "We aim to respond to every enquiry within 1–2 business days — no bots, no run-around." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="We'd love to hear from you" intro="Questions about a course, mentoring, partnerships or support? Send us a message and a real person will get back to you." />
      <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-12">
        <section aria-labelledby="form-title" className="glass-thick rounded-[32px] p-6 sm:p-10 lg:col-span-7">
          <h2 id="form-title" className="font-display text-3xl font-bold tracking-tight text-green">Get in touch</h2>
          <p className="mb-8 mt-2 text-muted">The more detail you share, the better we can help.</p>
          <ContactForm />
        </section>

        <div className="grid content-start gap-5 lg:col-span-5">
          {topics.map(({ icon: Icon, title, body }) => (
            <div key={title} className="glass flex gap-4 rounded-[24px] p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green ring-1 ring-green/10">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{body}</p>
              </div>
            </div>
          ))}
          <div className="rounded-[24px] bg-green p-6 text-white">
            <p className="font-display text-lg font-bold">Prefer social?</p>
            <p className="mt-1 text-sm text-white/70">Follow Academiya for market breakdowns, lesson previews and live sessions.</p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="glass-green flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-sm font-semibold hover:bg-white/15">
                    <SocialIcon name={s.icon} className="size-4" /> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

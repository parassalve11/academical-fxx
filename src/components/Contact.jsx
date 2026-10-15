import CommentCollage from "./CommentCollage";
import { ContactForm } from "./forms";

export default function Contact() {
  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="glass-thick grid overflow-hidden rounded-[36px] lg:grid-cols-12">
        <div className="relative flex flex-col p-7 sm:p-10 lg:col-span-5">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_0%_0%,rgb(15_60_57/0.08),transparent_70%)]" aria-hidden="true" />
          <h2 id="contact-title" className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.03em] text-green">
            Get in touch
          </h2>
          <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
            Questions about a course, mentoring, partnerships or support? Send us a message and the team will reply by email.
          </p>
          <p className="mt-6 text-sm text-faint">Prefer chat? Message us on Telegram at @academiya_fx.</p>
          <div className="mt-8 flex-1 lg:min-h-0">
            <CommentCollage />
          </div>
        </div>

        <div className="border-t border-line p-7 sm:p-10 lg:col-span-7 lg:border-l lg:border-t-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

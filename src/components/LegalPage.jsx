import Link from "next/link";
import { Breadcrumbs, Container } from "./ui";
import { legal } from "@/data/content";

const policies = [
  ["terms", "Terms & Conditions"],
  ["privacy", "Privacy Policy"],
  ["refund", "Refund & Cancellation"],
  ["disclaimer", "Risk Disclaimer"],
  ["cookies", "Cookie Policy"],
];

const anchor = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Turn the plain email and policy names in the copy back into links.
function rich(text) {
  return text.split(/(support@academiyafx\.com)/g).map((part, i) =>
    part === "support@academiyafx.com" ? (
      <a key={i} href="mailto:support@academiyafx.com" className="link-quiet">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function legalMetadata(slug) {
  const doc = legal[slug];
  return { title: doc.title, description: doc.intro.slice(0, 160) };
}

export default function LegalPage({ slug }) {
  const doc = legal[slug];
  return (
    <Container className="grid gap-10 pb-20 pt-32 sm:pt-36 lg:grid-cols-12">
      <aside className="lg:col-span-4 xl:col-span-3">
        <div className="grid gap-5 lg:sticky lg:top-24">
          <nav aria-label="Legal and policies" className="glass rounded-[24px] p-3">
            <p className="px-3 pb-2 pt-1 text-xs font-semibold text-muted">Legal and policies</p>
            <ul className="grid gap-0.5">
              {policies.map(([s, label]) => (
                <li key={s}>
                  <Link
                    href={`/${s}`}
                    aria-current={s === slug ? "page" : undefined}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-muted hover:bg-white hover:text-green aria-[current=page]:bg-green aria-[current=page]:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="On this page" className="hidden rounded-[24px] border border-line p-5 lg:block">
            <p className="text-xs font-semibold text-muted">On this page</p>
            <ol className="mt-3 grid gap-2 text-sm">
              {doc.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#${anchor(s.title)}`} className="flex gap-2 text-muted hover:text-green">
                    <span className="tabular w-5 shrink-0 text-faint">{i + 1}.</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>

      <article className="lg:col-span-8 xl:col-span-9">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.title }]} />
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-none tracking-[-0.04em] text-green">{doc.title}</h1>
        <p className="mt-5 max-w-[68ch] text-lg leading-relaxed text-muted">{doc.intro}</p>
        <p className="mt-3 text-sm text-faint">Last updated: {doc.updated}</p>

        <div className="glass mt-10 rounded-[32px] p-6 sm:p-10">
          <div className="grid max-w-[72ch] gap-10">
            {doc.sections.map((s, i) => (
              <section key={s.title} id={anchor(s.title)} className="scroll-mt-28">
                <h2 className="flex gap-3 font-display text-xl font-bold text-green">
                  <span className="tabular text-green/45">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-3 grid gap-3 leading-[1.75] text-ink/80">
                  {s.blocks.map((b, j) =>
                    b.p ? (
                      <p key={j}>{rich(b.p)}</p>
                    ) : (
                      <ul key={j} className="grid gap-2 pl-1">
                        {b.list.map((li) => (
                          <li key={li.slice(0, 40)} className="flex gap-3">
                            <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-green/50" aria-hidden="true" />
                            <span>{rich(li)}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
    </Container>
  );
}

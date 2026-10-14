import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CircleCheck, CirclePlay, GraduationCap, Infinity as InfinityIcon, Layers, Lock, Radio, ShieldCheck, Users } from "lucide-react";
import { Breadcrumbs, Container, CourseThumb, Initials, Stars, PageSkeleton } from "@/components/ui";
import { allCourses, formatPrice, getCourse } from "@/data/content";

export function generateStaticParams() {
  return allCourses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const course = getCourse((await params).slug);
  return course ? { title: course.title, description: course.summary } : {};
}

function PurchaseCard({ course }) {
  return (
    <div className="glass-thick overflow-hidden rounded-[28px]">
      <div className="relative aspect-[16/9]">
        <CourseThumb course={course} sizes="(min-width: 1024px) 400px, 100vw" />
      </div>
      <div className="p-6">
        <p className="flex items-baseline gap-2.5">
          <span className="tabular font-display text-4xl font-bold tracking-tight text-green">{formatPrice(course)}</span>
          {course.was && (
            <>
              <span className="tabular text-lg text-faint line-through">${course.was}</span>
              <span className="rounded-full bg-up/10 px-2 py-0.5 text-xs font-semibold text-up">{Math.round((1 - course.price / course.was) * 100)}% off</span>
            </>
          )}
        </p>
        <Link href={`/signup?next=/courses/${course.slug}`} className="btn-primary mt-5 w-full py-3.5">
          {course.price === 0 ? "Sign up to enrol free" : "Sign up to buy"}
        </Link>
        <p className="mt-3 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href={`/login?next=/courses/${course.slug}`} className="link-quiet">
            Log in
          </Link>
        </p>
        <ul className="mt-5 grid gap-2.5 border-t border-line pt-5 text-sm text-muted">
          <li className="flex items-center gap-2.5">
            <Layers className="size-4 text-green" aria-hidden="true" />
            {course.lessons} {course.lessons === 1 ? "lesson" : "lessons"} across {course.sections.length} {course.sections.length === 1 ? "section" : "sections"}
          </li>
          <li className="flex items-center gap-2.5">
            <InfinityIcon className="size-4 text-green" aria-hidden="true" />
            Lifetime access to course material
          </li>
        </ul>
      </div>
    </div>
  );
}

async function CoursePageContent({ params }) {
  const course = getCourse((await params).slug);
  if (!course) notFound();

  return (
    <>
      <section className="wash relative isolate overflow-hidden border-b border-line">
        <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="grid gap-10 pb-14 pt-32 sm:pt-36 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Breadcrumbs items={[{ label: "Courses", href: "/courses" }, { label: course.category }]} />
            {course.kicker && <p className="font-script text-3xl font-bold text-plum">{course.kicker}</p>}
            <h1 className="mt-1 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[1] tracking-[-0.04em] text-green text-balance">{course.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{course.summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              {course.rating ? (
                <span className="inline-flex items-center gap-2">
                  <Stars value={course.rating} />
                  <span className="tabular font-semibold text-ink">{course.rating.toFixed(1)}</span>({course.reviews} {course.reviews === 1 ? "rating" : "ratings"})
                </span>
              ) : (
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-[#8a5d10]">New course</span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-4" aria-hidden="true" /> <span className="tabular">{course.students}</span> learners
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="size-4" aria-hidden="true" /> <span className="tabular">{course.lessons}</span> lessons
              </span>
            </div>
            <p className="mt-4 text-sm text-muted">
              Taught by <span className="font-semibold text-ink">{course.instructor}</span>
            </p>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-12">
        <aside className="lg:order-2 lg:col-span-5 lg:-mt-[22rem] xl:col-span-4 xl:col-start-9">
          <div className="grid gap-5 lg:sticky lg:top-24">
            <PurchaseCard course={course} />
            <div className="glass rounded-[24px] p-5">
              <p className="text-sm text-muted">Your instructor</p>
              <p className="mt-3 flex items-center gap-3 font-semibold text-ink">
                <Initials name={course.instructor} /> {course.instructor}
              </p>
            </div>
            <p className="flex gap-2.5 rounded-[20px] bg-green-50 px-4 py-3 text-sm leading-relaxed text-green">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              Academiya courses are reviewed for quality before publishing, and previews are always free.
            </p>
          </div>
        </aside>

        <div className="grid content-start gap-14 lg:order-1 lg:col-span-7">
          {course.outcomes.length > 0 && (
            <section aria-labelledby="outcomes-title">
              <h2 id="outcomes-title" className="font-display text-3xl font-bold tracking-tight text-green">What you&apos;ll learn</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 rounded-2xl border border-line bg-white/70 p-4 text-[0.9375rem] leading-snug text-ink">
                    <CircleCheck className="size-5 shrink-0 text-up" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section aria-labelledby="about-title">
            <h2 id="about-title" className="font-display text-3xl font-bold tracking-tight text-green">About this course</h2>
            <div className="mt-5 grid max-w-[68ch] gap-4 text-[1.0625rem] leading-[1.7] text-muted">
              {course.overview.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            {course.requirement && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-3.5 py-1.5 text-sm font-semibold text-green">
                <CircleCheck className="size-4" aria-hidden="true" /> {course.requirement}
              </p>
            )}
          </section>

          <section aria-labelledby="content-title">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="content-title" className="font-display text-3xl font-bold tracking-tight text-green">Course content</h2>
              <p className="text-sm text-muted">
                {course.sections.length} {course.sections.length === 1 ? "section" : "sections"}, {course.lessons} lessons
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              {course.sections.map((s, si) => (
                <details key={s.title} open={si === 0} className="glass group overflow-hidden rounded-[24px]">
                  <summary className="flex cursor-pointer list-none items-start gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <span className="tabular inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-green text-sm font-semibold text-white">{si + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold text-green">{s.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted">{s.intro}</span>
                    </span>
                    <span className="shrink-0 text-sm text-muted">{s.lessons.length} lessons</span>
                  </summary>
                  <ol className="divide-y divide-line border-t border-line">
                    {s.lessons.map((l, li) => {
                      const Icon = l.type === "Video" ? CirclePlay : Radio;
                      return (
                        <li key={`${l.title}-${li}`} className="flex items-center gap-3 px-5 py-3">
                          <Icon className="size-4 shrink-0 text-green/70" aria-hidden="true" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.9375rem] text-ink">{l.title}</span>
                            <span className="block text-xs text-faint">{l.type}</span>
                          </span>
                          <Lock className="size-4 shrink-0 text-faint" aria-label="Unlocks after enrolment" />
                        </li>
                      );
                    })}
                  </ol>
                </details>
              ))}
            </div>
          </section>

          {course.rating && (
            <section aria-labelledby="ratings-title" className="glass flex items-center gap-6 rounded-[24px] p-6">
              <p className="tabular font-display text-5xl font-bold text-green">{course.rating.toFixed(1)}</p>
              <div>
                <h2 id="ratings-title" className="font-semibold text-ink">Learner ratings</h2>
                <Stars value={course.rating} />
                <p className="mt-1 text-sm text-muted">
                  Based on {course.reviews} {course.reviews === 1 ? "rating" : "ratings"}
                </p>
              </div>
            </section>
          )}
        </div>
      </Container>
    </>
  );
}

// URL params are read inside Suspense so navigation can show the shell instantly.
export default function CoursePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CoursePageContent params={params} />
    </Suspense>
  );
}

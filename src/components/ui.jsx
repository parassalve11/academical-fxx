import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight, GraduationCap, Info, Star, Users } from "lucide-react";
import { allCourses, formatPrice } from "@/data/content";

export function Container({ className = "", children }) {
  return <div className={`mx-auto max-w-[1240px] px-4 sm:px-6 ${className}`}>{children}</div>;
}

// Inner-page hero: the same soft green wash and grid as the home hero, compact.
export function PageHero({ title, intro, crumbs, children, aside, size = "md" }) {
  return (
    <section className="wash relative isolate overflow-hidden border-b border-line">
      <div className="grid-lines absolute inset-0 -z-10" aria-hidden="true" />
      <Container className={`relative pb-14 pt-32 sm:pb-16 sm:pt-36 ${aside ? "grid items-end gap-10 lg:grid-cols-12" : ""}`}>
        <div className={aside ? "lg:col-span-7" : "max-w-3xl"}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <h1
            className={`font-display font-extrabold tracking-[-0.04em] text-green text-balance ${
              size === "lg" ? "text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.95]" : "text-[clamp(2.25rem,5vw,3.75rem)] leading-[1]"
            }`}
          >
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
          {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        {items.map((c, i) => (
          <li key={c.label} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-faint" aria-hidden="true" />}
            {c.href ? (
              <Link href={c.href} className="hover:text-green hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-green">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionTitle({ id, title, intro, action, as: Tag = "h2" }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <Tag id={id} className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-tight tracking-[-0.025em] text-green text-balance">
          {title}
        </Tag>
        {intro && <p className="mt-2 leading-relaxed text-muted">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Notice({ children, className = "" }) {
  return (
    <p className={`flex gap-2.5 rounded-2xl border border-green/15 bg-green-50/80 px-4 py-3 text-sm leading-relaxed text-green ${className}`}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Stars({ value, size = "size-4" }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} ${value >= i - 0.25 ? "fill-gold text-gold" : value >= i - 0.75 ? "fill-gold/50 text-gold" : "fill-line text-line"}`} aria-hidden="true" />
      ))}
    </span>
  );
}

export function CourseThumb({ course, sizes, className = "" }) {
  if (course.image) {
    return <Image src={course.image} alt={`${course.title} course artwork`} fill sizes={sizes} className={`object-cover ${className}`} />;
  }
  return (
    <span className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--color-green-50),#f4f1fb)]">
      <BookOpen className="size-10 text-green/50" aria-hidden="true" />
    </span>
  );
}

export function CourseCard({ course }) {
  return (
    <article className="glass group relative flex flex-col overflow-hidden rounded-[28px]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <CourseThumb course={course} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-green ring-1 ring-green/10">{course.category}</span>
        {course.price === 0 && <span className="absolute right-3 top-3 rounded-full bg-green px-2.5 py-1 text-xs font-semibold text-white">Free</span>}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-green">
          <Link href={`/courses/${course.slug}`} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{course.summary}</p>
        <p className="text-sm text-faint">{course.instructor}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          {course.rating ? (
            <span className="inline-flex items-center gap-1.5">
              <Stars value={course.rating} size="size-3.5" />
              <span className="tabular font-semibold text-ink">{course.rating.toFixed(1)}</span>
              <span>({course.reviews})</span>
            </span>
          ) : (
            <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-[#8a5d10]">New</span>
          )}
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1" title="Lessons">
              <GraduationCap className="size-4" aria-hidden="true" />
              <span className="tabular">{course.lessons}</span>
              <span className="sr-only">lessons</span>
            </span>
            <span className="inline-flex items-center gap-1" title="Students">
              <Users className="size-4" aria-hidden="true" />
              <span className="tabular">{course.students}</span>
              <span className="sr-only">students</span>
            </span>
          </span>
        </div>
        <p className="mt-auto flex items-baseline gap-2 border-t border-line pt-4">
          <span className="tabular font-display text-2xl font-bold text-green">{formatPrice(course)}</span>
          {course.was && <span className="tabular text-faint line-through">${course.was}</span>}
        </p>
      </div>
    </article>
  );
}

// Compact course list used as a sidebar on markets, news, calendar and brokers.
export function CourseRail({ title = "Build the skills first", note }) {
  return (
    <aside aria-label="Courses" className="glass overflow-hidden rounded-[28px]">
      <div className="border-b border-line px-5 py-4">
        <p className="font-display text-lg font-bold text-green">{title}</p>
        {note && <p className="mt-0.5 text-sm text-muted">{note}</p>}
      </div>
      <ul className="divide-y divide-line">
        {allCourses.map((c) => (
          <li key={c.slug}>
            <Link href={`/courses/${c.slug}`} className="flex gap-3 px-5 py-4 transition-colors hover:bg-white">
              <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-line">
                <CourseThumb course={c} sizes="64px" />
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{c.title}</span>
                <span className="mt-1 flex items-center gap-3 text-sm">
                  <span className="tabular font-bold text-green">{formatPrice(c)}</span>
                  {c.rating && (
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Star className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                      <span className="tabular">{c.rating.toFixed(1)}</span>
                    </span>
                  )}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/courses" className="link-quiet flex items-center justify-between border-t border-line px-5 py-4 text-sm">
        Browse all courses <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}

export function Initials({ name, className = "size-10 text-sm" }) {
  const letters = name.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-green font-display font-bold text-white ${className}`} aria-hidden="true">
      {letters}
    </span>
  );
}

// Placeholder while a detail page reads its URL params.
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading">
      <section className="wash border-b border-line">
        <Container className="pb-14 pt-32 sm:pt-36">
          <div className="h-4 w-40 animate-pulse rounded-full bg-green/10" />
          <div className="mt-6 h-12 w-full max-w-2xl animate-pulse rounded-2xl bg-green/10" />
          <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-full bg-green/[0.07]" />
        </Container>
      </section>
      <Container className="grid gap-4 py-12">
        <div className="h-64 animate-pulse rounded-[28px] bg-green/[0.06]" />
      </Container>
    </div>
  );
}

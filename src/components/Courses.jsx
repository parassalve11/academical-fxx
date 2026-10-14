import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Infinity as InfinityIcon, Star, Users } from "lucide-react";
import { SectionHeading } from "./Brand";
import { courses } from "@/data/site";

function Rating({ course }) {
  if (!course.rating) {
    return <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-[#b07a1c]">New</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <Star className="size-4 fill-gold text-[#b07a1c]" aria-hidden="true" />
      <span className="tabular font-semibold text-green">{course.rating.toFixed(1)}</span>
      <span className="text-muted">({course.reviews} {course.reviews === 1 ? "review" : "reviews"})</span>
    </span>
  );
}

function Stats({ course }) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted">
      <span className="inline-flex items-center gap-1.5">
        <GraduationCap className="size-4" aria-hidden="true" />
        <span className="tabular">{course.lessons}</span> lessons
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Users className="size-4" aria-hidden="true" />
        <span className="tabular">{course.students}</span> students
      </span>
    </div>
  );
}

function Price({ course, large }) {
  return (
    <p className="flex items-baseline gap-2.5">
      <span className={`tabular font-display font-bold tracking-tight text-green ${large ? "text-4xl" : "text-3xl"}`}>${course.price}</span>
      <span className="tabular text-base text-faint line-through">${course.was}</span>
      <span className="sr-only">reduced from ${course.was}</span>
      <span className="ml-1 rounded-full bg-up/10 px-2 py-0.5 text-xs font-semibold text-up">
        {Math.round((1 - course.price / course.was) * 100)}% off
      </span>
    </p>
  );
}

export default function Courses() {
  const [featured, second] = courses;

  return (
    <section aria-labelledby="courses-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionHeading
        id="courses-title"
        title="Courses traders are taking now"
        intro="Hand-picked, top-enrolled programmes across every market we cover."
        action={
          <Link href="/courses" className="link-quiet inline-flex items-center gap-1.5">
            Browse all courses <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-12">
        {/* Featured */}
        <article className="glass group relative overflow-hidden rounded-[32px] lg:col-span-12 lg:grid lg:grid-cols-12">
          <div className="relative aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={featured.image}
              alt={`${featured.title} course artwork`}
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-green px-3 py-1.5 text-xs font-semibold text-white">
              <InfinityIcon className="size-4" aria-hidden="true" /> Lifetime access
            </span>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-9 lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted">Most enrolled</span>
              <Rating course={featured} />
            </div>
            <div>
              <p className="font-script text-2xl font-bold text-green">{featured.kicker}</p>
              <h3 className="mt-1 font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-green">
                <Link href={`/courses/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 leading-relaxed text-muted">{featured.summary}</p>
            </div>
            <Stats course={featured} />
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <Price course={featured} large />
              <span className="btn-primary relative z-10 px-5 py-2.5 text-sm" aria-hidden="true">
                View course
              </span>
            </div>
          </div>
        </article>

        {/* Second course */}
        <article className="glass group relative overflow-hidden rounded-[28px] lg:col-span-7 sm:grid sm:grid-cols-2">
          <div className="relative aspect-[16/10] sm:aspect-auto">
            <Image src={second.image} alt={`${second.title} course artwork`} fill sizes="(min-width: 1024px) 360px, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">Refreshed edition</span>
              <Rating course={second} />
            </div>
            <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-green">
              <Link href={`/courses/${second.slug}`} className="after:absolute after:inset-0">
                {second.title}
              </Link>
            </h3>
            <p className="text-[0.9375rem] leading-relaxed text-muted">{second.summary}</p>
            <Stats course={second} />
            <div className="mt-auto border-t border-line pt-4">
              <Price course={second} />
            </div>
          </div>
        </article>

        {/* Free entry point */}
        <div className="relative overflow-hidden rounded-[28px] bg-green p-7 text-white lg:col-span-5">
          <p className="font-display text-[1.75rem] font-bold leading-tight tracking-tight text-white text-balance">
            Not sure where to start? Take a free course first.
          </p>
          <p className="mt-3 max-w-sm leading-relaxed text-white/75">
            Create an account, try a lesson and see how we teach before you commit to a full programme.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/courses" className="btn-light px-5 py-3 text-sm">Find a free course</Link>
            <Link href="/signup" className="glass-green inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">Create free account</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

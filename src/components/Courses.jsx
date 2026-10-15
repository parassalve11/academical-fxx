import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, Star, Users } from "lucide-react";
import { SectionHeading } from "./Brand";
import TradingChart from "./TradingChart";
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

function CourseCard({ course, label, hidden }) {
  return (
    <article className="course-slide glass group relative flex flex-col overflow-hidden rounded-[28px]" aria-hidden={hidden || undefined}>
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
        <Image
          src={course.image}
          alt={hidden ? "" : `${course.title} course artwork`}
          fill
          sizes="400px"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted">{label}</span>
          <Rating course={course} />
        </div>
        <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-green">
          <Link href={`/courses/${course.slug}`} tabIndex={hidden ? -1 : undefined} className="after:absolute after:inset-0">
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{course.summary}</p>
        <Stats course={course} />
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <Price course={course} />
          <span className="btn-primary relative z-10 px-4 py-2 text-sm" aria-hidden="true">View</span>
        </div>
      </div>
    </article>
  );
}

function FreeCard({ hidden }) {
  return (
    <div className="course-slide relative flex flex-col overflow-hidden rounded-[28px] bg-green p-7 text-white" aria-hidden={hidden || undefined}>
      <div className="absolute inset-x-0 bottom-0 h-40 opacity-25 [mask-image:linear-gradient(to_top,black,transparent)]" aria-hidden="true">
        <TradingChart className="size-full" width={400} height={160} scale={false} seed={9} count={30} theme="dark" />
      </div>
      <p className="font-script text-2xl font-bold text-lilac">Start free</p>
      <p className="mt-2 font-display text-[1.75rem] font-bold leading-tight tracking-tight text-white text-balance">
        Not sure where to start? Take a free course first.
      </p>
      <p className="mt-3 leading-relaxed text-white/75">
        Create an account, try a lesson and see how we teach before you commit to a full programme.
      </p>
      <div className="relative mt-auto flex flex-wrap gap-3 pt-7">
        <Link href="/courses" tabIndex={hidden ? -1 : undefined} className="btn-light px-5 py-3 text-sm">Find a free course</Link>
        <Link href="/signup" tabIndex={hidden ? -1 : undefined} className="glass-green inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white hover:bg-white/15">Create free account</Link>
      </div>
    </div>
  );
}

function Slides({ hidden }) {
  const [featured, second] = courses;
  return (
    <>
      <CourseCard course={featured} label="Most enrolled" hidden={hidden} />
      <CourseCard course={second} label="Refreshed edition" hidden={hidden} />
      <FreeCard hidden={hidden} />
    </>
  );
}

export default function Courses() {
  return (
    <section aria-labelledby="courses-title" className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
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
      </div>

      {/* Three cards loop continuously; the set repeats so the strip never runs
          out on wide screens. Hover or focus pauses it. */}
      <div className="course-marquee mt-14">
        <div className="course-marquee-track">
          <Slides />
          <Slides hidden />
          <Slides hidden />
          <Slides hidden />
        </div>
      </div>
    </section>
  );
}

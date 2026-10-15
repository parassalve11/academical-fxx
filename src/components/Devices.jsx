import Image from "next/image";
import { Mic, PlayCircle, Video } from "lucide-react";
import TradingChart from "./TradingChart";
import { courses } from "@/data/site";

// Device mockups drawn in CSS, filled with Academiya's own artwork and a
// TradingView-style chart, in place of generic office stock photography.

export function Laptop({ children, className = "" }) {
  return (
    <div className={`device-laptop ${className}`}>
      <div className="device-laptop-lid">
        <span className="device-laptop-cam" aria-hidden="true" />
        <div className="device-screen">{children}</div>
      </div>
      <div className="device-laptop-base" aria-hidden="true" />
    </div>
  );
}

export function Phone({ children, className = "" }) {
  return (
    <div className={`device-phone ${className}`}>
      <span className="device-phone-island" aria-hidden="true" />
      <div className="device-screen">{children}</div>
    </div>
  );
}

/* A live Zoom-style class: the mentor's chart shared on screen, his camera
   tile in the corner and learners along the bottom. */
export function LiveClassScreen() {
  return (
    <div className="flex h-full flex-col bg-[#111716] text-white">
      <div className="flex items-center justify-between px-3 py-1.5 text-[9px] text-white/70 sm:text-[10px]">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#ef5350]" /> LIVE · Price action masterclass
        </span>
        <span className="tabular">00:42:18</span>
      </div>
      <div className="relative min-h-0 flex-1 px-2">
        <TradingChart className="size-full rounded-md" width={640} height={330} seed={5} count={60} />
        <div className="absolute left-4 top-2 w-[24%] overflow-hidden rounded-md bg-[#1d4a46] ring-2 ring-[#26a69a]">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/hero/mentor-cream-knit-v1.webp"
              alt=""
              fill
              sizes="160px"
              className="object-cover object-[50%_8%] scale-[1.9] origin-top"
            />
          </div>
          <p className="absolute bottom-0.5 left-1 text-[7px] font-medium sm:text-[8px]">Saurya</p>
        </div>
      </div>
      <div className="flex gap-1.5 px-2 py-1.5">
        {["RK", "AM", "PS", "JD", "NV"].map((initials, i) => (
          <span key={initials} className={`grid aspect-[4/3] flex-1 place-items-center rounded text-[8px] font-semibold ${i % 2 ? "bg-[#2a3533]" : "bg-[#23302e]"}`}>
            {initials}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 border-t border-white/5 py-1.5" aria-hidden="true">
        <span className="grid size-5 place-items-center rounded-full bg-white/10"><Mic className="size-2.5" /></span>
        <span className="grid size-5 place-items-center rounded-full bg-white/10"><Video className="size-2.5" /></span>
        <span className="rounded-full bg-[#ef5350] px-2 py-0.5 text-[8px] font-semibold">Leave</span>
      </div>
    </div>
  );
}

/* The course page as it looks in the mobile app. */
export function CourseScreen({ course = courses[0] }) {
  return (
    <div className="flex h-full flex-col bg-paper text-ink">
      <div className="relative aspect-[16/10] shrink-0">
        <Image src={course.image} alt="" fill sizes="200px" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="font-display text-[11px] font-bold leading-tight text-green">{course.title}</p>
        <div className="h-1 overflow-hidden rounded-full bg-green-100">
          <div className="h-full w-[64%] rounded-full bg-up" />
        </div>
        <p className="text-[8px] text-muted">Progress 64% · {course.lessons} lessons</p>
        <ul className="mt-1 grid gap-1.5">
          {["Market structure", "Supply & demand", "Risk management"].map((lesson, i) => (
            <li key={lesson} className="flex items-center gap-1.5 rounded-md bg-white px-2 py-1.5 text-[8px] ring-1 ring-line">
              <PlayCircle className={`size-3 shrink-0 ${i === 1 ? "text-up" : "text-faint"}`} aria-hidden="true" />
              {lesson}
            </li>
          ))}
        </ul>
        <span className="mt-auto rounded-full bg-green py-1.5 text-center text-[8px] font-semibold text-white">Continue lesson</span>
      </div>
    </div>
  );
}

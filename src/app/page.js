import Hero from "@/components/Hero";
import { Highlights } from "@/components/Ticker";
import Courses from "@/components/Courses";
import { LearningPath, LiveClasses } from "@/components/Program";
import CourseSpotlight from "@/components/CourseSpotlight";
import YouTubeStreams from "@/components/YouTubeStreams";
import Markets from "@/components/Markets";
import { News } from "@/components/News";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { JoinCta } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Courses />
      <LearningPath />
      <LiveClasses />
      <CourseSpotlight />
      <YouTubeStreams />
      <Markets />
      <Testimonials />
      <div className="relative isolate pb-24">
        <div className="ambient" aria-hidden="true">
          <span className="left-[-10%] top-[4%] size-[520px] bg-green/20" />
          <span className="right-[-12%] top-[30%] size-[560px] bg-lilac/40" />
          <span className="left-[20%] top-[58%] size-[480px] bg-green/15" />
          <span className="right-[5%] top-[80%] size-[420px] bg-lilac/35" />
        </div>
        <News />
        <Contact />
        <JoinCta />
      </div>
    </>
  );
}

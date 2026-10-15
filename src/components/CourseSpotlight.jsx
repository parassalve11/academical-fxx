import Image from "next/image";
import Link from "next/link";
import { Award, Heart, Infinity as InfinityIcon, PlayCircle, Star, ThumbsUp, Video } from "lucide-react";
import TradingChart from "./TradingChart";
import ScrollScene from "./ScrollScene";
import { courses } from "@/data/site";
import "./CourseSpotlight.css";
import "./DeviceShowcase.css";

const benefits = [
  {
    label: "A complete learning path",
    title: "50+ hours",
    description: "Go deeper with recorded lessons and live classes.",
    tone: "mint",
  },
  {
    label: "A mentor by your side",
    title: "90 days",
    description: "Personal teacher support as you put learning into practice.",
    tone: "cream",
  },
  {
    label: "Make it make sense",
    title: "1:1 guidance",
    description: "Work through your questions with supporting faculty.",
    tone: "paper",
  },
  {
    label: "Yours to come back to",
    title: "Lifetime access",
    description: "Revisit your lessons. Keep building at your own pace.",
    tone: "paper",
  },
  {
    label: "From theory to practice",
    title: "Real markets",
    description: "Study price action, risk and institutional strategies.",
    tone: "cream",
  },
  {
    label: "Grow together",
    title: "Your community",
    description: "Stay connected with a lifetime peer learning community.",
    tone: "mint",
  },
];

/* Screen positions are measured from the device artwork (percent of image). */
function LaptopScreen({ course }) {
  return (
    <div className="spot-screen spot-laptop" aria-hidden="true">
      <div className="spot-web-nav">
        <Image src="/images/logo.png" alt="" width={600} height={300} sizes="80px" className="spot-web-logo" />
        <span className="spot-web-links"><span>Courses</span><span>Markets</span><span>News</span></span>
        <span className="spot-web-cta">Sign up</span>
      </div>
      <div className="spot-web-body">
        <div className="spot-web-poster">
          <Image src={course.image} alt="" fill sizes="(min-width: 1024px) 260px, 40vw" className="object-cover" />
        </div>
        <div className="spot-web-info">
          <p className="spot-web-eyebrow">FEATURED PROGRAMME</p>
          <p className="spot-web-title font-display">{course.title}</p>
          <p className="spot-web-rating"><Star aria-hidden="true" /> {course.rating.toFixed(1)} · {course.students} students</p>
          <p className="spot-web-facts">{course.lessons} lessons · Beginner to advanced · Live + recorded</p>
          <p className="spot-web-price"><strong className="font-display">${course.price}</strong> <s>${course.was}</s></p>
          <span className="spot-web-button">Enrol now</span>
        </div>
      </div>
      <ul className="spot-web-features">
        {[
          { icon: PlayCircle, title: "Video lessons", note: "Beginner to advanced" },
          { icon: Video, title: "Live on Zoom", note: "Face-to-face classes" },
          { icon: InfinityIcon, title: "Lifetime access", note: "Every future update" },
          { icon: Award, title: "Certificate", note: "On completion" },
        ].map(({ icon: Icon, title, note }) => (
          <li key={title}><Icon aria-hidden="true" /><b>{title}</b><span>{note}</span></li>
        ))}
      </ul>
    </div>
  );
}

function TabletScreen() {
  return (
    <div className="spot-screen spot-tablet" aria-hidden="true">
      <div className="spot-live-bar"><span className="spot-live-dot" /> LIVE · Gold (XAUUSD) session <span className="spot-live-time">01:12:40</span></div>
      <div className="spot-live-chart">
        <TradingChart className="size-full" width={320} height={200} seed={29} count={36} decimals={1} start={4150} />
        <div className="spot-live-cam">
          <Image src="/images/hero/mentor-cream-knit-v1.webp" alt="" fill sizes="80px" className="object-cover object-[50%_6%] scale-[1.9] origin-top" />
          <span>Saurya</span>
        </div>
        {/* Live reactions drift up the side of the stream. */}
        <span className="spot-live-reactions">
          <Heart /><ThumbsUp /><Heart /><ThumbsUp /><Heart />
        </span>
      </div>
      <ul className="spot-live-chat">
        <li><b>Rohit</b> Waiting for the retest at 4155?</li>
        <li><b>Saurya</b> Yes — let price come to the zone first.</li>
        <li><b>Ananya</b> Stop below the wick, right?</li>
        <li><b>Imran</b> Clear explanation, thank you!</li>
        <li className="spot-live-typing"><span /><span /><span /></li>
      </ul>
    </div>
  );
}

function PhoneScreen({ course }) {
  return (
    <div className="spot-screen spot-phone" aria-hidden="true">
      <div className="spot-app-poster">
        <Image src={course.image} alt="" fill sizes="120px" className="object-cover" />
      </div>
      <p className="spot-app-title font-display">{course.title}</p>
      <div className="spot-app-progress"><span /></div>
      <p className="spot-app-meta">64% complete</p>
      <ul className="spot-app-lessons">
        {["Market structure", "Supply & demand", "Risk management", "Trading psychology"].map((lesson, i) => (
          <li key={lesson} data-active={i === 1 || undefined}><PlayCircle aria-hidden="true" />{lesson}</li>
        ))}
      </ul>
      <span className="spot-app-button">Continue lesson</span>
    </div>
  );
}

function DeviceShowcase({ course }) {
  return (
    <figure className="spot-devices">
      <div className="spot-devices-stage">
        <TabletScreen />
        <LaptopScreen course={course} />
        <PhoneScreen course={course} />
        <Image
          src="/images/devices/devices-trio.png"
          alt={`${course.title} on a laptop, a live class on a tablet and lesson progress on a phone.`}
          width={1000}
          height={562}
          sizes="(min-width: 1100px) 1040px, 100vw"
          className="spot-devices-frame"
        />
      </div>
      <figcaption className="spot-devices-caption">
        <strong className="font-display">${course.price}</strong> <s>${course.was}</s>
        <span>One payment. Lifetime learning.</span>
        <Link className="spot-devices-link" href={`/courses/${course.slug}`}>View course details</Link>
      </figcaption>
    </figure>
  );
}

export default function CourseSpotlight() {
  return (
    <section className="course-spotlight-section" aria-labelledby="course-spotlight-title">
      <div className="course-spotlight-inner">
        <div className="course-spotlight-heading">
          <p className="course-spotlight-eyebrow">THE ACADEMIYA ADVANTAGE</p>
          <h2 id="course-spotlight-title" className="font-display course-spotlight-title">
            Your next chapter.<br /><span>All in one course.</span>
          </h2>
          <p className="course-spotlight-intro">
            The lessons, the guidance, the people.<br className="course-spotlight-desktopBreak" /> Everything to support the trader you&apos;re becoming.
          </p>
        </div>

        <ScrollScene className="course-spotlight-scene" end={0.02}>
          <DeviceShowcase course={courses[0]} />
          <ul className="course-spotlight-benefits" aria-label="What comes with your course">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className={`course-spotlight-benefit course-spotlight-${benefit.tone} course-spotlight-card${index + 1}`}>
                <p className="course-spotlight-benefitLabel">{benefit.label}</p>
                <h3 className="font-display course-spotlight-benefitTitle">{benefit.title}</h3>
                <p className="course-spotlight-benefitDescription">{benefit.description}</p>
              </li>
            ))}
          </ul>
        </ScrollScene>

        <div className="course-spotlight-footer">
          <p>A little curiosity. A whole new skill set.</p>
          <Link href="/courses" className="course-spotlight-browseLink">Find your course</Link>
        </div>
      </div>
    </section>
  );
}

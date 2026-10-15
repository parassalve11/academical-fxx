import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import HeroMarkets from "./HeroMarkets";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mentor-hero">
      <div className="mentor-hero-inner">
        <div className="mentor-hero-copy">
          <p className="rise mentor-hero-signature font-script">Learn to Lead.</p>

          <h1 id="hero-title" className="rise mentor-hero-title font-display" style={{ animationDelay: "0.08s" }}>
            <span>Master the<br /> markets.</span>
            <span className="mentor-hero-title-accent">Trade with<br /> conviction.</span>
          </h1>

          <div className="rise" style={{ animationDelay: "0.2s" }}>
            <p className="mentor-hero-description">
              From your first chart to a strategy of your own. Learn forex,
              stocks and crypto with expert-led courses, live classes and
              a community that grows with you.
            </p>

            <ul className="mentor-hero-benefits" aria-label="Course benefits">
              {["All experience levels", "Live classes", "Lifetime access"].map((benefit) => (
                <li key={benefit}><Check size={15} aria-hidden="true" />{benefit}</li>
              ))}
            </ul>

            <div className="mentor-hero-actions">
              <Link href="/courses" className="btn-light mentor-hero-primary">
                Explore courses <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/signup" className="mentor-hero-secondary">
                Create free account <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mentor-hero-visual">
          <div className="mentor-hero-halo" aria-hidden="true" />
          <HeroMarkets />
          <figure className="mentor-hero-portrait">
            <Image
              src="/images/hero/mentor-cream-knit-v1.webp"
              alt="Saurya Praveen, Academiya trading mentor, smiling calmly in a cream knit sweater."
              width={1024}
              height={1536}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 440px, 85vw"
              preload
              className="mentor-hero-image"
            />
            <figcaption className="mentor-hero-caption">
              <span className="mentor-caption-line" aria-hidden="true" />
              <div>
                <p className="font-display">Saurya Praveen</p>
                <p>YOUR MENTOR. YOUR NEXT CHAPTER.</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

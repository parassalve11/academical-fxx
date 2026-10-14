import Image from "next/image";
import Link from "next/link";

// The supplied logo is artwork on white, so it sits on its own light plate
// rather than being recoloured.
export function Logo({ className = "", preload = false }) {
  return (
    <Link
      href="/"
      aria-label="Academiya home"
      className={`inline-flex shrink-0 items-center rounded-xl bg-white px-2 py-1 ring-1 ring-green/10 ${className}`}
    >
      <Image
        src="/images/logo.png"
        alt="Academiya — Learn to Lead."
        width={600}
        height={300}
        preload={preload}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

const paths = {
  youtube: (
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
  ),
  facebook: (
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
  ),
  telegram: (
    <path d="M21.94 4.5 18.9 19.05c-.23 1.01-.83 1.26-1.68.79l-4.64-3.42-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73L18.5 6.9c.37-.33-.08-.51-.58-.18L6.28 13.9l-4.6-1.44c-1-.31-1.02-1 .21-1.48L20.65 3.05c.83-.31 1.56.2 1.29 1.45Z" />
  ),
};

export function SocialIcon({ name, className = "size-5" }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {paths[name]}
    </svg>
  );
}

export function SectionHeading({ id, title, intro, action, align = "left" }) {
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${align === "center" ? "md:flex-col md:items-center md:text-center" : ""}`}>
      <div className="max-w-2xl">
        <h2 id={id} className="font-display text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-green text-balance">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted text-pretty">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

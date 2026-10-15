"use client";

import { useEffect, useRef } from "react";

// Publishes scroll progress through the element as --p (0 → 1), eased and
// smoothed so scroll-linked motion glides instead of stepping with the wheel.
// Progress runs from the element's top entering the viewport to it reaching
// `end` (fraction of viewport height from the top).
export default function ScrollScene({ as: Tag = "div", end = 0.2, className, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let current = 0;
    let target = 0;
    let frame = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const t = Math.min(1, Math.max(0, (vh - el.getBoundingClientRect().top) / (vh * (1 - end))));
      target = t * t * (3 - 2 * t);
    };
    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.001) current = target;
      el.style.setProperty("--p", current.toFixed(4));
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [end]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

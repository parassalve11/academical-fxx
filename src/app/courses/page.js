import { Suspense } from "react";
import CourseCatalogue from "@/components/CourseCatalogue";
import { Container, CourseCard, PageHero } from "@/components/ui";
import { allCourses } from "@/data/content";

export const metadata = {
  title: "Trading courses — Forex, stocks & crypto",
  description: "Structured, practitioner-led programmes across every market we cover. Filter by market and price to find the path that fits you.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        title="Learn to trade forex, stocks & crypto"
        intro="Structured, practitioner-led programmes across every market we cover. Filter by market and price to find the path that fits you."
      />
      <Container className="py-14 sm:py-16">
        {/* The filters read the URL, so the static fallback lists every course. */}
        <Suspense
          fallback={
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allCourses.map((c) => (
                <li key={c.slug} className="flex">
                  <CourseCard course={c} />
                </li>
              ))}
            </ul>
          }
        >
          <CourseCatalogue courses={allCourses} />
        </Suspense>
      </Container>
    </>
  );
}

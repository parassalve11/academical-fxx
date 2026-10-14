import Link from "next/link";
import { PenLine } from "lucide-react";
import AnalysisFeed from "@/components/AnalysisFeed";
import { Container, PageHero, SectionTitle } from "@/components/ui";
import { TvMarketOverview } from "@/components/Widgets";
import { posts } from "@/data/content";
import { marketOverviewSectors } from "@/data/widgets";

export const metadata = {
  title: "Analysis & Opinion",
  description: "Where Academiya traders share their take on the markets — read the latest opinions, weigh in, and publish your own.",
};

export default function AnalysisPage() {
  return (
    <>
      <PageHero
        title="Analysis & Opinion"
        intro="Where Academiya traders share their take on the markets — bullish, bearish or watching from the sidelines. Read the latest opinions, weigh in, and publish your own."
      >
        <Link href="/login?next=/analysis" className="btn-primary mt-7 px-5 py-3 text-sm">
          <PenLine className="size-4" aria-hidden="true" /> Log in to post
        </Link>
      </PageHero>
      <Container className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <AnalysisFeed posts={posts} />
        </div>
        <section aria-labelledby="ov-title" className="min-w-0 lg:col-span-5">
          <SectionTitle id="ov-title" title="Market overview" intro="Indices, crypto, commodities and stocks at a glance." />
          <div className="glass mt-5 overflow-hidden rounded-[28px] p-2 sm:p-3 lg:sticky lg:top-24">
            <TvMarketOverview sectors={marketOverviewSectors} height={560} />
          </div>
        </section>
      </Container>
    </>
  );
}

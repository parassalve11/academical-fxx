import { Container, CourseRail, PageHero, SectionTitle } from "@/components/ui";
import { Frame, TvMarketData, TvMarketOverview } from "@/components/Widgets";
import { investing, marketDataSectors, marketOverviewSectors } from "@/data/widgets";
import { marketsBoard } from "@/data/site";
import { Change } from "@/components/Ticker";

export const metadata = {
  title: "Markets — Live global markets",
  description: "Indices, futures, bonds, forex, crypto, commodities and stocks — live prices and charts in one place.",
};

export default function MarketsPage() {
  return (
    <>
      <PageHero
        title="Live markets"
        intro="Indices, futures, bonds and forex — prices and changes streamed live, next to the courses that teach you how to read them."
        aside={
          <ul className="glass grid grid-cols-2 overflow-hidden rounded-[24px] text-sm" aria-label="Major indices">
            {marketsBoard.slice(0, 4).map((m, i) => (
              <li key={m.symbol} className={`px-4 py-3.5 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line" : ""}`}>
                <p className="text-muted">{m.name}</p>
                <p className="mt-0.5 flex items-baseline justify-between gap-2">
                  <span className="tabular font-semibold text-green">{m.value}</span>
                  <Change value={m.change} className="text-xs" />
                </p>
              </li>
            ))}
          </ul>
        }
      />

      <Container className="py-16 sm:py-20">
        <section aria-labelledby="data-title">
          <SectionTitle id="data-title" title="Market data" intro="Indices, futures, bonds and forex at a glance." />
          <div className="glass mt-6 overflow-hidden rounded-[28px] p-2 sm:p-3">
            <TvMarketData sectors={marketDataSectors} height={820} />
          </div>
          <p className="mt-2 text-xs text-faint">Market data streamed live by TradingView.</p>
        </section>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          <section aria-labelledby="overview-title" className="min-w-0 lg:col-span-8">
            <SectionTitle id="overview-title" title="Market overview" intro="Indices, crypto, commodities and stocks, with 12-month charts." />
            <div className="glass mt-6 overflow-hidden rounded-[28px] p-2 sm:p-3">
              <TvMarketOverview sectors={marketOverviewSectors} height={600} />
            </div>
          </section>
          <div className="min-w-0 lg:col-span-4 lg:pt-[5.5rem]">
            <CourseRail title="Read the markets like a pro" note="Turn price moves into a repeatable process." />
          </div>
        </div>

        <section aria-labelledby="crypto-title" className="mt-16">
          <SectionTitle id="crypto-title" title="Crypto movers and technical summary" intro="Top cryptocurrencies and a multi-asset technical read." />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div className="glass rounded-[28px] p-2 sm:p-3">
              <Frame src={investing.topCrypto} title="Top cryptocurrencies" height={520} />
            </div>
            <div className="glass rounded-[28px] p-2 sm:p-3">
              <Frame src={investing.technicalSummary} title="Technical summary" height={520} />
            </div>
          </div>
          <p className="mt-2 text-xs text-faint">Crypto and technical summary powered by Investing.com.</p>
        </section>
      </Container>
    </>
  );
}

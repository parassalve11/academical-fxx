import { BrokerCard, BrokerDirectory } from "@/components/Brokers";
import { Container, CourseRail, Notice, PageHero, SectionTitle } from "@/components/ui";
import { brokerCategories, brokers } from "@/data/content";

export const metadata = {
  title: "Broker directory — independent reviews",
  description: "Independent overviews of regulated forex, stocks and crypto brokers — account types, minimum deposits, regulators, spreads and leverage, side by side.",
};

export default function BrokersPage() {
  const picks = brokers.filter((b) => b.featured);
  return (
    <>
      <PageHero
        title="Find a broker you can trust"
        intro="Independent overviews of regulated forex, stocks and crypto brokers — account types, minimum deposits, regulators, spreads and leverage, side by side."
      >
        <Notice className="mt-6 max-w-2xl">Listings are informational only and not financial advice or an endorsement. Always verify a broker&apos;s regulatory status before opening an account.</Notice>
      </PageHero>

      <section aria-labelledby="picks-title" className="border-b border-line bg-green-50/50">
        <Container className="py-14">
          <SectionTitle id="picks-title" title="Top brokers" intro="Our most recommended, fully regulated brokers — vetted for safety, costs and execution." />
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {picks.map((b) => (
              <li key={b.slug}>
                <BrokerCard broker={b} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-12">
        <div className="lg:col-span-8 xl:col-span-9">
          <BrokerDirectory brokers={brokers} categories={brokerCategories} />
        </div>
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="lg:sticky lg:top-24">
            <CourseRail title="Build the skills first" note="Learn the process before you fund an account." />
          </div>
        </div>
      </Container>
    </>
  );
}

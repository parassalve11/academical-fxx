"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchX } from "lucide-react";
import { CourseCard } from "./ui";

const markets = [
  { value: "", label: "All markets" },
  { value: "forex", label: "Forex" },
  { value: "stocks", label: "Stocks" },
  { value: "crypto", label: "Crypto" },
];
const prices = [
  { value: "", label: "Any price" },
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];
const sorts = [
  { value: "", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

function Select({ id, label, value, options, onChange }) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-muted">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230f3c39%22 stroke-width=%222.5%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat py-2.5 pr-9 text-sm">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function CourseCatalogue({ courses }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const market = params.get("market") || "";
  const price = params.get("price") || "";
  const sort = params.get("sort") || "";

  const set = (key) => (value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  let list = courses.filter((c) => (!market || c.market === market) && (!price || (price === "free" ? c.price === 0 : c.price > 0)));
  list = [...list].sort((a, b) => {
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.students - a.students;
  });
  const filtered = market || price || sort;

  return (
    <div>
      <div className="glass grid gap-4 rounded-[24px] p-4 sm:grid-cols-3 sm:p-5" role="group" aria-label="Filter and sort courses">
        <Select id="f-market" label="Market" value={market} options={markets} onChange={set("market")} />
        <Select id="f-price" label="Price" value={price} options={prices} onChange={set("price")} />
        <Select id="f-sort" label="Sort" value={sort} options={sorts} onChange={set("sort")} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="tabular font-semibold text-ink">{list.length}</span> {list.length === 1 ? "course" : "courses"} found
        </p>
        {filtered && (
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="link-quiet text-sm">
            Clear filters
          </button>
        )}
      </div>

      {list.length ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.slug} className="flex">
              <CourseCard course={c} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="glass mt-5 flex flex-col items-center rounded-[28px] px-6 py-16 text-center">
          <SearchX className="size-10 text-green/60" aria-hidden="true" />
          <p className="mt-4 font-display text-xl font-bold text-green">No {markets.find((m) => m.value === market)?.label.toLowerCase() || ""} courses match these filters</p>
          <p className="mt-2 max-w-md text-muted">New programmes are added regularly. Clear a filter to see every course.</p>
          <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="btn-primary mt-6 px-5 py-2.5 text-sm">
            Show all courses
          </button>
        </div>
      )}
    </div>
  );
}

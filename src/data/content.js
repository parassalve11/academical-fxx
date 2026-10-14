// Accessors over the captured content. Generated files come from
// scripts/extract-content.mjs; re-run it after a new capture.
import { courses } from "./site";
import courseDetails from "./generated/course-details.json";
import newsData from "./generated/news.json";
import analysisData from "./generated/analysis.json";
import brokersData from "./generated/brokers.json";
import legalData from "./generated/legal.json";
import aboutData from "./generated/about.json";

// Every catalogue course is in the "General" category on the live site.
export const allCourses = courses.map((c) => ({ ...c, category: "General", ...courseDetails[c.slug] }));
export const getCourse = (slug) => allCourses.find((c) => c.slug === slug);

export const news = newsData.items;
export const newsWire = newsData.wire;
export const newsUpdated = newsData.updated?.replace(/^Updated\s*/, "");
export const getNews = (id) => news.find((n) => n.id === id);

export const posts = analysisData.map((p) => ({
  ...p,
  // Titles were entered in mixed case; keep them as written except all-caps.
  title: p.title === p.title.toUpperCase() ? p.title[0] + p.title.slice(1).toLowerCase() : p.title,
  category: p.category[0] + p.category.slice(1).toLowerCase(),
  date: p.published.split(",")[0],
}));
export const getPost = (id) => posts.find((p) => p.id === id);

export const brokers = brokersData;
export const brokerCategories = ["Forex Brokers", "Crypto Exchanges", "Stock Brokers"];
export const getBroker = (slug) => brokers.find((b) => b.slug === slug);

export const legal = legalData;
export const about = aboutData;

export const formatPrice = (c) => (c.price === 0 ? "Free" : `$${c.price}`);

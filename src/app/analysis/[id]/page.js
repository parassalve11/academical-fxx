import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { Breadcrumbs, Container, Initials, PageSkeleton } from "@/components/ui";
import { getPost, posts } from "@/data/content";

export function generateStaticParams() {
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const post = getPost((await params).id);
  return post ? { title: `${post.title} — Analysis & Opinion`, description: post.body[0] } : {};
}

const linkify = (text) =>
  text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer nofollow" className="link-quiet break-all">
        {part}
      </a>
    ) : (
      part
    ),
  );

async function AnalysisPostContent({ params }) {
  const post = getPost((await params).id);
  if (!post) notFound();
  const next = `/login?next=/analysis/${post.id}`;

  return (
    <Container className="max-w-[860px] pb-20 pt-32 sm:pt-36">
      <Breadcrumbs items={[{ label: "Analysis & Opinion", href: "/analysis" }, { label: post.title }]} />
      <article className="glass rounded-[32px] p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-green ring-1 ring-green/10">{post.category}</span>
          {post.symbol && <span className="rounded-full bg-white px-2.5 py-1 text-ink ring-1 ring-line">{post.symbol}</span>}
        </div>
        <h1 className="mt-4 font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-green">{post.title}</h1>
        <p className="mt-5 flex items-center gap-3 text-sm text-muted">
          <Initials name={post.author} />
          <span>
            <span className="block font-semibold text-ink">{post.author}</span>
            <time>{post.published}</time>
          </span>
        </p>
        {post.image && (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[24px] ring-1 ring-line">
            <Image src={post.image} alt={`Chart shared with ${post.title}`} fill sizes="800px" className="object-contain bg-white" />
          </div>
        )}
        <div className="mt-8 grid gap-4 text-[1.0625rem] leading-[1.75] text-ink/85">
          {post.body.map((p, i) => (
            <p key={i}>{linkify(p)}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
          <Link href={next} className="btn-glass px-5 py-2.5 text-sm">
            <Heart className="size-4" aria-hidden="true" /> Like
          </Link>
          <Link href={next} className="btn-glass px-5 py-2.5 text-sm">
            <MessageSquare className="size-4" aria-hidden="true" /> {post.comments ? `${post.comments} comment${post.comments > 1 ? "s" : ""}` : "Comment"}
          </Link>
          <p className="self-center text-sm text-faint">Log in to like or comment.</p>
        </div>
      </article>
      <Link href="/analysis" className="link-quiet mt-8 inline-flex items-center gap-1.5 text-sm">
        <ArrowLeft className="size-4" aria-hidden="true" /> All analysis
      </Link>
    </Container>
  );
}

// URL params are read inside Suspense so navigation can show the shell instantly.
export default function AnalysisPost({ params }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <AnalysisPostContent params={params} />
    </Suspense>
  );
}

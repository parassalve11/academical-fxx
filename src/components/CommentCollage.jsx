import { ArrowUpRight, ThumbsDown, ThumbsUp } from "lucide-react";
import { SocialIcon } from "./Brand";
import { youtubeComments } from "@/data/site";

// Real public comments from the Academiya YouTube channel, shown as a
// YouTube-style comments panel that scrolls slowly (pauses on hover/focus).
const VIDEO_URL = "https://www.youtube.com/watch?v=J0_5alYBaNo";
const tints = ["bg-green text-white", "bg-lilac text-plum", "bg-green-100 text-green", "bg-[#f4eedf] text-[#7a5a1c]"];

function Comment({ comment, index, hidden }) {
  return (
    <li className="flex gap-3 border-b border-line py-4 last:border-b-0" aria-hidden={hidden || undefined}>
      <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${tints[index % tints.length]}`} aria-hidden="true">
        {comment.handle.replace("@", "").charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.8125rem] font-semibold text-ink">{comment.handle}</p>
        <p className="mt-1 whitespace-pre-line text-[0.9375rem] leading-snug text-ink/85">{comment.text}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted" aria-hidden="true">
          <span className="inline-flex items-center gap-1.5"><ThumbsUp className="size-3.5" />{comment.likes > 0 ? comment.likes : ""}</span>
          <ThumbsDown className="size-3.5" />
          <span className="font-semibold">Reply</span>
        </div>
      </div>
    </li>
  );
}

export default function CommentCollage() {
  return (
    <figure className="flex h-full min-h-[360px] flex-col lg:min-h-[430px] overflow-hidden rounded-[24px] bg-white/85 ring-1 ring-line">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          <SocialIcon name="youtube" className="size-5 text-[#ff0033]" />
          What learners say on YouTube
        </span>
        <span className="tabular shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green">{youtubeComments.length} comments</span>
      </figcaption>

      <div className="comment-feed relative min-h-0 flex-1 overflow-hidden" tabIndex={0} aria-label="YouTube comments">
        <ul className="comment-feed-track absolute inset-x-5 top-0">
          {youtubeComments.map((c, i) => <Comment key={c.handle} comment={c} index={i} />)}
          {youtubeComments.map((c, i) => <Comment key={`${c.handle}-dup`} comment={c} index={i} hidden />)}
        </ul>
      </div>

      <a
        href={VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 border-t border-line px-5 py-3 text-sm font-medium text-green transition-colors hover:bg-green-50"
      >
        <span className="truncate">On &ldquo;Hammer Pattern vs Inverted Hammer&rdquo;</span>
        <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
      </a>
    </figure>
  );
}

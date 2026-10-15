"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Clock, Eye, Play } from "lucide-react";
import { SocialIcon } from "./Brand";
import { youtubeChannel, youtubeStreams } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("en-GB", { day: "2-digit", timeZone: "UTC" });
const monFmt = new Intl.DateTimeFormat("en-GB", { month: "short", timeZone: "UTC" });

function title(stream) {
  return `${stream.market} (${stream.symbol}) live trading`;
}

/* The video only loads YouTube when someone presses play. */
function Player({ stream, playing, onPlay }) {
  if (playing) {
    return (
      <iframe
        key={stream.id}
        src={`https://www.youtube-nocookie.com/embed/${stream.id}?autoplay=1&rel=0`}
        title={`${title(stream)}, ${fmt.format(new Date(stream.date))}`}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="absolute inset-0 size-full"
      />
    );
  }
  return (
    <button type="button" onClick={onPlay} className="group absolute inset-0 size-full cursor-pointer">
      <Image
        src="/images/youtube/live-trading-thumbnail.webp"
        alt=""
        fill
        sizes="(min-width: 1024px) 720px, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-[4.25rem] sm:h-16 sm:w-[5.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[18px] bg-[#ff0033] text-white shadow-lg transition-transform group-hover:scale-110">
        <Play className="size-6 fill-white sm:size-8" aria-hidden="true" />
      </span>
      <span className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-left text-white">
        <span>
          <span className="block text-xs font-medium text-white/80">Stream replay · {fmt.format(new Date(stream.date))}</span>
          <span className="mt-1 hidden font-display text-2xl font-bold sm:block">{title(stream)}</span>
        </span>
        {stream.duration && (
          <span className="tabular shrink-0 rounded-md bg-black/75 px-2 py-1 text-xs font-semibold">{stream.duration}</span>
        )}
      </span>
      <span className="sr-only">Play {title(stream)} from {fmt.format(new Date(stream.date))}</span>
    </button>
  );
}

export default function YouTubeStreams() {
  const [active, setActive] = useState(youtubeStreams[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <section aria-labelledby="youtube-title" className="mx-auto max-w-[1240px] px-4 py-24 sm:px-6 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="inline-flex items-center gap-2 text-sm font-medium text-green">
            <span className="size-2 rounded-full bg-[#ff0033] shadow-[0_0_10px] shadow-[#ff0033]" aria-hidden="true" />
            Free on YouTube
          </p>
          <h2 id="youtube-title" className="mt-3 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.02] tracking-[-0.03em] text-green text-balance">
            Watch us trade the markets live
          </h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Daily gold and crypto sessions where our mentors analyse, plan and take trades in real time — and answer your questions in the chat.
          </p>
        </div>

        <a
          href={youtubeChannel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="glass flex items-center gap-3 rounded-full py-2 pl-2 pr-2 transition-colors hover:bg-white sm:gap-4 sm:pr-3"
        >
          <Image src="/images/youtube/channel-avatar.jpg" alt="" width={56} height={56} className="size-11 rounded-full ring-1 ring-line sm:size-14" />
          <span className="leading-tight">
            <span className="block font-semibold text-green">{youtubeChannel.name}</span>
            <span className="block whitespace-nowrap text-xs text-muted sm:text-sm">
              <span className="tabular">{youtubeChannel.subscribers}</span> subscribers · <span className="tabular">{youtubeChannel.videos}</span> videos
            </span>
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-[#ff0033] px-3.5 py-2.5 text-sm font-semibold text-white sm:ml-2 sm:px-4">
            <SocialIcon name="youtube" className="size-4" /> Subscribe
          </span>
        </a>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-12">
        <div className="relative aspect-video overflow-hidden rounded-[28px] bg-ink shadow-[0_30px_60px_-30px_rgb(15_60_57/0.5)] lg:col-span-8">
          <Player stream={active} playing={playing} onPlay={() => setPlaying(true)} />
        </div>

        <div className="glass flex flex-col rounded-[28px] p-3 lg:col-span-4">
          <p className="px-3 pb-2 pt-3 text-sm font-semibold text-green">Recent live sessions</p>
          <ul className="grid gap-1">
            {youtubeStreams.map((stream) => {
              const current = stream.id === active.id;
              const date = new Date(stream.date);
              return (
                <li key={stream.id}>
                  <button
                    type="button"
                    onClick={() => { setActive(stream); setPlaying(true); }}
                    aria-current={current || undefined}
                    className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition-colors ${current ? "bg-green text-white" : "hover:bg-green-50"}`}
                  >
                    <span className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-xl leading-none ${current ? "bg-white/15" : "bg-green-50 text-green ring-1 ring-green/10"}`}>
                      <span className="tabular font-display text-lg font-bold">{dayFmt.format(date)}</span>
                      <span className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-wider">{monFmt.format(date)}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate font-semibold ${current ? "text-white" : "text-green"}`}>{title(stream)}</span>
                      <span className={`mt-1 flex items-center gap-3 text-xs ${current ? "text-white/75" : "text-muted"}`}>
                        {stream.duration && (
                          <span className="tabular inline-flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" />{stream.duration}</span>
                        )}
                        <span className="tabular inline-flex items-center gap-1"><Eye className="size-3.5" aria-hidden="true" />{stream.views} views</span>
                      </span>
                    </span>
                    <Play className={`size-4 shrink-0 ${current ? "fill-white" : "text-green"}`} aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
          <a
            href={youtubeChannel.streamsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet mt-auto inline-flex items-center gap-1.5 px-3 pb-3 pt-4 text-sm"
          >
            All live streams on YouTube <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

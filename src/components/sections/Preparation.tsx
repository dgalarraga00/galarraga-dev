"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { process, processVisual } from "@/content/site";
import { useReducedMotion } from "@/lib/useReducedMotion";

const LAST = process.length - 1;
/** Distance from the viewport top where the sticky stage settles (6rem). */
const STICKY_TOP = 96;
const DESKTOP = "(min-width: 768px)";

/** Liquid offset per step, in SVG units: empty, empty, rising, full. */
const LIQUID_LEVEL = [230, 230, 110, 18];

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * "La preparación": the four steps of the method as a cup being made.
 *
 * Desktop: the section is ~4 viewports tall with a sticky stage. Scroll
 * progress through it picks the active step, and the cup follows. Clicking a
 * step scrolls to its slice of the track, so the scrollbar stays the single
 * source of truth.
 *
 * Mobile: nothing is pinned for long. The small cup sticks above the stacked
 * steps and the step crossing the middle of the screen becomes active.
 *
 * Reduced motion: the finished cup and every step, static.
 */
export function Preparation() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Desktop: scroll progress through the track -> step + progress bar.
  useEffect(() => {
    if (reduced) return;
    const desktop = window.matchMedia(DESKTOP);
    let frame = 0;

    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!desktop.matches || !track || !stage) return;

      const total = track.offsetHeight - stage.offsetHeight;
      if (total <= 0) return;
      const rect = track.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (STICKY_TOP - rect.top) / total));
      const scaled = progress * process.length;
      const step = Math.min(LAST, Math.floor(scaled));

      setActive(step);
      const bar = barRefs.current[step];
      if (bar) bar.style.transform = `scaleX(${Math.min(1, scaled - step)})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  // Mobile: the step crossing a band just below the sticky cup is the active one.
  useEffect(() => {
    if (reduced) return;
    const desktop = window.matchMedia(DESKTOP);
    const observer = new IntersectionObserver(
      (entries) => {
        if (desktop.matches) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-58% 0px -38% 0px" },
    );
    stepRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, [reduced]);

  const pick = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!reduced && window.matchMedia(DESKTOP).matches && track && stage) {
        const total = track.offsetHeight - stage.offsetHeight;
        const trackTop = track.getBoundingClientRect().top + window.scrollY;
        // +1px lands inside the step's slice instead of on its edge.
        window.scrollTo({
          top: trackTop - STICKY_TOP + (index / process.length) * total + 1,
          behavior: "smooth",
        });
      }
      setActive(index);
    },
    [reduced],
  );

  // The cup shows the finished drink when motion is off.
  const step = reduced ? LAST : active;
  const stage = process[step].stage;

  return (
    <div ref={trackRef} className="mt-14 motion-safe:md:h-[400vh]">
      <div
        ref={stageRef}
        className="grid gap-6 md:sticky md:top-24 md:h-[calc(100dvh-8rem)] md:max-h-[44rem] md:min-h-[34rem] md:grid-cols-2 md:gap-10"
      >
        {/* Cup stage */}
        <div className="surface-dark bg-espresso text-crema relative z-10 flex min-h-[19rem] flex-col overflow-hidden rounded-[32px] p-5 max-md:sticky max-md:top-24 sm:p-8 md:min-h-0">
          <div className="relative z-10 flex items-baseline justify-between">
            <span className="text-vapor font-mono text-[13px]">
              {processVisual.label}
            </span>
            <span className="font-display text-ambar text-6xl leading-[0.8] font-bold md:text-[88px]">
              {String(step + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="relative flex flex-1 items-end justify-center">
            <svg
              viewBox="0 0 400 440"
              role="img"
              aria-label={`${processVisual.cupLabel} ${stage}`}
              className="block max-h-[15rem] w-full max-w-[25rem] overflow-visible md:max-h-none"
            >
              <defs>
                <clipPath id="prep-cup">
                  <path d="M64 144 H296 V270 A86 86 0 0 1 210 356 H150 A86 86 0 0 1 64 270 Z" />
                </clipPath>
              </defs>

              {/* Steam, only once served */}
              <g
                stroke="#F5EFC6"
                strokeWidth={6}
                strokeLinecap="round"
                fill="none"
                style={{
                  opacity: step === 3 ? 1 : 0,
                  transition: `opacity 600ms ${EASE}`,
                }}
              >
                <path className="prep-steam" d="M140 118c0-22 20-26 20-52" />
                <path className="prep-steam prep-steam-2" d="M180 118c0-22 20-26 20-52" />
                <path className="prep-steam prep-steam-3" d="M220 118c0-22 20-26 20-52" />
              </g>

              {/* Pour stream during extraction */}
              <rect
                x={172}
                y={-40}
                width={16}
                height={300}
                rx={8}
                fill="#8A4F1C"
                style={{
                  opacity: step === 2 ? 1 : 0,
                  transform: `scaleY(${step === 2 ? 1 : 0})`,
                  transformOrigin: "180px -40px",
                  transition:
                    step === 2
                      ? `transform 500ms ${EASE}, opacity 200ms`
                      : `transform 400ms ${EASE}, opacity 300ms 200ms`,
                }}
              />

              {/* Liquid inside the cup */}
              <g clipPath="url(#prep-cup)">
                <g
                  style={{
                    transform: `translateY(${LIQUID_LEVEL[step]}px)`,
                    transition: `transform ${step === 0 ? 400 : 2600}ms ${EASE}`,
                  }}
                >
                  <rect x={40} y={144} width={300} height={240} fill="#6B3A17" />
                  <rect x={40} y={144} width={300} height={12} fill="#C9894A" />
                </g>

                {/* Beans settle at the bottom on step 1 */}
                <g
                  fill="#4A2A14"
                  className={step === 0 ? "prep-drop" : undefined}
                  style={
                    step === 0
                      ? undefined
                      : {
                          opacity: 0,
                          transform: `translateY(${step === 3 ? -260 : 0}px)`,
                          transition: `opacity 500ms ${EASE}`,
                        }
                  }
                >
                  <ellipse cx={150} cy={330} rx={16} ry={11} transform="rotate(-20 150 330)" />
                  <ellipse cx={185} cy={338} rx={16} ry={11} transform="rotate(15 185 338)" />
                  <ellipse cx={220} cy={330} rx={16} ry={11} transform="rotate(-35 220 330)" />
                  <ellipse cx={168} cy={312} rx={16} ry={11} transform="rotate(30 168 312)" />
                  <ellipse cx={204} cy={312} rx={16} ry={11} transform="rotate(-10 204 312)" />
                </g>
              </g>

              {/* Cup, handle, saucer */}
              <g
                stroke="#F5EFC6"
                strokeWidth={8}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M60 140 H300 V270 A90 90 0 0 1 210 360 H150 A90 90 0 0 1 60 270 Z" />
                <path d="M300 168 h26 a44 44 0 0 1 0 88 h-26" />
                <path d="M20 396 H340" />
              </g>
            </svg>

            {/* Step 2: the recipe ticket prints out */}
            {step === 1 ? (
              <div
                aria-hidden="true"
                className="prep-print bg-card text-ink absolute top-2 right-0 w-[8.5rem] rotate-[4deg] rounded-md p-3.5 font-mono text-xs leading-[1.7] shadow-[0_16px_32px_rgba(0,0,0,0.35)] md:w-[11.9rem] md:p-4"
              >
                <div className="text-ink-2 text-[11px]">{processVisual.ticket.title}</div>
                <div className="border-vapor my-2 border-t border-dashed" />
                {processVisual.ticket.lines.map((line) => (
                  <div key={line}>{line} {".".repeat(Math.max(2, 14 - line.length))} ✓</div>
                ))}
                <div className="border-vapor my-2 border-t border-dashed" />
                <div className="font-medium">{processVisual.ticket.footer}</div>
              </div>
            ) : null}

            {/* Step 3: review counter */}
            {step === 2 ? (
              <div
                aria-hidden="true"
                className="bg-tostado border-poso absolute top-4 left-0 flex flex-col gap-2 rounded-[14px] border px-4 py-3 font-mono text-xs"
              >
                {processVisual.reviews.map((review, i) => (
                  <span key={review} className={`prep-pop prep-pop-${i + 1}`}>
                    {review}
                  </span>
                ))}
              </div>
            ) : null}

            {/* Step 4: the stamp */}
            {step === 3 ? (
              <div
                aria-hidden="true"
                className="prep-stamp bg-ambar text-espresso font-display absolute top-6 right-1 flex size-24 -rotate-12 flex-col items-center justify-center rounded-full text-center text-base leading-[1.1] font-bold shadow-[0_12px_28px_rgba(0,0,0,0.35)] md:right-2 md:size-[8.25rem] md:text-[19px]"
              >
                {processVisual.stamp.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Steps */}
        <ol className="flex min-w-0 flex-col md:justify-center">
          {process.map((item, i) => {
            const isActive = !reduced && i === active;
            // Mobile and reduced motion show every body; desktop only the
            // active one. A display toggle, not an animated height.
            const bodyShown = reduced || isActive ? "flex" : "flex md:hidden";

            return (
              <li
                key={item.id}
                ref={(node) => {
                  stepRefs.current[i] = node;
                }}
                data-index={i}
                className="border-line-dashed border-t-[1.5px]"
              >
                <button
                  type="button"
                  onClick={() => pick(i)}
                  aria-current={isActive ? "step" : undefined}
                  className="flex w-full cursor-pointer flex-col gap-3 py-5 text-left md:py-[22px]"
                >
                  <span
                    className={
                      "font-display origin-left text-[28px] leading-[1.1] font-semibold transition-[color,transform] duration-300 ease-[--ease-out] " +
                      (isActive || reduced ? "text-ink " : "text-ink-3 ") +
                      (isActive ? "md:scale-[1.28]" : "")
                    }
                  >
                    {item.title}{" "}
                    <span className="font-hand text-copper text-2xl">
                      — {item.stage}
                    </span>
                  </span>

                  <span className={`${bodyShown} flex-col gap-3 ${isActive ? "md:mt-2" : ""}`}>
                    <span className="bg-ambar text-espresso self-start rounded-full px-3 py-1 font-mono text-[13px]">
                      {item.tag}
                    </span>
                    <span className="text-ink-2 text-[17px] leading-relaxed">
                      {item.body}
                    </span>
                    {isActive ? (
                      <span className="bg-line hidden h-[3px] overflow-hidden rounded-full md:block">
                        <span
                          ref={(node) => {
                            barRefs.current[i] = node;
                          }}
                          className="bg-ambar block h-full origin-left"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

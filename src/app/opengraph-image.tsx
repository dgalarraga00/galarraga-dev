import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

/**
 * The card that appears when the site is shared on WhatsApp, LinkedIn or X.
 *
 * Without this, a shared link renders as a bare grey rectangle — which is
 * exactly how it looks the day someone finally passes the portfolio along.
 *
 * Generated at build time from the same content file as the page, so the
 * headline can never drift out of sync with the site. No custom fonts are
 * loaded on purpose: fetching a typeface here is a build-time network
 * dependency that fails silently and ships a broken card.
 */

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Light palette, matching the site: milk-coffee ground, espresso ink, and an
// amber underline bar in place of the old amber word (amber text on a light
// ground fails contrast).
const GROUND = "#F5EEE3";
const INK = "#241C17";
const INK_2 = "#5E4C40";
const AMBAR = "#E0A458";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: GROUND,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", color: INK_2, fontSize: 28 }}>
          {profile.wordmark}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              alignSelf: "flex-start",
              borderBottom: `14px solid ${AMBAR}`,
              gap: 24,
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: INK,
            }}
          >
            {profile.headlineAccent}
            {/* The house mark, redrawn inline: ImageResponse cannot reference
                external files, so the cup travels with the markup. */}
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
              <g
                stroke={INK}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8.5 6.2c0-1.4 1.4-1.6 1.4-3.1" />
                <path d="M12 6.2c0-1.4 1.4-1.6 1.4-3.1" />
                <path d="M15.5 6.2c0-1.4 1.4-1.6 1.4-3.1" />
                <path d="M4 10h13v4.5a4.5 4.5 0 0 1-4.5 4.5h-4A4.5 4.5 0 0 1 4 14.5Z" />
                <path d="M17 11.2h1.4a2.4 2.4 0 0 1 0 4.8H17" />
                <path d="M3 21.4h16" />
              </g>
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 36,
              color: INK_2,
            }}
          >
            {profile.headlineDeck}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: INK_2,
          }}
        >
          <div style={{ display: "flex" }}>{profile.name}</div>
          <div style={{ display: "flex" }}>{profile.role}</div>
        </div>
      </div>
    ),
    size,
  );
}

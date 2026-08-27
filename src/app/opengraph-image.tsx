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

const ESPRESSO = "#241C17";
const CREMA = "#F5EFC6";
const AMBAR = "#E0A458";
const LECHE = "#C8BBA8";

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
          backgroundColor: ESPRESSO,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", color: LECHE, fontSize: 28 }}>
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
              color: CREMA,
            }}
          >
            {profile.headline}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
              fontSize: 132,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: AMBAR,
            }}
          >
            {profile.headlineAccent}
            {/* The house mark, redrawn inline: ImageResponse cannot reference
                external files, so the cup travels with the markup. */}
            <svg width="96" height="96" viewBox="0 0 24 24" fill="none">
              <g
                stroke={AMBAR}
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
              color: LECHE,
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
            color: LECHE,
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

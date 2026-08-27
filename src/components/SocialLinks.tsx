import {
  IconGitHub,
  IconInstagram,
  IconLinkedIn,
  IconMail,
} from "@/components/icons/ui";
import { socials, type SocialKey } from "@/content/site";

const icons: Record<SocialKey, (p: { className?: string }) => React.ReactNode> =
  {
    github: IconGitHub,
    linkedin: IconLinkedIn,
    instagram: IconInstagram,
    email: IconMail,
  };

type SocialLinksProps = {
  /** "labelled" shows the platform name; "compact" is icon-only. */
  variant?: "labelled" | "compact";
};

/**
 * Icon-only links still need an accessible name — an unlabelled icon button is
 * silence to a screen reader. In compact mode the label moves to aria-label;
 * in labelled mode the visible text does the job and the icon is decorative.
 */
export function SocialLinks({ variant = "labelled" }: SocialLinksProps) {
  const compact = variant === "compact";

  return (
    <ul className={compact ? "flex gap-2" : "flex flex-wrap gap-3"}>
      {socials.map((social) => {
        const Icon = icons[social.key];
        const external = !social.href.startsWith("mailto:");

        return (
          <li key={social.key}>
            <a
              href={social.href}
              {...(external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              aria-label={compact ? social.label : undefined}
              className={
                "border-poso text-leche hover:border-ambar hover:text-ambar group inline-flex items-center " +
                "rounded-full border transition-[color,border-color,transform] " +
                "duration-[--dur-control] ease-[--ease-out] active:scale-[0.96] " +
                (compact
                  ? "size-11 justify-center"
                  : "min-h-11 gap-2.5 px-5 text-sm")
              }
            >
              <Icon className="size-[18px] shrink-0" />
              {compact ? null : <span>{social.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

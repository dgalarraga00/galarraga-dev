import { SocialLinks } from "./SocialLinks";
import { profile } from "@/content/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-poso border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-vapor font-mono text-xs">
          © {year} {profile.name}
        </p>
        <SocialLinks variant="compact" />
      </div>
    </footer>
  );
}

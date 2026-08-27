/**
 * Normalises an external URL so it can never be treated as a relative path.
 *
 * `href="home.example.com"` is not a bug the browser reports: it resolves the
 * value against the current page and quietly navigates to
 * `/home.example.com`, which 404s. Writing a bare domain in the content file
 * is an easy mistake, so it gets corrected here instead of silently breaking.
 *
 * Values that already carry a scheme — https, http, mailto, tel — pass through
 * untouched.
 */
export function externalUrl(value: string): string {
  const trimmed = value.trim();
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 " +
  // 44px minimum target on every pointer type, not just touch.
  "min-h-11 text-sm font-medium " +
  "transition-[background-color,border-color,color,transform] " +
  "duration-[--dur-press] ease-[--ease-out] " +
  // Press feedback is immediate and small. Scale on the element itself, not a
  // wrapper, so the whole target responds.
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  solid: "bg-ambar text-espresso hover:bg-cobre",
  outline:
    "border border-poso-strong text-crema hover:border-ambar hover:text-ambar",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({
  variant = "solid",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={`${base} ${variants[variant]} ${className ?? ""}`}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({
  variant = "solid",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

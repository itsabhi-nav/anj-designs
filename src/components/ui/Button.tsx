import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "ghost-light";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  ghost: "btn-primary",
  "ghost-light": "btn-ghost-light",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  arrow = "right",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: "right" | "up-right" | "none";
  external?: boolean;
}) {
  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  return (
    <Link
      href={href}
      className={cn(variants[variant], className)}
      {...(external
        ? { target: "_blank", rel: "noreferrer noopener" }
        : {})}
    >
      <span>{children}</span>
      {arrow !== "none" && (
        <Icon
          className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export default Button;

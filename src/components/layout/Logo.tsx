import Link from "next/link";
import { cn } from "@/lib/utils/cn";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="My Gujarat Property — home"
      className={cn("flex shrink-0 items-center gap-1.5 sm:gap-2", className)}
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 11l9-7 9 7" />
          <path d="M5 10v9h14v-9" />
          <path d="M10 19v-5h4v5" />
        </svg>
      </span>
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-zinc-900 sm:text-base">
        My Gujarat Property
      </span>
    </Link>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant =
  "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link";
type Size = "sm" | "md";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover shadow-sm",
  secondary: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200",
  outline: "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50",
  ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100",
  destructive: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  link: "bg-transparent text-brand hover:underline p-0 h-auto",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
};

const BASE =
  "inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:pointer-events-none";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = CommonProps &
  React.ComponentProps<typeof Link> & { href: string };

export function Button(props: ButtonProps | LinkProps) {
  const {
    variant = "primary",
    size = "md",
    loading,
    className,
    children,
    ...rest
  } = props;
  const classes = cn(
    BASE,
    VARIANT_CLASSES[variant],
    variant !== "link" && SIZE_CLASSES[size],
    className
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof CommonProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as Omit<ButtonProps, keyof CommonProps>;
  return (
    <button
      className={classes}
      disabled={loading || buttonRest.disabled}
      {...buttonRest}
    >
      {loading && (
        <svg
          className="w-3.5 h-3.5 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}

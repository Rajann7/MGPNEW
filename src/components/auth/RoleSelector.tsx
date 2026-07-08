"use client";

import { Home, Briefcase, Building2 } from "lucide-react";

type Role = "owner" | "broker" | "builder";

const ROLES: {
  value: Role;
  label: string;
  description: string;
  Icon: typeof Home;
}[] = [
  {
    value: "owner",
    label: "Owner",
    description: "Sell or rent your own property, manage enquiries.",
    Icon: Home,
  },
  {
    value: "broker",
    label: "Broker / Agent",
    description: "List multiple client properties, manage leads at scale.",
    Icon: Briefcase,
  },
  {
    value: "builder",
    label: "Builder / Developer",
    description: "Post RERA projects, showcase inventory and possession plans.",
    Icon: Building2,
  },
];

interface Props {
  value: Role | null;
  onChange: (role: Role) => void;
  error?: string;
}

/** Role cards ported 1:1 from Batch 2 design (screen 8 "Who are you?"). */
export function RoleSelector({ value, onChange, error }: Props) {
  return (
    <div className="flex flex-col gap-2.5">
      {ROLES.map(({ value: v, label, description, Icon }) => {
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(v)}
            className={[
              "flex items-center gap-3.5 rounded-2xl p-4 text-left transition-all",
              selected
                ? "border-[1.5px] border-[#0F6B5C] bg-[#E7F2EF]"
                : "border border-[#e4e4e7] bg-white hover:border-[#a1a1aa] hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]",
            ].join(" ")}
          >
            <span
              className={[
                "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl",
                selected ? "bg-white" : "bg-[#f4f4f5]",
              ].join(" ")}
            >
              <Icon
                className="h-[21px] w-[21px]"
                color={selected ? "#0F6B5C" : "#52525b"}
                strokeWidth={2}
              />
            </span>
            <div className="flex-1">
              <div
                className={[
                  "text-sm font-semibold",
                  selected ? "text-[#0F6B5C]" : "text-[#18181b]",
                ].join(" ")}
              >
                {label}
              </div>
              <div className="mt-0.5 text-xs leading-[1.5] text-[#52525b]">
                {description}
              </div>
            </div>
            <span
              className={[
                "h-5 w-5 flex-shrink-0 rounded-full bg-white",
                selected
                  ? "border-[6px] border-[#0F6B5C]"
                  : "border-[1.5px] border-[#d4d4d8]",
              ].join(" ")}
            />
          </button>
        );
      })}
      {error && <p className="text-xs text-[#DC2626]">{error}</p>}
    </div>
  );
}

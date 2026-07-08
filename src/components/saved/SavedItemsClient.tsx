"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Bookmark } from "lucide-react";
import { unsaveItem } from "@/lib/actions/saved";
import type { SavedItemRow } from "@/lib/actions/saved";

const ITEM_PATH: Record<string, string> = {
  property: "/property",
  project: "/project",
};

export function SavedItemsClient({ items }: { items: SavedItemRow[] }) {
  const [list, setList] = useState(items);
  const [isPending, startTransition] = useTransition();

  function handleUnsave(item: SavedItemRow) {
    startTransition(async () => {
      const result = await unsaveItem(item.item_type, item.item_id);
      if (result.success)
        setList((prev) => prev.filter((i) => i.id !== item.id));
    });
  }

  if (list.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No saved items"
        description="Properties and projects you save while browsing will appear here."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {list.map((item) => {
        const path = ITEM_PATH[item.item_type];
        const content = (
          <Card interactive={item.available}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {item.available
                    ? (item.cityText ?? "—")
                    : "No longer available"}
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={isPending}
                onClick={(e) => {
                  e.preventDefault();
                  handleUnsave(item);
                }}
              >
                Unsave
              </Button>
            </div>
          </Card>
        );
        return item.available && path && item.slug ? (
          <Link key={item.id} href={`${path}/${item.slug}`}>
            {content}
          </Link>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </div>
  );
}

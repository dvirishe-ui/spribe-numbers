import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, CalendarClock, CheckCircle2, FileText, Megaphone, PartyPopper, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NOTIFICATIONS, type NotificationKind } from "@/lib/promos";

const KIND_ICON: Record<NotificationKind, typeof Bell> = {
  new_promo: Megaphone,
  deadline: CalendarClock,
  confirmed: CheckCircle2,
  terms_updated: FileText,
  assets_available: FileText,
  starting_tomorrow: Trophy,
  results_available: PartyPopper,
};

function timeAgo(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const days = Math.floor(ms / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
}

export function NotificationCenter() {
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(NOTIFICATIONS.filter((n) => n.read).map((n) => n.id)),
  );
  const unread = NOTIFICATIONS.filter((n) => !readIds.has(n.id)).length;

  return (
    <Popover onOpenChange={(open) => {
      if (open) setReadIds(new Set(NOTIFICATIONS.map((n) => n.id)));
    }}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="border-b border-border px-4 py-3">
          <p className="font-display text-sm font-semibold">Notifications</p>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {NOTIFICATIONS.map((n) => {
            const Icon = KIND_ICON[n.kind];
            const body = (
              <div className="flex gap-3 px-4 py-3 transition-colors hover:bg-surface-raised">
                <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Icon className="size-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.detail}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">{timeAgo(n.timestamp)}</p>
                </div>
              </div>
            );
            return n.promoId ? (
              <Link key={n.id} to="/promo/$promoId" params={{ promoId: n.promoId }} className="block">
                {body}
              </Link>
            ) : (
              <div key={n.id}>{body}</div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

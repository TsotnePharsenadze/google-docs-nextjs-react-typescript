import { ClientSideSuspense } from "@liveblocks/react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";

export default function Inbox() {
  return (
    <ClientSideSuspense fallback={null}>
      <InboxList />
    </ClientSideSuspense>
  );
}

function InboxList() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-12" />
          {inboxNotifications?.length > 0 && (
            <span className="absolute right-[3px] -top-[2px] text-sm text-sky-500">
              {inboxNotifications?.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="overflow-x-scroll">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification: any) => (
                <InboxNotification
                  key={inboxNotification.id}
                  inboxNotification={inboxNotification}
                  className="z-50"
                />
              ))}
            </InboxNotificationList>
          ) : (
            <span>No notification yet </span>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

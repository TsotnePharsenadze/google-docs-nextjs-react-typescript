"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const key =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY ??
    "pk_dev_oSHTnphyqTZvToRfWSnOHc4DClVHaJiBXqblkpQIvh0R9aOmKQXs3caKsKxlAZvf";
  return (
    <LiveblocksProvider publicApiKey={key}>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

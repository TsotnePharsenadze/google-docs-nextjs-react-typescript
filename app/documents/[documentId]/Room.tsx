"use client";

import { ReactNode, useEffect, useCallback, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import resolveUsersAction from "@/actions/resolveUsersAction";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const key =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_KEY ??
    "pk_dev_oSHTnphyqTZvToRfWSnOHc4DClVHaJiBXqblkpQIvh0R9aOmKQXs3caKsKxlAZvf";

  const [users, setUsers] = useState<User[]>([]);

  const resolveUsers = useCallback(async () => {
    try {
      const fetchedUsers = await resolveUsersAction();
      setUsers(fetchedUsers);
    } catch {
      toast("Something went wrong");
    }
  }, []);

  useEffect(() => {
    resolveUsers();
  }, [resolveUsers]);

  return (
    <LiveblocksProvider
      resolveUsers={({ userIds }) =>
        userIds.map((userId) => users.find((user) => user.id === userId))
      }
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;
        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={() => []}
      throttle={16}
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-sync";
        const roomId = params?.documentId as string;
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room: roomId }),
        });
        return await res.json();
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<Loading />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

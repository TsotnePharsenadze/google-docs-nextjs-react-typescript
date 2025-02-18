"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Image from "next/image";
import { useState } from "react";

export default function Avatar() {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarList />
    </ClientSideSuspense>
  );
}

function AvatarList() {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) return null;

  return (
    <div className="relative flex items-center">
      {currentUser && (
        <AvatarElement
          key={currentUser.connectionId}
          name={currentUser.info.name}
          avatar={currentUser.info.avatar}
          index={1}
        />
      )}
      {users.map((user, index) => {
        console.log(user?.info?.avatar);
        return (
          <AvatarElement
            key={user.connectionId}
            name={user.info.name}
            avatar={user.info.avatar}
            index={index + 1}
          />
        );
      })}
    </div>
  );
}

function AvatarElement({
  name,
  avatar,
  index,
}: {
  name?: string;
  avatar?: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      style={{ marginLeft: index === 0 ? 0 : "-12px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-lg">
          {name ?? "Anon-user"}
        </div>
      )}
      <Image
        src={avatar?.length === 0 ? "/default_avatar.png" : (avatar as string)}
        width={40}
        height={40}
        className="rounded-full border-2 border-white group-hover:scale-110 transition-transform"
        alt={`Avatar of ${name}`}
      />
    </div>
  );
}

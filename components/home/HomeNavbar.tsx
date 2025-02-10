import Link from "next/link";
import Image from "next/image";
import SearchInput from "./SearchInput";
import { UserButton } from "@clerk/nextjs";

const HomeNavbar = () => {
  return (
    <div className="flex items-center w-full h-full justify-between">
      <div className="flex gap-x-3 items-center">
        <Link href="/">
          <Image src={"/logo.PNG"} height={36} width={36} alt={"Logo"} />
        </Link>
        <b>DOCS</b>
      </div>
      <SearchInput />
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default HomeNavbar;

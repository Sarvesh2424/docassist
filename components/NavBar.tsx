"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavBar() {
  const pathName = usePathname();
  return (
    <div className="bg-yellow-500 fixed w-full flex items-center gap-4 p-4 text-black">
      <h1 className="text-4xl">Docassist</h1>
      <Link href={"/"}>
        <button
          className={`ml-8 hover:cursor-pointer ${pathName == "/" && "font-extrabold"}`}
        >
          Documents
        </button>
      </Link>
      <Link href={"/upload"}>
        <button
          className={`hover:cursor-pointer ${pathName == "/upload" && "font-extrabold"}`}
        >
          Upload
        </button>
      </Link>
    </div>
  );
}

export default NavBar;

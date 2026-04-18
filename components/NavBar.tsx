"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function NavBar() {
  const pathName = usePathname();
  const [loggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            router.push("/login");
          });
        },
      },
    });
    setIsLoggingOut(false);
  };

  return (
    <>
      <div className="bg-yellow-500 fixed w-full flex items-center justify-between  gap-4 p-4 text-black">
        <div className="flex gap-4 items-center">
          <h1 className="text-4xl">Docassist</h1>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        {isOpen && (
          <div className="flex flex-col p-2 items-center justify-center absolute right-2 top-16 bg-yellow-600 shadow-black shadow-lg rounded-lg">
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
            <button
              disabled={loggingOut}
              className={`text-lg  text-red-500 mt-2 ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg`}
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              <LogOut />
              Log Out
            </button>
          </div>
        )}
      </div>
      <div className="hidden bg-yellow-500 fixed w-full md:flex items-center justify-between gap-4 p-4 text-black">
        <div className="flex gap-4 items-center">
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

        <button
          disabled={loggingOut}
          className={`text-lg  text-red-500 mt-2 ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg`}
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          <LogOut />
          Log Out
        </button>
      </div>
    </>
  );
}

export default NavBar;

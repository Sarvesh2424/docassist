"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import DocumentsList from "./DocumentsList";

function NavBar() {
  const [loggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          new Promise((resolve) => setTimeout(resolve, 1)).then(() => {
            router.replace("/login");
          });
        },
      },
    });
    setIsLoggingOut(false);
  };

  return (
    <>
      <div className="md:hidden bg-amber-300 fixed w-full flex items-center justify-between  gap-4 p-4 text-black">
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
          <div className="flex md:hidden flex-col p-2 items-center justify-between absolute  top-16 right-2 shadow-2xl shadow-black bg-amber-300  w-2/3 rounded-lg">
            <div className="flex w-full flex-col overflow-y-auto h-[calc(75vh)] justify-start gap-4 items-center">
              <DocumentsList />
            </div>
            <button
              disabled={loggingOut}
              className={`text-lg  text-white mt-8 w-full ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-600 transition-colors p-2 bg-red-500 rounded-lg`}
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
      <div className="hidden bg-amber-300 flex-col max-h-screen max-w-1/5 min-w-1/5 md:flex items-center justify-between gap-4 p-4 text-black">
        <h1 className="text-4xl">Docassist</h1>
        <div className="flex w-full flex-col justify-start overflow-y-auto grow [scrollbar-width:none] gap-4 items-center">
          <DocumentsList />
        </div>

        <button
          disabled={loggingOut}
          className={`text-lg w-full flex justify-center  text-white mt-2 ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-600 transition-colors p-2 bg-red-500 rounded-lg`}
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

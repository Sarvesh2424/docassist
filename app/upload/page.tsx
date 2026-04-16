import NavBar from "@/components/NavBar";
import UploadFile from "@/components/UploadFile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Upload() {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      redirect("/login");
    }
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="bg-black min-h-screen flex flex-col ">
        <NavBar />
        <UploadFile />
      </div>
    </>
  );
}

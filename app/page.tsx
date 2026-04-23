import NavBar from "@/components/NavBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import UploadFile from "@/components/UploadFile";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Toaster position="top-right" />
      
      <div className="bg-gray-900 min-h-screen flex justify-between">
        <NavBar />
        <div className="w-full">
          <UploadFile />
        </div>
      </div>
    </>
  );
}

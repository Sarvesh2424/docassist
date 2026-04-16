import DocumentsList from "@/components/DocumentsList";
import NavBar from "@/components/NavBar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Toaster position="bottom-right" />
      <NavBar />
      <div className="bg-black min-h-screen">
        <div className="p-24 pt-32">
          <h1 className="text-white text-2xl">Your documents</h1>
          <DocumentsList />
        </div>
      </div>
    </>
  );
}

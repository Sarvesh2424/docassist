import ChatWindow from "@/components/ChatWindow";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

async function Chat({ params }: { params: { id: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const { id } = await params;

  return (
    <>
      <Toaster position="bottom-right" />
      <div className="bg-black min-h-screen flex flex-col text-white">
        <ChatWindow id={id} />
      </div>
    </>
  );
}

export default Chat;

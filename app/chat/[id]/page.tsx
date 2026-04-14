import ChatWindow from "@/components/ChatWindow";
import { Toaster } from "react-hot-toast";

async function Chat({ params }: { params: { id: string } }) {
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

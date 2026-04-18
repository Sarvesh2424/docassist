"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MessageBubble from "./MessageBubble";
import BubbleSkeleton from "./BubbleSkeleton";

async function getChat({ id }: { id: string }) {
  console.log("func: " + id);
  const response = await fetch(`/api/get-chats?id=${id}`);
  const data = await response.json();
  return data;
}

async function sendMessage({
  query,
  file_id,
}: {
  query: string;
  file_id: string;
}) {
  const response = await fetch("https://sarvesh-24-24-docassist.hf.space/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, file_id }),
  });
  return response.json();
}

async function uploadToDB({
  chat,
  fileId,
}: {
  chat: Array<object>;
  fileId: string;
}) {
  console.log(chat);
  // if (Object.keys(chat)[0] == "ai") {
  //   console.log("ai upload");
  // }
  // else{
  //   console.log("human upload")
  // }
  const response = await fetch("/api/send-message", {
    method: "PUT",
    body: JSON.stringify({ chat, id: fileId }),
  });
}

function ChatWindow({ id }: { id: string }) {
  console.log("id:" + id);
  const queryClient = useQueryClient();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const [dummy, setDummy] = useState("");
  const [localChat, setLocalChat] = useState<
    Array<{ human?: string; message?: string; ai?: string }>
  >([]);
  const { data: chat, isPending } = useQuery({
    queryKey: ["chat"],
    queryFn: () => getChat({ id }),
    gcTime: 0,
  });
  const router = useRouter();
  const { mutate: prismaMutate, isPending: prismaPending } = useMutation({
    mutationFn: uploadToDB,
  });
  const {
    mutate,
    isPending: genAi,
    data,
  } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      setLocalChat([...localChat, data]);
      prismaMutate({
        chat: [...chat.chat, { human: dummy }, data],
        fileId: id,
      });
      setDummy("");
    },
  });

  const handleSend = async () => {
    if (!message) {
      toast.error("Cannot be empty");
      return;
    }
    setDummy(message);
    setMessage("");
    setLocalChat([...localChat, { human: message }]);
    prismaMutate({ chat: [...chat.chat, { human: message }], fileId: id });
    mutate({ query: message, file_id: id });
    console.log("data:" + data);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localChat]);

  useEffect(() => {
    if (chat?.chat) {
      console.log("in effect: ", chat.chat);
      setLocalChat(chat.chat);
    }
  }, [chat]);

  return (
    <div className="text-white grow flex flex-col items-center justify-center items py-20 p-4">
      {isPending ? (
        <p>Loading</p>
      ) : (
        <>
          <div className="fixed top-0 p-2 bg-white rounded-b-2xl text-black text-2xl min-w-2/3 text-center shadow-2xl shadow-black">
            {" "}
            {chat.title}
          </div>
          {localChat.length == 0 ? (
            <p className="text-2xl">No messages found! Start your chat now!</p>
          ) : (
            <div className="w-2/3 flex flex-col gap-4 p-12 overflow-y-auto">
              {genAi ? (
                <>
                  {localChat.map(
                    (message: { human?: string; ai?: string }, idx: number) => (
                      <MessageBubble key={idx} message={message} />
                    ),
                  )}
                  <BubbleSkeleton />
                  <div ref={bottomRef} />
                </>
              ) : (
                <>
                  {localChat.map(
                    (message: { human?: string; ai?: string }, idx: number) => (
                      <MessageBubble key={idx} message={message} />
                    ),
                  )}
                  <div ref={bottomRef} />
                </>
              )}
            </div>
          )}
        </>
      )}
      <form className="fixed bottom-8 w-2/3">
        <div className="px-8">
          <div className="relative w-full">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Enter message..."
              className="bg-white rounded-lg text-black shadow-black shadow-2xl  placeholder:text-gray-600 p-4 w-full pr-20"
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();

                handleSend();
              }}
              className="absolute hover:cursor-pointer right-8 bottom-4 text-black"
            >
              <Send />
            </button>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setLocalChat([]);
            router.replace("/");
          }}
          className=" fixed top-12 text-red-500 hover:cursor-pointer right-12"
        >
          <X className="w-10 h-20 " />
        </button>
      </form>
    </div>
  );
}

export default ChatWindow;

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import MessageBubble from "./MessageBubble";
import BubbleSkeleton from "./BubbleSkeleton";

async function getChat({ id }: { id: string }) {
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
  const response = await fetch("http://127.0.0.1:8000/ask", {
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
  const response = await fetch("/api/send-message", {
    method: "PUT",
    body: JSON.stringify({ chat, id: fileId }),
  });
}

function ChatWindow({ id }: { id: string }) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState("");
  const { data: chat, isPending } = useQuery({
    queryKey: ["chat"],
    queryFn: () => getChat({ id }),
  });
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: prismaMutate, isPending: prismaPending } = useMutation({
    mutationFn: uploadToDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat"],
      });
    },
  });
  const { mutate, isPending: genAi } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      prismaMutate({ chat: [...chat.chat, data], fileId: id });
      setMessage("");
    },
  });

  const handleSend = async () => {
    if (!message) {
      toast.error("Cannot be empty");
      return;
    }
    prismaMutate({ chat: [...chat.chat, { human: message }], fileId: id });
    mutate({ query: message, file_id: id });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
          {chat.chat.length == 0 ? (
            <p className="text-2xl">No messages found! Start your chat now!</p>
          ) : (
            <div className="w-2/3 flex flex-col gap-4 p-12 overflow-y-auto">
              {genAi ? (
                <>
                  {chat.chat.map(
                    (message: { message: object }, idx: number) => (
                      <MessageBubble key={idx} message={message} />
                    ),
                  )}
                  <BubbleSkeleton />
                </>
              ) : (
                <>
                  {chat.chat.map(
                    (message: { message: object }, idx: number) => (
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
      <div className="fixed bottom-8 w-2/3 px-8">
        <div className="relative w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Enter message..."
            className="bg-white rounded-lg text-black shadow-black shadow-2xl  placeholder:text-gray-600 p-4 w-full pr-20"
          />
          <button
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
          router.replace("/");
        }}
        className=" fixed top-12 text-red-500 hover:cursor-pointer right-12"
      >
        <X className="w-10 h-20 " />
      </button>
    </div>
  );
}

export default ChatWindow;

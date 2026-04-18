function MessageBubble({ message }: { message: object }) {
  return (
    <div
      className={`w-full ${Object.keys(message)[0] === "human" ? "justify-end" : ""} flex `}
    >
      <div
        className={`${Object.keys(message)[0] === "ai" ? "bg-yellow-500 text-black" : "bg-white text-black"} max-w-5/6 md:max-w-2/3 rounded-lg p-4 flex gap-2 flex-col`}
      >
        <p className="text-sm">{Object.keys(message)[0] =="ai"?"AI":"You"}</p>
        <p className="text-lg">{Object.values(message)[0]}</p>
      </div>
    </div>
  );
}

export default MessageBubble;

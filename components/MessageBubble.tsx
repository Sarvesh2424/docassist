function MessageBubble({ message }: { message: object }) {
  return (
    <div className={`w-full ${Object.keys(message)[0] === "human" ? "justify-end":""} flex `}>
      <div
        className={`${Object.keys(message)[0] === "ai" ? "bg-yellow-500 text-black" : "bg-white text-black"} max-w-2/3 rounded-lg p-4`}
      >
        {Object.values(message)[0]}
      </div>
    </div>
  );
}

export default MessageBubble;

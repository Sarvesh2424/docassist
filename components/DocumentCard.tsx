import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

function DocumentCard({
  name,
  date,
  id,
}: {
  date: Date;
  name: string;
  id: string;
}) {
  const router = useRouter();
  return (
    <div className="bg-white p-2 rounded-lg  flex flex-col gap-4">
      <p className="text-xl font-bold">{name}</p>
      <p className="text-gray-700 flex gap-2 items-center"><Clock className="w-4 h-4"/> {dayjs(date).fromNow()}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          router.replace(`/chat/${id}`);
        }}
        className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition-colors font-semibold text-sm  p-2 rounded-lg"
      >
        Chat
      </button>
    </div>
  );
}

export default DocumentCard;

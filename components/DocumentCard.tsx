import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
    <div className="bg-yellow-500 p-2 rounded-lg  text-lg flex flex-col gap-4">
      {name}
      <p>{dayjs(date).fromNow()}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          router.replace(`/chat/${id}`);
        }}
        className="bg-green-500 text-white p-2 rounded-lg"
      >
        Chat
      </button>
    </div>
  );
}

export default DocumentCard;

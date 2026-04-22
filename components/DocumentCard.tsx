import { useRouter } from "next/navigation";

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
    <button className="hover:cursor-pointer max-w-full  p-2 pl-0 rounded-xl hover:bg-yellow-600 transition-colors"
      onClick={(e) => {
        e.preventDefault();
        router.replace(`/chat/${id}`);
      }}
    >
        <p className="text-lg font-semibold max-w-full truncate text-start" >{name}</p>
    </button>
  );
}

export default DocumentCard;

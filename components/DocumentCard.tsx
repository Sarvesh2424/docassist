import Link from "next/link";

function DocumentCard({ name, id }: { date: Date; name: string; id: string }) {
  return (
    <Link href={`/chat/${id}`}>
      <div className="hover:cursor-pointer max-w-full  p-2 pl-0 rounded-xl hover:bg-yellow-600 transition-colors">
        <p className="text-lg  max-w-full truncate text-start">
          {name}
        </p>
      </div>
    </Link>
  );
}

export default DocumentCard;

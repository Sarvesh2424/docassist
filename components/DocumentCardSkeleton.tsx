
import { useRouter } from "next/navigation";

function DocumentCardSkeleton() {
  const router = useRouter();
  return (
    <div className="bg-gray-500 h-10 p-2 rounded-lg  text-lg flex flex-col gap-4 animate-pulse"></div>
  );
}

export default DocumentCardSkeleton;

"use client";

import { useQuery } from "@tanstack/react-query";
import DocumentCard from "./DocumentCard";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";
import DocumentCardSkeleton from "./DocumentCardSkeleton";

type Document = {
  id: string;
  name: string;
  uploadedAt: Date;
};

const getDocuments = async ({ id }: { id: string | undefined }) => {
  const response = await fetch(`/api/get-docs?id=${id}`);
  const data = await response.json();
  return data.documents;
};

function DocumentsList() {
  const session = authClient.useSession();
  const { data: documents, isPending } = useQuery({
    queryKey: ["documents", session],
    queryFn: () => getDocuments({ id: session.data?.user.id }),
    enabled: !!session,
  });

  return (
    <div className="flex w-full flex-col mt-4 ">
      <p className="text-sm font-semibold w-full text-gray-800 flex mb-2 items-start">
        Your docs
      </p>
      {isPending || session.isPending ? (
        <div className="w-full flex justify-center">
          <div className=" h-10 w-10 border border-black border-l-0 animate-spin rounded-full mt-2 "></div>
        </div>
      ) : (
        <>
          {documents.length == 0 ? (
            <p className="text-black text-center">
              No documents found! Start uploading a PDF!
            </p>
          ) : (
            documents.toReversed().map((document: Document) => {
              return (
                <DocumentCard
                  key={document.id}
                  name={document.name}
                  date={document.uploadedAt}
                  id={document.id}
                />
              );
            })
          )}
        </>
      )}
    </div>
  );
}

export default DocumentsList;

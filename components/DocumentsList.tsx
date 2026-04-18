"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DocumentCard from "./DocumentCard";
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
    <div className="grid md:grid-cols-4 grid-cols-1 mt-4 gap-4">
      {isPending || session.isPending ? (
        <DocumentCardSkeleton />
      ) : (
        <>
          {documents.length == 0 ? (
            <p className="text-white">
              No documents found! Start uploading a PDF!
            </p>
          ) : (
            documents.map((document: Document) => {
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

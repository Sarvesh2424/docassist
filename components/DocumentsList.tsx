"use client";

import { useQuery } from "@tanstack/react-query";
import DocumentCard from "./DocumentCard";

type Document = {
  id: string;
  name: string;
  date: Date;
};

const getDocuments = async () => {
  const response = await fetch("/api/get-docs");
  const data = await response.json();
  return data.documents;
};

function DocumentsList() {
  const { data: documents, isPending } = useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });

  return (
    <div className="grid grid-cols-4 mt-4 gap-4">
      {isPending ? (
        <p>loading</p>
      ) : (
        documents.map((document: Document) => (
          <DocumentCard
            key={document.id}
            name={document.name}
            date={document.date}
            id={document.id}
          />
        ))
      )}
    </div>
  );
}

export default DocumentsList;

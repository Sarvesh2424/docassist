"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const uploadFile = async (formData: FormData) => {
  const response = await fetch(
    "https://sarvesh-24-24-docassist.hf.space/upload",
    {
      body: formData,
      method: "POST",
    },
  );
  return response.json();
};

const uploadToDB = async (fileData: {
  fileId: string;
  fileName: string | undefined;
  userId: string | undefined;
}) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: JSON.stringify(fileData),
  });
};

function UploadFile() {
  const router = useRouter();
  const session = authClient.useSession();
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });
  const { mutate: prismaMutate, isPending: prismaPending } = useMutation({
    mutationFn: uploadToDB,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: uploadFile,
    onSuccess: (data) => {
      const fileId = data.file_id;
      prismaMutate({
        fileId,
        fileName: file?.name,
        userId: session.data?.user.id,
      });
      setFile(null);
      router.replace(`/chat/${fileId}`);
      toast.success("Uploaded file successfully");
    },
    onError: () => {
      toast.error("Error uploading file");
    },
  });

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {isPending || prismaPending ? (
        <div className="w-full flex items-center justify-center gap-4 flex-col text-white">
          <div className="h-20 w-20 border-2 border-white border-l-0 animate-spin rounded-full"></div>
          Uploading file... This may take a moment...
        </div>
      ) : (
        <div className="flex p-4 shadow-xl max-w-full h-2/3 justify-center items-center gap-4 text-white flex-col md:w-1/2 rounded-lg">
          <h2 className="text-4xl w-full text-start mb-4 font-semibold">
            Select a .pdf file to upload
          </h2>
          <div className="bg-white rounded-xl flex flex-col w-full items-center">
            <div {...getRootProps()} className="w-full p-4 cursor-pointer">
              <input {...getInputProps()} />

              <div className="bg-gray-200 border border-gray-500 rounded-xl p-16 flex flex-col items-center justify-center text-black">
                {file ? (
                  <p className="text-lg font-semibold mt-2">{file.name}</p>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12" />
                    <p className="text-lg mt-2">Upload or drop a file here</p>  
                  </div>
                )}
              </div>
            </div>
            <>
              {file && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpload();
                  }}
                  className="p-2 bg-yellow-500 w-2/3 text-sm font-semibold hover:bg-yellow-600 cursor-pointer transition-colors text-black rounded-lg mb-2"
                >
                  Upload
                </button>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFile;

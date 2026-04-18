"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const uploadFile = async (formData: FormData) => {
  const response = await fetch("https://sarvesh-24-24-docassist.hf.space/upload", {
    body: formData,
    method: "POST",
  });
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
      router.replace("/");
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
        <div className="flex p-4 shadow-xl justify-center items-center gap-4 text-white flex-col md:w-1/3 rounded-lg">
          <h2 className="text-lg">Select a .pdf file to upload</h2>
          <div className="relative md:w-2/3 w-5/6 hover:cursor-pointer">
            <input
              className="border text-transparent hover:cursor-pointer border-white w-full p-20 file:hidden rounded-xl"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
              type="file"
            />
            {file ? (
              <h2 className="absolute top-1/2 left-0 right-0 mx-auto text-center">{file?.name}</h2>
            ) : (
              <>
                <Upload className="absolute top-1/4 left-0 right-0 mx-auto h-15 w-15 " />
                <h2 className="absolute bottom-1/4 left-0 right-0 mx-auto text-center">
                  Upload a file
                </h2>{" "}
              </>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpload();
            }}
            className="p-2 bg-yellow-500 w-1/3 text-sm font-semibold hover:bg-yellow-600 cursor-pointer transition-colors text-black rounded-lg"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadFile;

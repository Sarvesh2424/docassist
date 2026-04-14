import NavBar from "@/components/NavBar";
import UploadFile from "@/components/UploadFile";
import { Toaster } from "react-hot-toast";

export default function Upload() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="bg-black min-h-screen flex flex-col ">
        <NavBar />
        <UploadFile />
      </div>
    </>
  );
}

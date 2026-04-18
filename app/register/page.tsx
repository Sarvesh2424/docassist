import RegisterForm from "@/components/RegisterForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

async function Register() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col md:flex-row md:min-h-screen h-screen bg-yellow-500">
        <div className="min-h-1/3 md:w-1/2 md:min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className=" text-6xl">Docassist</h1>
            <p className="text-lgp-2 text-center">
              Your personal AI assistant for PDFs.
            </p>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center justify-center md:w-1/2 md:min-h-screen h-2/3">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Register;

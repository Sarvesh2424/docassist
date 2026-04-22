import LoginForm from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";

async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row md:min-h-screen h-screen bg-yellow-500">
        <div className="min-h-1/3 md:w-1/2 md:min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-6xl">Docassist</h1>
            <p className="text-lgp-2 text-center">
              Your personal AI assistant for PDFs.
            </p>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center justify-center md:w-1/2 md:min-h-screen grow">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;

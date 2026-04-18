"use client";

import { authClient } from "@/lib/auth-client";
import loginReducer from "@/reducers/loginReducer";
import { Eye, EyeClosed } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const { data: session, isPending } = authClient.useSession();
  const [loginState, dispatch] = useReducer(loginReducer, {
    email: "",
    password: "",
    error: { email: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      if (session) {
        router.replace("/");
      }
    };
    checkLogin();
  }, [session]);

  async function emailLogin() {
    setLoading(true);
    if (!loginState?.email || !loginState.password) {
      toast.error("Email or password cannot be empty!");
      setLoading(false);
      return;
    }
    const { data, error } = await authClient.signIn.email(
      {
        email: loginState.email,
        password: loginState.password,
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
        onError: () => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  async function googleLogin() {
    setLoading(true);
    const { data, error } = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onError: () => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  return (
    <>
      {isPending ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-full md:max-w-xl"
          style={{ padding: "1rem 0rem" }}
        >
          <h1 className="uppercase font-black text-black text-3xl">Login</h1>
          <form className="flex flex-col min-w-[74%] w-[85%] md:w-[74%] items-center justify-center text-black mt-12 gap-2">
            <label className="w-full font-medium text-left">Email</label>
            <div className="w-full">
              <input
                onChange={(e) => {
                  dispatch({ type: "SET_EMAIL", email: e.target.value });
                  if (loginState.error.email || e.target.value.length === 0)
                    dispatch({ type: "VALIDATE_EMAIL" });
                }}
                onBlur={() => dispatch({ type: "VALIDATE_EMAIL" })}
                value={loginState.email}
                type="email"
                placeholder="Enter email..."
                className={`${loginState.error.email ? "border-red-500 outline-red-500 outline" : "border-black"} border w-full border-black p-2 rounded-lg `}
              />
            </div>
            {loginState.error.email && (
              <div className="text-[0.7rem] -mt-1 text-red-500 w-full">
                {loginState.error.email}
              </div>
            )}
            <label className="mt-2 text-left font-medium w-full">
              Password
            </label>
            <div className="w-full relative">
              <input
                onChange={(e) => {
                  dispatch({ type: "SET_PASSWORD", password: e.target.value });
                  if (loginState.error.password)
                    dispatch({ type: "VALIDATE_PASSWORD" });
                }}
                onBlur={() => dispatch({ type: "VALIDATE_PASSWORD" })}
                value={loginState.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                className={`${loginState.error.password ? "border-red-500 outline-red-500 outline" : "border-black"} border w-full border-black p-2 rounded-lg pr-10`}
              ></input>
              {showPassword ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                    dispatch({ type: "VALIDATE_PASSWORD" });
                  }}
                  className="absolute right-3 top-3 hover:cursor-pointer"
                >
                  <Eye className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                    dispatch({ type: "VALIDATE_PASSWORD" });
                  }}
                  className="absolute right-3 top-3 hover:cursor-pointer"
                >
                  <EyeClosed className="w-5 h-5" />
                </button>
              )}
            </div>
            {loginState.error.password && (
              <div className="text-[0.7rem] -mt-1 text-red-500 w-full">
                {loginState.error.password}
              </div>
            )}

            <button
              disabled={
                loginState.error.email !== "" ||
                loginState.error.password !== "" ||
                loading
              }
              onClick={(e) => {
                e.preventDefault();
                emailLogin();
              }}
              className={`bg-green-500 rounded-lg p-2 disabled:bg-gray-500 w-full ${loading && "hover:cursor-wait"} text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer`}
            >
              Login
            </button>
            <p className="mt-1.5">OR</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
              className="mt-1.5 p-2 bg-red-500 flex items-center justify-center gap-2 text-white w-full rounded-lg hover:bg-red-600 hover:transition-colors hover:cursor-pointer"
            >
              Continue with <GoogleIcon />
            </button>
          </form>
          <p className="mt-12 flex gap-2 text-[0.9rem]">
            New to Cricky? Click{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-500 hover:cursor-pointer -mx-1"
            >
              here
            </button>
            {""}
            to register
          </p>
        </div>
      )}
    </>
  );
}

export default LoginForm;

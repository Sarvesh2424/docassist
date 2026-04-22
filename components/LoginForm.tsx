"use client";

import { authClient } from "@/lib/auth-client";
import loginReducer from "@/reducers/loginReducer";
import { Eye, EyeClosed } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function LoginForm() {
  const { data: session, isPending } = authClient.useSession();
  const [loginState, dispatch] = useReducer(loginReducer, {
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
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
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setLoginSuccess(true);
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
        onSuccess: () => {
          setLoginSuccess(true);
        },
        onError: () => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  return (
    <>
      {isPending || loginSuccess ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <>
          <h1 className="text-black text-3xl">Login</h1>
          <form className="flex flex-col w-1/2 items-center justify-center text-black mt-12 gap-2">
            <label className="w-full text-left text-sm font-semibold">
              Email
            </label>
            <div className="w-full">
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", email: e.target.value })
                }
                onBlur={() => setCheckEmail(true)}
                onClick={() => setCheckEmail(false)}
                value={loginState.email}
                type="email"
                placeholder="Enter email..."
                className="border w-full border-black p-2 rounded-lg "
              />
            </div>
            {checkEmail &&
              loginState.email &&
              !regex.test(loginState.email) && (
                <p className="text-red-500 w-full text-sm">
                  Enter a valid email
                </p>
              )}

            <label className="mt-2 text-left w-full text-sm font-semibold">
              Password
            </label>
            <div className="w-full relative">
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", password: e.target.value })
                }
                value={loginState.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                className="border w-full border-black p-2 rounded-lg pr-12"
              ></input>
              {showPassword ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-3 top-2 hover:cursor-pointer"
                >
                  <Eye />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="absolute right-3 top-2 hover:cursor-pointer"
                >
                  <EyeClosed />
                </button>
              )}
            </div>

            <button
              disabled={!regex.test(loginState.email) || !loginState.password}
              onClick={(e) => {
                e.preventDefault();
                emailLogin();
              }}
              className={`bg-green-500 rounded-lg p-2 disabled:bg-gray-500 w-full ${loading && "hover:cursor-wait"} text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer`}
            >
              {loading ? <p>Logging in...</p> : <p>Login</p>}
            </button>
            <p className="mt-4">OR</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
              className="mt-1 p-2 bg-red-500 flex items-center justify-center gap-2 text-white w-full rounded-lg hover:bg-red-600 hover:transition-colors hover:cursor-pointer"
            >
              Continue with <GoogleIcon />
            </button>
          </form>
          <p className="mt-12 flex gap-2">
            New to Docassist? Click
            <Link href={"/register"}>
              <span className="text-blue-500 hover:cursor-pointer">here</span>
            </Link>
            to register
          </p>
        </>
      )}
    </>
  );
}

export default LoginForm;

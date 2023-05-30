"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  return (
    <a
    className="px-7 py-2 p-2 m-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
    style={{ backgroundColor: "#3b5998" }}
    onClick={() => signIn("google", { callbackUrl })}
    role="button"
  >
    <img
      className="pr-2"
      src="/images/google.svg"
      alt=""
      style={{ height: "2rem" }}
    />
    Continue with Google
  </a>
  );
};

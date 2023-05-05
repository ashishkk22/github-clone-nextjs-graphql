import { SignInSchema } from "@/validations/signinSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { loginUser } from "./api";

type FormValues = {
  username: string;
  password: string;
};

const login = () => {
  const router = useRouter();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit,
  });
  async function onSubmit(values: FormValues) {
    try {
      const userData = await loginUser({
        username: values.username,
        password: values.password,
      });
      router.push("/");
    } catch (err: any) {}
  }
  return (
    <div className="w-screen">
      <div className="flex flex-col items-center justify-center mt-12">
        <svg
          height="48"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="48"
          data-view-component="true"
          //   className="octicon octicon-mark-github"
        >
          <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
        </svg>
        <div className="mt-8 text-2xl">Sign in to Github</div>
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-[#f6f8fa] border-[#d8dee4] border-[1px] mt-8 w-[30rem]">
          <form
            onSubmit={formik.handleSubmit}
            onReset={() => formik.resetForm()}
          >
            <div className="px-6 py-4">
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-2 text-base">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-1.5"
                  placeholder="Enter your username"
                  required
                  {...formik.getFieldProps("username")}
                />
                {formik.errors.username && formik.touched.username ? (
                  <div className="text-sm">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="password" className="mb-2 text-base">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-500 block w-full p-1.5"
                  placeholder="Enter your password"
                  required
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className="text-sm">{formik.errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full p-2 mt-8 text-white bg-green-700 rounded-lg"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="max-w-sm rounded-lg overflow-hidden border-[#d8dee4] border-[1px] mt-8 w-[30rem] p-4 text-sm text-center">
          Don&apos;t have an account ?{" "}
          <span className="text-blue-600">
            {" "}
            <Link href={"/signup"}>Sign Up </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default login;

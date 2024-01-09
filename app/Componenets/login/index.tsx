"use client";

import { error } from "console";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/app/feth-api";
const LoginForm = () => {
  const initialInput = {
    email: "",
    password: "",
  };
 const URL="https://contact-p9wt.onrender.com"
  const router = useRouter();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: yup
      .string()
      .oneOf([yup.ref("password")])
      .min(8, "please enter 8 digit password"),
  });
  const formik = useFormik({
    initialValues: initialInput,
    validationSchema: formSchema,

    onSubmit,
  });

  async function onSubmit(values: any) {
  
    const option = {
      method: "POST",
      body: JSON.stringify({ ...values} ),
      headers:{
        "Content-Type": "application/json",
      }
    };
await fetch(`${URL}/api/login`,option)
    .then((res)=>
     res.json()
      
       
      ).then((data)=>{
        alert(data.message);
        if(data.data){
         localStorage.setItem("token",JSON.stringify(data.data.token))
         router.push('/home/contact/list')
        }
  })
      
  }
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" flex w-1/3 flex-col justify-center items-center mx-auto"
    >
      <div className="mb-5 w-full">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />

        <p className="text-red-600  text-xs">{formik.errors.email}</p>
      </div>
      <div className="mb-5 w-full">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <p className="text-red-600 text-xs">{formik.errors.password}</p>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;

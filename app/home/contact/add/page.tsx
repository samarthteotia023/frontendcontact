"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/app/feth-api";
import Drawer from "@/app/Componenets/drawer";

const Add = () => {
  const initialInput = {
    firstname: "",
    lastname: "",
    email: "",
    labels: "",
    mobile: 0,
  };
  const router = useRouter();
  const [data, setData] = useState<{ labels: [] }>();
  const formSchema = yup.object().shape({
    firstname: yup.string().required("username"),
    lastname: yup.string().required("lastname is required"),
    email: yup
      .string()
      .email("Invalid email address format")
      .required("Email is required"),
    mobile: yup
      .number()

      .min(10, "Error"),
    labels: yup.string().required("fdg"),
  });
  const formik = useFormik({
    initialValues: initialInput,
    validationSchema: formSchema,

    onSubmit,
  });

  async function onSubmit(values: any) {
    const path = `contact`;
    const option = {
      method: "POST",

      body: JSON.stringify({ ...values }),
    };

    const data = await fetchAPI(path, option);
    if (data) {
      alert(data);
      router.push("/home/contact/list");
    }
  }
  async function getalllabel() {
    const path = `getalllabels`;
    const option = {
      method: "GET",
    };
    const data = await fetchAPI(path, option);
    setData(data?.data);
    console.log(data, "lll");
  }
  useEffect(() => {
    getalllabel();
  }, []);
  return (
    <div className="">
      <Drawer />
      <form
        onSubmit={formik.handleSubmit}
        className="w-full ml-[400px] pl-10 pt-20 mx-auto"
      >
        <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="firstname"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            lastname
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="firstname"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5"
            placeholder="John"
            required
          />
        </div>
        <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="lastname"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            lastname
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="lastname"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5"
            placeholder="Doe"
            required
          />
        </div>
        <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Email
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5 "
            required
          />
        </div>
        <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="mobile"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Mobile
          </label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="mobile"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5 "
            required
          />
        </div>
        <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="labels"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Label
          </label>
          <select
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="labels"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5 "
            required
          >
            <option value={""}></option>
            {data?.labels?.map((item: any, index: number) => (
              <option key={index} value={item._id}>{item.name}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Save
        </button>
      </form>
    </div>
  );
};
export default Add;

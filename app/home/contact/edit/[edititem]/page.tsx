"use client"
import { useFormik } from "formik";
import * as yup from "yup";
import { useState,useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchAPI } from "@/app/feth-api";
import Drawer from "@/app/Componenets/drawer";



const Edit = () => {
  const {edititem}=useParams()
  const [label,setLabel]=useState<{labels:[]}>()
  const [data,setData]=useState<{firstname:string,lastname:string,email:string,mobile:any,labels:string}[]>([]);
  
  async function getcontacts() {
 
 
    const path=`readeditcontact/${edititem}`
    const option={
      method: "GET"
    }
    const data= await fetchAPI(path,option)
   
    setData(data);

  }
  async function getalllabel() {
   
    const path=`getalllabels`
    const option = {
      method: "GET",
    };
    const data= await fetchAPI(path,option)
    setLabel(data?.data)
    
   
     
    
  }

  useEffect(()=>{
  getcontacts(),
  getalllabel()
  },[])
   const initialInput={
    firstname:data[0]?.firstname,
    lastname:data[0]?.lastname,
    email:data[0]?.email,
    mobile:data[0]?.mobile,
    labels:data[0]?.labels
   }

   console.log(initialInput.firstname,"jbk")
   const router=useRouter()
   const URL = "http://localhost:8000";
   const formSchema = yup.object().shape({
     firstname: yup.string().required("username"),
     lastname:yup.string().required("lastname is required"),
     email: yup
       .string()
       .email("Invalid email address format")
       .required("Email is required"),
    mobile: yup
       .number()
      
       .min(10, "Error"),
   });
   const formik = useFormik({
     initialValues: initialInput,
     validationSchema: formSchema,
     
     onSubmit,
   });
 
   async function onSubmit(values: any) {
    const path=`updatecontact/${edititem}`
     const option = {
       method: "PUT",
      
 
       body: JSON.stringify({ ...values }),
     };
    
     const data= await fetchAPI(path,option)
        if(data){
         router.push('/home/contact/list')
         
        }
   }

   useEffect(()=>{
    formik.setFieldValue("firstname",data[0]?.firstname );
    formik.setFieldValue("lastname",data[0]?.lastname);
    formik.setFieldValue("mobile",data[0]?.mobile);
    formik.setFieldValue("email",data[0]?.email);
    formik.setFieldValue("label",data[0]?.labels)
   
   },[data])



     return (
    <div className="">
      <Drawer/>
      <form onSubmit={formik.handleSubmit} className="w-full ml-[400px] mx-auto">
      <div
          className="mb-5 w-8/12

"
        >
          <label
            htmlFor="firstname"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
           firstname
          </label>
          <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
      
            type="text"
            id="firstname"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5"
            
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
            value={formik.values.lastname}
            type="text"
            id="lastname"
            name="lastname"
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
           value={formik.values.email}
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
          value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="mobile"
            name="mobile"
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
            value={formik.values.labels}
            id="labels"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5 "
            required
          >
            {label?.labels?.map((item:any,index:number)=>(
 <option value={item._id}>{item.name}</option>
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
            }
export default Edit;
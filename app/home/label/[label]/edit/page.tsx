"use client"
import MyModal from "@/app/Componenets/modal"
import { useEffect, useState } from "react"
import { Formik, useFormik } from "formik"
import { useParams } from "next/navigation"
import closeicon from "../../../../../public/icons8-close-50.png"
import { fetchAPI } from "@/app/feth-api"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Drawer from "@/app/Componenets/drawer"
const EditLabel=()=>{

const router=useRouter()
const [open,setOpen]=useState(true)
const [data,setData]=useState<{labels:[{name:string}]}>()
  
   const {label}=useParams();
   
    async function getlabel(){
         
        const path=`labelbyid/${label}`
        const option={
            method:"GET"
        }
        const data= await fetchAPI(path,option)
        if(data){
            setData(data.data)
            console.log(data.data,"editlabel")
        }
    }
   
   const initialInput={
     name:data?.labels[0].name
   }
   const formik=useFormik({
      initialValues:initialInput,
      onSubmit
   })
   async function onSubmit(values:any){
     const path=`updatelabel/${label}`
     const option={
        method:"PUT",
        body: JSON.stringify({ ...values }),
     }
     const data=await fetchAPI(path,option)
     if(data){
        alert(data.message)
        router.push('/home/contact/list')
        
     }
   }
useEffect(()=>{
    getlabel()
},[])

useEffect(()=>{
    formik.setFieldValue("name",data?.labels[0]?.name)
},[data])

    return(
        <div>
            <Drawer/>
            <MyModal open={open} close={() => setOpen(false)}>
        <div className="fixed inset-5 mt-20 w-1/3  flex flex-col justify-center items-center  max-h-[280px] rounded mx-auto bg-white ">
        <div className="flex justify-end  mr-4  px-2 w-full ">
            <button onClick={()=>setOpen(false)} className="p-2 cursor-pointer " ><Image src={closeicon} className="w-6 h-6" alt="CLOSE"/></button>
          </div>
    <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col justify-center  items-center mx-auto">
      <div
          className="mb-5 w-1/2

"
        >
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Label Name
          </label>
          <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
            type="text"
            id="name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
 block w-full p-2.5"
            placeholder="John"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
         Save
        </button>
    </form>
  </div>
</MyModal>
        </div>
    )

}
export default EditLabel
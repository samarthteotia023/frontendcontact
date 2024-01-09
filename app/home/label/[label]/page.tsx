
"use client"
import { useState,useEffect } from "react";
import { fetchAPI } from "@/app/feth-api";
import deleteicon from "../../../../public/icons8-delete-30.png"
import edit from '../../../../public/icons8-edit-50.png';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import Drawer from "@/app/Componenets/drawer";

const Label=()=>{
   
    const {label}=useParams()
    console.log(label,"dfjoerhoguh5")
    const [data,setData]=useState<[]>();

 
  
  async function getlabelcontact() {
  
 
    const path=`getlabelcontacts/${label}`
    const option={
      method: "GET"
    }
    const datas= await fetchAPI(path,option)
    console.log(datas,"label")
    setData(datas);
   

  }
  useEffect(()=>{

  getlabelcontact()
  },[label])
  console.log(data,"data")
  if(!data){
    return  <p>LOADING</p>
  }

    return(
<div>
<Drawer/>
{/* <div className="flex items-center justify-center w-full">
    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
</div>  */}


<div className="relative ml-[400px] overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                   Email
                </th>
                <th scope="col" className="px-6 py-3">
                   Mobile
                </th>
                
            </tr>
        </thead>
        <tbody>
            { data?.map((item:any,index:number)=>(
                <tr key={index} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {item.firstname} {item.lastname}
                </th>
                <td className="px-6 py-4">
                    {item.email}
                </td>
                <td className="px-6 py-4">
                  {item.mobile}
                </td>
                
            </tr>
            ))}
            
         
        </tbody>
    </table>
</div>

</div>
    )
}
export default Label
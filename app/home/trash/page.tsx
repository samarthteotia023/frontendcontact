
"use client"
import { useState,useEffect } from "react";
import { fetchAPI } from "@/app/feth-api";
import Image from "next/image";
import restore from "../../../public/icons8-restore-50.png"
import deleteicon from "../../../public/icons8-delete-30.png"
import { useRouter } from "next/navigation";
import Drawer from "@/app/Componenets/drawer";
const Trash=()=>{
  const rounter=useRouter()
    const [data,setData]=useState([]);
    async function recover(id:any) {
        const path=`recovercontact/${id}`
        const option={
            method:"PUT"
        }
     const data=  await fetchAPI(path,option)
      alert(data)
       rounter.push('/home/contact/list')
    }
  async function getcontacts() {
 
 
    const path=`readtrash`
    const option={
      method: "GET"
    }
    const data= await fetchAPI(path,option)
    if(data){
    console.log(data,"dataaa")
    setData(data);
    localStorage.setItem("lengthtrash",JSON.stringify(data.length))
    }
  }
  async function deletecontact(id:any) {
    
 
    const path=`deletecontact/${id}`
    const option={
      method: "DELETE"
    }
    const data= await fetchAPI(path,option)
    if(data){
    alert(data)
    setData([])
    }
  
  }
  useEffect(()=>{
  getcontacts()
  },[])
  console.log(data,"data")

    return(
<div>

<Drawer/>
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
                <th scope="col" className="px-6 py-3">
                   Actions
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
                <td className="px-6 flex justify-start items-center py-4">
                  <div onClick={()=>recover(item?._id)} className="cursor-pointer">
                   <Image className="w-4 h-4" src={restore} alt="edit"/>
                   </div>
                   <div  onClick={()=>deletecontact(item?._id)} className="ml-4 cursor-pointer">
                    <Image className="h-5 w-5" src={deleteicon} alt="delete"/>
                   </div> 
                </td>
            </tr>
            ))}
            
         
        </tbody>
    </table>
</div>

</div>
    )
}
export default Trash
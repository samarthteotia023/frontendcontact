"use client";
import Image from "next/image";
import menuicon from "../../../public/icons8-menu-100.png";
import Link from "next/link";
import { useFormik } from "formik";
import * as yup from "yup";
import deleteicon from "../../../public/icons8-delete-30.png"
import edit from '../../../public/icons8-edit-50.png';
import plusicon from "../../../public/icons8-plus-78.png";
import closeicon from "../../../public/icons8-close-50.png"
import Contacticon from "../../../public/icons8-contact-96.png";
import trashicon from "../../../public/icons8-delete-94.png";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyModal from "../modal";
import { fetchAPI } from "@/app/feth-api";
import { revalidatePath } from "next/cache";



const Drawer = () => {
    const router=useRouter()
    const initialInput={
     name: ""
    }
 
    const formik = useFormik({
      initialValues: initialInput,
     
  
      onSubmit,
    });
    async function onSubmit(values: any) {
      const path=`createlabel`
      const option = {
        method: "POST",
      
  
        body: JSON.stringify({ ...values }),
      };
       const data=await fetchAPI(path,option);
       if(data){
        alert(data.message)
        setOpen(false)
       }
    }
    async function getalllabel() {
    
      const path=`getalllabels`
      const option = {
        method: "GET",
      };
      const data= await fetchAPI(path,option)
      setData(data?.data)
      console.log(data,"lll")
     
       
      
    }
    async function getme() {
      const path=`getme`
      const option={
        method:"GET"
      }
      const data=await fetchAPI(path,option)
      if(data){
        setName(data)
        console.log(data,"kkkk")
      }
      
    }
    async function deletelabel(value:any) {
    
      const path=`deletelabel/${value}`
      const option = {
        method: "DELETE",
      };
      const data= await fetchAPI(path,option)
     
      if(data){
        alert(data.message)
      }
     
    
      
    }
  
    // const currentUrl = globalThis?.window?.location?.href;
    // const parmsFromUrl = new URLSearchParams(currentUrl);
    // const paramToCheck = parmsFromUrl.keys().next().value;
    // const param:any= new URL(paramToCheck).pathname.match(/[^\/]+/g);
  const [url, setUrl] = useState("");
  const [contact,setContact]=useState(0)
  const [trash,setTrash]=useState(0)
  const [open,setOpen]=useState(false)
  const [name,setName]=useState("")
  const [data,setData]=useState<{labels:[]}>()

  useEffect(()=>{
    getalllabel()
    getme()
    // setUrl(param[1])
   const contact:any= localStorage.getItem("lengthcontact")
    setContact(JSON.parse(contact))
    const trash:any= localStorage.getItem("lengthtrash")
    setTrash(JSON.parse(trash))
   


  },[])
 

  

  const tabs = [
    { name: "Contacts", link: "/home/contact/list", image: Contacticon ,url:"contact",contact:contact},
    {
      name: "Trash",
      link: "/home/trash",
      image: trashicon,
      url:"trash",
      contact:trash
    },
  ];

     const logout=()=>{
        localStorage.clear();
        setName("")
        router.push('/login')
     }
     
  return (
    <>
      <div  >
      
        <div
          className={`
           "flex" 
          fixed ml-0 mt-0 h-screen border-r flex-col pt-3 justify-start items-start  w-[400px]    `}
        >
          <div className="flex justify-between w-full items-center">
           
            <div className="flex justify-between ml-4 items-center">
              <Image className="w-10 h-10" src={Contacticon} alt="contact" />
              <h3 className="text-xl text-gray-800">{name}</h3>
            </div>
            <button className="border p-1 mr-4" onClick={logout} >Logout</button>
          </div>
          <Link href={"/home/contact/add"}>
            <button className="bg-white ml-4 text-gray-700 mt-6 flex justify-center items-center border p-3 rounded-full ">
              <Image src={plusicon} className="w-8  h-8" alt="plusicon" />{" "}
              Create Contact
            </button>
          </Link>

          <div className="mt-8 flex flex-col w-full  space-y-4">
            {tabs.map((item: any, index: number) => (
              <Link key={index}  href={item.link}>
                <div
                  className={`flex justify-between py-3 px-5 ${url==item.url?"bg-blue-50":''}  shadow-md items-center`}
                  key={index}
                >
                    <div className="flex justify-start items-center">
                  <Image className="w-8 h-8" src={item.image} alt="icon" />
                  <h4 className="text-gray-700 ml-7 text-lg">{item.name}</h4>
                  </div>
                  <p>{item.contact}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 px-4 flex w-full justify-between items-center">
            <h4 className="text-gray-700"> Labels</h4>
            <Image onClick={()=>setOpen(true)} className="w-5 h-5" src={plusicon} alt="plus" />
          </div>
          <div className=" items-center mt-6">
       {data?.labels?.map((item:any,index:number)=>(
       <Link key={index} href={`/home/label/${item._id}`}> <div className="text-lg flex justify-between items-center mt-4 p-4 bg-blue-50 ">
          <h3>{item.name}</h3>
          <div className="flex w-20 justify-between items-center">
        <Link href={`/home/label/${item._id}/edit`}>
                   <Image  className="w-4 h-4" src={edit} alt="edit"/>
                   </Link>
                   <div  onClick={()=>deletelabel(item?._id)} className="ml-4 cursor-pointer">
                    <Image className="h-5 w-5" src={deleteicon} alt="delete"/>
                   </div>
                   </div>
        </div>
        </Link>
       ))}
          </div>

        </div>
        <MyModal open={open} close={() => setOpen(false)}>
        <div className="fixed inset-5 mt-20 w-1/3  flex flex-col justify-center items-center  max-h-[280px] rounded mx-auto bg-white ">
        <div className="flex justify-end   px-2 mr-4 w-full ">
            <button onClick={()=>setOpen(false)} className="p-2 cursor-pointer " ><Image src={closeicon} className="w-6" alt="close"/></button>
          </div>
    <form  onSubmit={formik.handleSubmit} className="w-full flex flex-col justify-center  items-center mx-auto">
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
    </>
  );
};
export default Drawer;

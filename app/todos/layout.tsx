"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";




const AddPopup = ({handleAddTodo, setShowAddPopup }: {handleAddTodo: (todosText:string) => void, setShowAddPopup: (show: boolean) => void }) =>{

    
    const [todosText, setTodosText] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        handleAddTodo(todosText); 
        setTodosText("");
    }
    const handleReset = () =>{
        setShowAddPopup(false);
        setTodosText("");
    }
    return <form onSubmit={handleSubmit} onReset={handleReset} className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-[#00000066] p-4 rounded-lg shadow-lg">
       <div className="w-1/3 bg-white p-4 rounded-md">
         <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
        <input type="text" placeholder="Todo Title" value={todosText} onChange={(e)=> setTodosText(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
        <div className="flex justify-end gap-2">
            <button type="reset" className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded" onClick={()=> setShowAddPopup(false)}>Cancel</button>
            <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">Add</button>
        </div>
       </div>
    </form>
}


export default function TodosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

const pathName = usePathname();
const pathArray = pathName.split("/")
const [showAddPopup, setShowAddPopup] = useState(false);
const router = useRouter();

const validation=({todosText}:{todosText:string}) =>{

    if(todosText === "")
    {
        toast.error("Please add Todos Label");
        return false
    }
    return true
}
const handleAddTodo = async(todosText:string) =>{
    
    if(!validation({todosText}))
        return;

    const payload={
        title:todosText
    }
    try{
        const res = await fetch("http://localhost:3000/api/todos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        const data=0
        console.log(res,data)
        const resData = await res.json();
        if(resData?.status)
        {
            toast.success(resData?.message || "Todo added successfully");
            setShowAddPopup(false)
            router.refresh();
        } else {
            toast.error(resData?.message || "Failed to add todo");
        }
    }catch(err)
    {
        console.error(err)
    }

}

const handleArchiveClick = () =>{
    router.push("/todos/archive")
}

  return<>
  <div>
    {children}
  </div>
  <div className="flex gap-4 items-center fixed bottom-8 right-8">

  <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
   type="button"
   onClick={()=>{
    setShowAddPopup(true)
    pathArray.at(pathArray.length-1) === "archive" && router.back()
}}
   title="Add Todo"
   >
    <p>Add Todo</p>
    <MdAddCircle size={20}/>
    
  </button>
  {pathArray.at(pathArray.length-1) !== "archive" ? 
  <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
   type="button"
   title="Archive Todos"
   onClick={()=>{handleArchiveClick()}}
   >
    <FaArchive size={20}/>
    
  </button>
  :
   <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
   type="button"
   title="Go Back"
   onClick={()=>{router.back()}}
   >
    <RiArrowGoBackFill size={20}/>
    
  </button>
  }
</div>
  {showAddPopup && <AddPopup handleAddTodo={handleAddTodo} setShowAddPopup={setShowAddPopup} />}
  <ToastContainer position="top-right" autoClose={3000} theme="colored" />

  </>
}
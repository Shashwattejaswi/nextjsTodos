"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";




const AddPopup = ({handleAddTodo, setShowAddPopup }: {handleAddTodo: (todosText:string) => void, setShowAddPopup: (show: boolean) => void }) =>{

    
    const [todosText, setTodosText] = useState<string>("");
    return <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-[#00000066] p-4 rounded-lg shadow-lg">
       <div className="w-1/3 bg-white p-4 rounded-md">
         <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
        <input type="text" placeholder="Todo Title" value={todosText} onChange={(e)=> setTodosText(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
        <div className="flex justify-end gap-2">
            <button type="reset" className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded" onClick={()=> setShowAddPopup(false)}>Cancel</button>
            <button type="submit" className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded" onClick={()=>{handleAddTodo(todosText); setTodosText("");}}>Add</button>
        </div>
       </div>
    </div>
}


export default function TodosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {


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

  return<>
  <div>
    {children}
  </div>
  <button className="flex items-center gap-2 fixed bottom-8 right-8 px-4 py-2 bg-blue-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
   type="button"
   onClick={()=>setShowAddPopup(true)}
   >
    <p>Add Todo</p>
    <MdAddCircle size={20}/>
    
  </button>
  {showAddPopup && <AddPopup handleAddTodo={handleAddTodo} setShowAddPopup={setShowAddPopup} />}
  <ToastContainer position="top-right" autoClose={3000} theme="colored" />

  </>
}
"use client"

import TodoChip from "../todoChip";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const ParentComponent = ({data}:{data:Todo[]}) =>{
    const router = useRouter();

 const handleEditTodos = async(todo: Todo,bodyForPass:any) =>{

    if(todo.completed === true){
        return;
    }

        try{
            const res = await fetch(`http://localhost:3000/api/todos/${todo.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(bodyForPass)
            });
            const data = await res.json();
            if(!res.ok){
                throw new Error(data.message || "Failed to update todo");
            }
            console.log(res,data)
            toast.success(data);
             router.refresh();
            todo.completed = !todo.completed; // Update the local state to reflect the change immediately
            return data;
                
        }catch(err)
        {
            console.error("Error updating todo:", err);
        }
    }

    return(

 <div className="">
            <h1 className="w-full text-center p-4 text-2xl font-bold">Todo List</h1>
            {/* Todo list content goes here */}
             
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((todo: Todo) => (
                    <TodoChip key={todo.id} todo={todo} handleEditTodos={handleEditTodos}/>
                ))}
            </div>
        </div>
    )
}

export default ParentComponent;
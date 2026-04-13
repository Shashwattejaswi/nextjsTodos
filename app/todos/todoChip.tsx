"use client"

import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import AddPopup from "../component/updateTodos";
import { title } from "process";


interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createTime?:Date;
    updateTime?:Date;
    deletedTime?:Date;
    
}

const TodoChip =({todo,handleEditTodos,section="todos"}: {todo: Todo, handleEditTodos?: (todo: Todo,bodyForPass:any) => void, section?: "todos" | "archive"}) =>{
    
    const formattedCreateTime = todo.createTime ? new Date(todo.createTime).toLocaleString() : null;
    const updatedTime = todo.updateTime ?? todo.deletedTime;
    const formattedUpdateTime = (updatedTime) ? new Date((updatedTime)).toLocaleString() : null;
    const [UpdateTodosPopUp,setUpdateTodosPopUp]= useState<boolean>();

    // const handleUpdateTodo = async()=>{

    //     const res = await fetch(`http://localhost:3000/api/todos/${todo.id}`)
    // }

    const handleUpdateTodo =async(todoText:string)=>{

        if(handleEditTodos)
        {
            const responseAfterUpdating=await handleEditTodos(todo,{title:todoText})
            console.log(responseAfterUpdating)
            if(responseAfterUpdating?.status)
            {
                setUpdateTodosPopUp(false)
            }

        }
    }
   
    return (
        
        <div className={`p-4 flex flex-col gap-1 ${section === "todos" ? `${todo.completed?"bg-gray-100":"bg-gray-50"}` : "bg-red-100"} rounded-lg shadow-md`}>
 
        <div className="flex w-full items-center justify-between ">
            <span className={`flex gap-2 items-center ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
                {todo.title}
                {!todo.completed && <BiEdit size={15} className="cursor-pointer" onClick={()=> setUpdateTodosPopUp(true)}/>}

            </span>
            {section === "todos" && handleEditTodos && (
                <input type="checkbox" checked={todo.completed} disabled={todo.completed} onChange={()=>handleEditTodos(todo,{completed:true})} className="ml-4"/>
            )}
        </div>
        <div className="flex justify-between items-center">
        <p className={`text-xs text-gray-400`}>{formattedCreateTime}{(formattedUpdateTime && (formattedCreateTime !== formattedUpdateTime)) && `- ${formattedUpdateTime}`}</p>
        </div>
            {UpdateTodosPopUp && <AddPopup handleUpdateTodo={handleUpdateTodo} setShowAddPopup={setUpdateTodosPopUp} updateBeforeTodos={todo}/>}
        </div>
    )
}
export default TodoChip;
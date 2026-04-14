"use client";

import { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import AddPopup from "../component/updateTodos";
import { title } from "process";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createTime?: Date;
  updateTime?: Date;
  deletedTime?: Date;
}

const EditDeletePopUpList = ({open=false,setUpdateTodosPopUp}:{open:boolean,setUpdateTodosPopUp:React.Dispatch<React.SetStateAction<boolean | null>>}) =>{

  if(!open)
    return 
  return (
    <ul className="absolute shadow-xl z-10 top-[70%] right-[2%] flex flex-col gap-1 rounded-lg p-1 bg-gray-600">
      {[
        {icon:<BiEdit 
        size={20} 
        title="edit Todos"
        />,
          onClick:()=>{
            console.log("okk");
            setUpdateTodosPopUp(true)
          }
      }
        ,
         {icon:<MdDeleteForever 
        size={20} 
        title="edit Todos"
        />,
          onClick:()=>{
            // console.log("okk");
            // setUpdateTodosPopUp(true)
          }
      }
].map((each,index)=>(
        <li key={index} onClick={each.onClick} className=" p-1 text-center text-white hover:bg-gray-400 rounded-md cursor-pointer">{each.icon}</li>
      ))}
    </ul>
  )
}

const TodoChip = ({
  todo,
  handleEditTodos,
  section = "todos",
}: {
  todo: Todo;
  handleEditTodos?: (todo: Todo, bodyForPass: any) => void;
  section?: "todos" | "archive";
}) => {
  const formattedCreateTime = todo.createTime
    ? new Date(todo.createTime).toLocaleString()
    : null;
  const updatedTime = todo.updateTime ?? todo.deletedTime;
  const formattedUpdateTime = updatedTime
    ? new Date(updatedTime).toLocaleString()
    : null;
  const [UpdateTodosPopUp, setUpdateTodosPopUp] = useState<boolean | null>(null);
  const [threeDotOpen,setThreeDotOpen] = useState<boolean>(false)

  const handleUpdateTodo = async (todoText: string) => {
    if (handleEditTodos) {
      const responseAfterUpdating:any = await handleEditTodos(todo, {
        title: todoText,
      });
      console.log(responseAfterUpdating);
      if (responseAfterUpdating?.status) {
        setUpdateTodosPopUp(false);
      }
    }
  };

  useEffect(()=>{
    console.log(UpdateTodosPopUp)
  },[UpdateTodosPopUp])

  const handleOnBlurOnThreeDot = ()=>{
    setTimeout(()=>{
      setThreeDotOpen(false)
    },300)
  
  }
  return (
    <div
      className={`relative py-4 pl-4 pr-2 flex gap-1 ${section === "todos" ? `${todo.completed ? "bg-gray-100" : "bg-gray-50"}` : "bg-red-100"} rounded-lg shadow-md`}
    >
      <div className="flex flex-col w-full items-start justify-between ">
        <span
          className={`flex gap-2 items-center ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
        >
          {todo.title}
          {/* {!todo.completed && (
            <BiEdit
            size={15}
            className="cursor-pointer"
            onClick={() => setUpdateTodosPopUp(true)}
            />
            )} */}
        </span>
            <p className={`text-xs text-gray-400`}>
           {formattedCreateTime}
           {formattedUpdateTime &&
             formattedCreateTime !== formattedUpdateTime &&
             `- ${formattedUpdateTime}`}
         </p>
       
      </div>
      <div className="flex justify-between gap-1 items-center">
        {section === "todos" && handleEditTodos && (
          <input
            type="checkbox"
            checked={todo.completed}
            disabled={todo.completed}
            onChange={() => handleEditTodos(todo, { completed: true })}
            className="ml-4 h-4 w-4 rounded-md cursor-pointer"
            
          />
        )}
        {section === "todos" && <button className="cursor-pointer p-1.5 rounded-full hover:bg-gray-200 focus:bg-gray-200" onFocus={()=> setThreeDotOpen(true)} onBlur={handleOnBlurOnThreeDot}>

        <BsThreeDotsVertical/>
        </button>}
      </div>
      {UpdateTodosPopUp && (
        <AddPopup
          handleUpdateTodo={handleUpdateTodo}
          setShowAddPopup={setUpdateTodosPopUp}
          updateBeforeTodos={todo}
        />
      )}
      <EditDeletePopUpList open={threeDotOpen} setUpdateTodosPopUp={setUpdateTodosPopUp}/>
    </div>
  );
};
export default TodoChip;

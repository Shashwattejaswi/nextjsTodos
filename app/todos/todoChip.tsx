"use client"


interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createTime?:Date;
    updateTime?:Date;
}

const TodoChip =({todo,handleEditTodos}: {todo: Todo, handleEditTodos: (todo: Todo) => void}) =>{
    
    const formattedCreateTime = todo.createTime ? new Date(todo.createTime).toLocaleString() : null;
    const formattedUpdateTime = todo.updateTime ? new Date(todo.updateTime).toLocaleString() : null;
   
    return (
        
        <div className="p-4 flex flex-col gap-1 bg-gray-50 rounded-lg shadow-md">
 
        <div className="flex w-full items-center justify-between ">
            <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
                {todo.title}
            </span>
            <input type="checkbox" checked={todo.completed} disabled={todo.completed} onChange={()=>handleEditTodos(todo)} className="ml-4"/>
        </div>
        <p className="text-xs text-gray-400">{formattedCreateTime}{(formattedUpdateTime && (formattedCreateTime !== formattedUpdateTime)) && `- ${formattedUpdateTime}`}</p>

        </div>
    )
}
export default TodoChip;

"use server"

import TodoChip from "./todoChip";

const Page = async() => {

    try{
        const res = await fetch("http://localhost:3000/api/todos",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.message || "Failed to fetch todos");
        }
          return (
        <div className="">
            <h1 className="w-full text-center p-4 text-2xl font-bold">Todo List</h1>
            {/* Todo list content goes here */}
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data.map((todo: { id: number; title: string; completed: boolean }) => (
                    <TodoChip key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    )
    }catch(err){
        console.error("Error fetching todos:", err);
        return (
            <div className="w-full p-4">
                <h1 className="text-center text-red-500">Failed to load todos</h1>
                <p className="text-center text-gray-500">{err instanceof Error ? err.message : "An unknown error occurred"}</p>
            </div>
        )
    }
  

}

export default Page;
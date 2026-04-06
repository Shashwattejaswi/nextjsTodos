
"use server"

import ParentComponent from "./Component/parent";
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
           <ParentComponent data={data.data} />
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
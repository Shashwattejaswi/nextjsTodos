import TodoChip from "../todoChip";

const ArchivePage = async() => {

    try{
        const res = await fetch("http://localhost:3000/api/todos/archive",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const { data ,message} = await res.json();
        console.log("Archived todos:",data)
        return(
             <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.map((todo: any) => (
                    <TodoChip key={todo.id} todo={todo} section="archive"/>
                ))}
            </div>
        )
    } catch (error) {
        console.error("Error fetching archived todos:", error)
    }

    return (
        <div>
            
        </div>
    );
};

export default ArchivePage;

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoChip =({todo}: {todo: Todo}) =>{

    return (
        <div className="p-4 flex w-full items-center justify-between bg-gray-100 rounded-lg">
            <span className={todo.completed ? "line-through text-gray-500" : "text-gray-800"}>
                {todo.title}
            </span>
            <input type="checkbox" checked={todo.completed} readOnly className="ml-4" />
        </div>
    )
}
export default TodoChip;
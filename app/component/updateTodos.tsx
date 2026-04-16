"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

const AddPopup = ({
  handleUpdateTodo,
  setShowAddPopup,
  updateBeforeTodos,
}: {
  handleUpdateTodo: (todosText: string) => void;
  setShowAddPopup: (show: boolean) => void;
  updateBeforeTodos?: any;
}) => {
  const [todosText, setTodosText] = useState<string>("");

  useEffect(() => {
    if (updateBeforeTodos) setTodosText(updateBeforeTodos.title);
  }, [updateBeforeTodos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUpdateTodo(todosText);
    setTodosText("");
  };
  const handleReset = () => {
    setShowAddPopup(false);
    setTodosText("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="flex items-center justify-center fixed top-0 left-0 z-15 w-full h-full bg-[#00000066] p-4 rounded-lg shadow-lg"
    >
      
      <div className="w-1/3 bg-white p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">
          {updateBeforeTodos ? "Update " : "Add New "} Todos
        </h2>
        <input
          type="text"
          placeholder="Todo Title"
          value={todosText}
          onChange={(e) => setTodosText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button
            type="reset"
            className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded"
            onClick={() => setShowAddPopup(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded"
          >
            {updateBeforeTodos ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPopup;

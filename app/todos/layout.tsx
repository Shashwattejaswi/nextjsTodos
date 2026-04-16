"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaArchive } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import AddPopup from "../component/updateTodos";
import Loader from "../component/Loader";

export default function TodosLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();
  const pathArray = pathName.split("/");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const router = useRouter();
  const [loading,setLoading] = useState(false);

  const validation = ({ todosText }: { todosText: string }) => {
    if (todosText === "") {
      toast.error("Please add Todos Label");
      return false;
    }
    return true;
  };
  const handleAddTodo = async (todosText: string) => {
    if (!validation({ todosText })) return;

    const payload = {
      title: todosText,
    };
    try {
      setLoading(true)
      const res = await fetch("http://localhost:3000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = 0;
      console.log(res, data);
      const resData = await res.json();
      if (resData?.status) {
        toast.success(resData?.message || "Todo added successfully");
        setShowAddPopup(false);
        router.refresh();
      } else {
        toast.error(resData?.message || "Failed to add todo");
      }
    } catch (err) {
      console.error(err);
    }
    finally{
      setLoading(false)
    }
  };

  const handleArchiveClick = () => {
    router.push("/todos/archive");
  };

  return (
    <>
     <Loader loading={loading}/>
      <div>{children}</div>
      <div className="flex gap-4 items-center fixed bottom-8 right-8">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
          type="button"
          onClick={() => {
            setShowAddPopup(true);
            pathArray.at(pathArray.length - 1) === "archive" && router.back();
          }}
          title="Add Todo"
        >
          <p>Add Todo</p>
          <MdAddCircle size={20} />
        </button>
        {pathArray.at(pathArray.length - 1) !== "archive" ? (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
            type="button"
            title="Archive Todos"
            onClick={() => {
              handleArchiveClick();
            }}
          >
            <FaArchive size={20} />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white text-md rounded-lg shadow-lg cursor-pointer"
            type="button"
            title="Go Back"
            onClick={() => {
              router.back();
            }}
          >
            <RiArrowGoBackFill size={20} />
          </button>
        )}
      </div>
      {showAddPopup && (
        <AddPopup
          handleUpdateTodo={handleAddTodo}
          setShowAddPopup={setShowAddPopup}
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </>
  );
}

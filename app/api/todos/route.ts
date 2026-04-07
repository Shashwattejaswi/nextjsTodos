import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import {todos} from "./testData.json"

interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createTime?:Date;
    updateTime?:Date;
}
export async function GET(nextRequest:Request)
{
    // console.log(nextRequest.url);
    
    // return new Response(JSON.stringify({message:"ok nothing happening",type:"lets go...."}),{
    //     status:201,
    //     statusText:"ban gya bhaii",
    //     headers:{
    //         "Content-Type":"image/png"
    //     }
    // });
    
    return Response.json({message:"OK",data:[...todos]})
}

export async function POST(nextRequest:Request)
{
    const body = await nextRequest.json();
    console.log("Request body:", body);

    if(!body?.title)
    {
        return new Response(JSON.stringify({status:false,message:"Title is required"}),{status:400,headers:{"Content-Type":"application/json"}})
    }
    console.log(process.cwd())
    try{
        const exisitingData = await readFile(`${process.cwd()}/app/api/todos/testData.json`, "utf-8");
        const parsedData = JSON.parse(exisitingData);
        const newTodos: Todo = {
            id:crypto.randomUUID(), // Generate a unique ID for the new todo
            title:body.title,
            completed:false,
            createTime:new Date(),
            updateTime:new Date()

        }
        const updatedParsedData = {...parsedData,todos:[...parsedData.todos,newTodos]}
        try{
            await writeFile("app/api/todos/testData.json",JSON.stringify(updatedParsedData,null,2),"utf-8")

        }catch(err)
        {
            console.error("Error writing data:", err);
            return new Response(JSON.stringify({status:false,message:"Internal Server Error"}),{status:500,headers:{"Content-Type":"application/json"}})
        }

    }catch(err)
    {
        console.error("Error reading existing data:", err);
        return new Response(JSON.stringify({status:false,message:"Internal Server Error"}),{status:500,headers:{"Content-Type":"application/json"}})
    }

    return new Response(JSON.stringify({status:true,message:"Created"}),{status:201,headers:{"Content-Type":"application/json"}})

}


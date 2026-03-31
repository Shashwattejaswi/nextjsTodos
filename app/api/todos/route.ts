import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import {todos} from "./testData.json"
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
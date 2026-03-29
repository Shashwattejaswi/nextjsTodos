import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import {todos} from "../testData.json"

export async function GET(nextRequest:Request) {

    const parsedUrl = parseUrl(nextRequest.url);
    const routeParams = parsedUrl.pathname.split("/").filter(Boolean);
    console.log(routeParams.at(-1));

    const todoId = parseInt(routeParams.at(-1) || "0", 10);
    const todoObj = todos.find((each)=> each.id === todoId);

    return new Response(JSON.stringify({message:"ok nothing happening",data:todoObj ?? null}),{
        status:200,
        headers:{
            "content-type":"application/json"
        }
    });
}
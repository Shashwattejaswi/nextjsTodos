import {todos} from "../testData.json"

export async function GET(request: Request, { params }: { params: { eachtodos: string } }) {

    const {eachtodos} = await params;
   
    console.log("eachtodos",eachtodos)
    const todoId = parseInt(eachtodos, 10);
    const todoObj = todos.find((each)=> each.id === todoId);

    return Response.json(todoObj ?? null);
}
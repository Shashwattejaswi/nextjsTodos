import { readFile, writeFile } from "fs/promises";
import { todos } from "../testData.json";

export async function GET(
  request: Request,
  { params }: { params: { eachtodos: string } },
) {
  const { eachtodos } = await params;

  console.log("eachtodos", eachtodos);

  const todoObj = todos.find((each) => each.id === eachtodos);

  return Response.json(todoObj ?? null);
}

export async function PUT(
  request: Request,
  { params }: { params: { eachtodos: string } },
) {
  const { eachtodos } = await params;
  const body = await request.json();
  console.log("eachtodos", eachtodos, body);

  try {
    const readJSONTodos = await readFile(
      `${process.cwd()}/app/api/todos/testData.json`,
      "utf-8",
    );

    const parseJson = JSON.parse(readJSONTodos);
    console.log(parseJson.todos);
    const updatedTodos = parseJson.todos?.map((each: any, index: number) =>
      each.id === eachtodos
        ? { ...each, ...body, updateTime: new Date() }
        : each,
    );
    const updatedJson = { ...parseJson, todos: updatedTodos };
    console.log(updatedJson);

    try {
      const writeJSONFiles = await writeFile(
        `${process.cwd()}/app/api/todos/testData.json`,
        JSON.stringify(updatedJson, null, 2),
        "utf-8",
      );
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ status: false, message: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ status: false, message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return Response.json({ status: true, message: "Todo updated successfully" });
}

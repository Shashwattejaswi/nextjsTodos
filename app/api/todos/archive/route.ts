import { readFile } from "fs/promises";
import zlib from "zlib";

export async function GET(request: Request) {
  try {
    const readDeletedTodos = await readFile(
      `${process.cwd()}/app/api/todos/deletedTodos.json`,
      "utf-8",
    );
    const { todos } = JSON.parse(readDeletedTodos);
    if (todos.length > 0) {
      const unCompressedTodos = todos.map((each: any) => {
        const { updateTime, ...rest } = JSON.parse(
          zlib
            .gunzipSync(Buffer.from(each.compressedTodo, "base64"))
            .toString(),
        );
        return { id: each.id, ...rest, deletedTime: each.deletedStamp };
      });
      console.log("unCompressedTodos:", unCompressedTodos);
      return Response.json({ message: "OK", data: unCompressedTodos });
    }
    console.log("recycled todos:", todos);
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({ status: false, message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

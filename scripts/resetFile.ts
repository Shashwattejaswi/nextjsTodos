import { writeFileSync } from "node:fs";


const fileToReset = ["deletedTodos.json","testData.json"];

for(const eachFileName of fileToReset) {

    try{

       writeFileSync(`${process.cwd()}/app/api/todos/${eachFileName}`,JSON.stringify({todos:[]}),"utf-8")
    }catch(err)
    {
        const error = err instanceof Error ? err.message : "failed to write default data"
        console.log(error);
    }
}
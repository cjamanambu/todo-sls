import { handlerPath } from "@libs/handler-resolver";

export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handlers.getAllTodos`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/",
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/handlers.createTodo`,
  events: [
    {
      http: {
        method: "post",
        path: "todo/",
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/handlers.updateTodo`,
  events: [
    {
      http: {
        method: "put",
        path: "todo/{id}",
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handlers.deleteTodo`,
  events: [
    {
      http: {
        method: "delete",
        path: "todo/{id}",
      },
    },
  ],
};

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { v4 } from "uuid";
import todoService from "@database/services";
import Todo from "@models/Todo";
import Helpers from "@functions/todo/helpers";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  try {
    const todos = await todoService.getAllTodos();
    const sortedTodos = (await Helpers.getChronologicalTodos(todos)) as Record<
      string,
      any
    >;
    return formatJSONResponse(200, sortedTodos);
  } catch (err) {
    return formatJSONResponse(400, err.message);
  }
});

export const createTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = v4();
      const { label } = event.body as any;
      if (!label || typeof label === "undefined") {
        let message = "The todo label is required to create a todo";
        return formatJSONResponse(400, { message });
      }
      const todo = (await todoService.createTodo({
        id,
        label,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })) as Record<string, any>;
      return formatJSONResponse(201, todo);
    } catch (err) {
      return formatJSONResponse(400, err.message);
    }
  }
);

export const updateTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.pathParameters.id;
      let partialTodo: Partial<Todo> = event.body as any;
      const todo = await todoService.updateTodo(id, partialTodo);
      return formatJSONResponse(200, { todo });
    } catch (err) {
      let message;
      if (err.code === "ConditionalCheckFailedException") {
        message = `There is no todo with id ${event.pathParameters.id}`;
      } else {
        message = err.message;
      }
      return formatJSONResponse(400, message);
    }
  }
);

export const deleteTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.pathParameters.id;
      const todo = await todoService.deleteTodo(id);
      return formatJSONResponse(200, { todo });
    } catch (err) {
      return formatJSONResponse(400, err.message);
    }
  }
);

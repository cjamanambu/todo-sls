import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "@models/Todo";

export default class TodoService {
  constructor(
    private readonly documentClient: DocumentClient,
    private readonly tableName: string
  ) {}

  // fetch all todos and return as promise of all todo items in db
  async getAllTodos(): Promise<Todo[]> {
    const result = await this.documentClient
      .scan({
        TableName: this.tableName,
      })
      .promise();
    return result.Items as Todo[];
  }

  // take in a todo object and add as a todo item to the db
  async createTodo(todo: Todo): Promise<Todo> {
    await this.documentClient
      .put({
        TableName: this.tableName,
        Item: todo,
      })
      .promise();
    return todo as Todo;
  }

  // take a todo id and update the item's label & completed status in the db
  // @ts-ignore
  async updateTodo(id: string, partialTodo: Partial<Todo>): Promise<Todo> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: "set ",
      ConditionExpression: "attribute_exists(id)",
      // ExpressionAttributeNames: {
      //   "#label": "label",
      // },
      ExpressionAttributeValues: {},
      ReturnValues: "ALL_NEW",
    };
    if (partialTodo.label && typeof partialTodo.label !== "undefined") {
      params.UpdateExpression = `${params.UpdateExpression}label = :label, `;
      params.ExpressionAttributeValues[":label"] = partialTodo.label;
    }
    if (typeof partialTodo.completed !== "undefined") {
      params.UpdateExpression = `${params.UpdateExpression}completed = :completed, `;
      params.ExpressionAttributeValues[":completed"] = partialTodo.completed;
    }
    if (partialTodo.label || typeof partialTodo.completed !== "undefined") {
      params.UpdateExpression = `${params.UpdateExpression}updatedAt = :updatedAt`;
      params.ExpressionAttributeValues[":updatedAt"] = new Date().toISOString();
    }
    const updated = await this.documentClient.update(params).promise();
    return updated.Attributes as Todo;
  }

  // take a todo id and delete the item from the db
  async deleteTodo(id: string): Promise<any> {
    return await this.documentClient
      .delete({
        TableName: this.tableName,
        Key: { id },
      })
      .promise();
  }
}

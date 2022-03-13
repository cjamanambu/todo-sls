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
    await this.documentClient.put({
      TableName: this.tableName,
      Item: todo,
    }).promise;
    return todo as Todo;
  }

  // take a todo id and update the item's label & completed status in the db
  async updateTodo(id: string, partialTodo: Partial<Todo>): Promise<Todo> {
    const updated = await this.documentClient
      .update({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression:
          "set #label = :label, completed = :completed, updatedAt = :updatedAt",
        ExpressionAttributeNames: {
          "#label": "label",
        },
        ExpressionAttributeValues: {
          ":label": partialTodo.label,
          ":completed": partialTodo.completed,
          ":updatedAt": partialTodo.updatedAt,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
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

import dynamoDBClient from "@database/db";
import TodoService from "@database/services/todo.service";

const TABLE_NAME = "TodosTable";

const todoService = new TodoService(dynamoDBClient(), TABLE_NAME);

export default todoService;

import Todo from "@models/Todo";

export default class Helpers {
  static async getChronologicalTodos(todos: Todo[]): Promise<Todo[]> {
    return todos.sort((todoA, todoB) => {
      const a =
        todoA.createdAt >= todoA.updatedAt ? todoA.createdAt : todoA.updatedAt;
      const b =
        todoB.createdAt >= todoB.updatedAt ? todoB.createdAt : todoB.updatedAt;
      // @ts-ignore
      return new Date(b) - new Date(a);
    });
  }
}

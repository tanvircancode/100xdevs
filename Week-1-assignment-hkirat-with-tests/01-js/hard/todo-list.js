/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
  - `npm run test-todo-list`
*/

class Todo {
  constructor() {
    this.todoArray = [];
 }
   add(todo) {
     this.todoArray.push(todo);
   }
    remove(indexOfTodo) {
       this.todoArray.splice(indexOfTodo,1);
   }
    update(index, updatedTodo) {
      if(index > this.todoArray.length - 1) {
        return this.todoArray;
      }
     this.todoArray[index] = updatedTodo;
   }
    getAll() {
      return this.todoArray;
    }
   get(indexOfTodo) {
    if(indexOfTodo > this.todoArray.length - 1) {
      return null;
    }
     return this.todoArray[indexOfTodo];
   }
    clear() {
      this.todoArray = [];
    }
}

module.exports = Todo;
var todoList = new Todo();
todoList.add('sleep');

console.log(todoList.getAll())
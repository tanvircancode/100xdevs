import express from "express";
import { authenticateJwt, SECRET } from "../middleware/index";
import { Todo } from "../db";
import {z} from "zod";
const router = express.Router();

// interface CreateTodoInput {
//   title: string;
//   description: string;
// }
// type UserType = CreateTodoInput; 

const todosInput = z.object({
  title : z.string().min(2).max(25),
  description : z.string().min(2).max(25),
})

router.post("/todos", authenticateJwt, (req, res) => {
  
  const userId = req.headers["userId"];

  const parsedInput = todosInput.safeParse(req.body);
  if(!parsedInput.success) {
    res.status(411).json({
      message: parsedInput.error,
    })
    return;
  }


  // const { title, description } = req.body;
  // const inputs:UserType = req.body;

  const title = parsedInput.data.title;
  const description = parsedInput.data.description;

  const done = false;

  const newTodo = new Todo({ title , description , done, userId });

  newTodo
    .save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create a new todo" });
    });
});

router.get("/todos", authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to retrieve todos" });
    });
});

router.patch("/todos/:todoId/done", authenticateJwt, (req, res) => {
  const userId = req.headers["userId"];
  const { todoId } = req.params;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

export default router;

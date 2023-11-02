import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import  {Todo}  from "../db";
const  router = express.Router();
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  headers: {
    userId: string; // Define the type for userId based on your data model
  };
}

router.post('/todos', authenticateJwt, (req : CustomRequest, res: Response) => {
  const userId1 = req.headers.userId;
  const { title, description } = req.body;
  const done = false;
  const userId = userId1;

  const newTodo = new Todo({ title, description, done, userId });

  newTodo.save()
    .then((savedTodo) => {
      res.status(201).json(savedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to create a new todo' });
    });
});


router.get('/todos', authenticateJwt, (req: CustomRequest, res: Response) => {
  const userId1 = req.headers.userId;
  const userId = userId1;

  Todo.find({ userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    });
});

router.patch('/todos/:todoId/done', authenticateJwt, (req: CustomRequest, res : Response) => {
  const userId1 = req.headers.userId;
  const { todoId } = req.params;
  const userId = userId1;

  Todo.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
    .then((updatedTodo) => {
      if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(updatedTodo);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to update todo' });
    });
});

export default router;
import { useState, useEffect } from 'react';
import { authState } from '../store/authState.ts';
import { useRecoilValue } from "recoil";

// interface Todo {
//     _id: string,
//     title: string;
//     description: string;
//     done: boolean;
// }

// type TodoArray =Todo;

function useTodos() {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3000/todo/todos', {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            // Todo: Create a type for the response that you get back from the server
            const data = await response.json();
            setTodos(data);
            setLoading(false)
        };
        getTodos();
    }, [todos]);

    return {
        loading,
        todos,
        
    }
}

const TodoList = () => {
    // const [todos, setTodos] = useState<TodoArray[]>([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const authStateValue = useRecoilValue(authState);
     // @ts-ignore
    const {loading , todos }  = useTodos();
    

    const addTodo = async () => {
        const response = await fetch('http://localhost:3000/todo/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ title, description })
        });
        const data = await response.json();

        let newTodos = [] ;
        for(var i=0;i<todos.length;i++) { 
            newTodos.push(todos[i]);
        }

        newTodos.push(data);

        // @ts-ignore
        setTodos(newTodos);
    };

    const markDone = async (id) => {
        const response = await fetch(`http://localhost:3000/todo/todos/${id}/done`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const updatedTodo = await response.json();
         // @ts-ignore
        setTodos(todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo)));
    };

    return (
        <div>
            <div style={{ display: "flex" }}>
                <h2>Welcome {authStateValue.username}</h2>
                <div style={{ marginTop: 25, marginLeft: 20 }}>
                    <button onClick={() => {
                        localStorage.removeItem("token");
                          // @ts-ignore
                        window.location = "/login";
                    }}>Logout</button>
                </div>
            </div>
            <h2>Todo List</h2>
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <button onClick={addTodo}>Add Todo</button>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <button onClick={() => markDone(todo._id)}>{todo.done ? 'Done' : 'Mark as Done'}</button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;

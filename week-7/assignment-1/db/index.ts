import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
});

const todoSchema = new Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});

export const User = model('User', userSchema);
export const Todo = model('Todo', todoSchema);
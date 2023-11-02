"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    password: String,
});
const todoSchema = new mongoose_1.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Todo = (0, mongoose_1.model)('Todo', todoSchema);

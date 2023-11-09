"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosInput = exports.signupInput = void 0;
const zod_1 = require("zod");
exports.signupInput = zod_1.z.object({
    username: zod_1.z.string().min(3).max(20),
    password: zod_1.z.string().min(2).max(20),
});
exports.todosInput = zod_1.z.object({
    title: zod_1.z.string().min(3).max(20),
    description: zod_1.z.string().min(2).max(30),
});

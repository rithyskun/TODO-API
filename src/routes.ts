import { Express } from "express";
import config from 'config'
import validateResource from "./middleware/validateResource";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema } from './schemas/todo.schema'
import { fetchAllTodo, createTodo, updateTodo, deleteTodo, queryTodo, findOneTodo } from './controllers/todo.controller'
const API_URL = config.get<string>('apiUrl')

function routes(app: Express) {
    app.get(`${API_URL}/todo`, fetchAllTodo)
    app.post(`${API_URL}/todo`, validateResource(createTodoSchema), createTodo)
    app.put(`${API_URL}/todo/:id`, validateResource(updateTodoSchema) ,updateTodo)
    app.delete(`${API_URL}/todo/:id`, validateResource(deleteTodoSchema),deleteTodo)
    app.get(`${API_URL}/todo/:id`, findOneTodo)
    app.get(`${API_URL}/todo/search` , queryTodo)
}

export default routes
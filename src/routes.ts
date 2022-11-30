import { Express } from "express";
import { fetchAllTodo, createTodo, updateTodo, deleteTodo, queryTodo } from './controllers/todo.controller'
const API_URL: String = '/api'

function routes(app: Express) {
    app.get(`${API_URL}/todo`, fetchAllTodo)
    app.post(`${API_URL}/todo`, createTodo)
    app.put(`${API_URL}/todo/:id`, updateTodo)
    app.delete(`${API_URL}/todo/:id`, deleteTodo)
    app.get(`${API_URL}/todo/query`, queryTodo)
}

export default routes
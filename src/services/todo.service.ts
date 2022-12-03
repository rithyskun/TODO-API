import { TodoInput, TodoDocument } from './../models/todo.model';
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import TodoModel  from '../models/todo.model'

export async function findAllTodo() {
    try {
        const todos = await TodoModel.find()
        return todos
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function createTodoTask(input: TodoInput) {
    try {
        const todos = await TodoModel.create(input)
        return todos.toJSON()
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function updateTodoTask(
    query: FilterQuery<TodoDocument>,
    update: UpdateQuery<TodoDocument>,
    options: QueryOptions
) {
    try {
        const todo = await TodoModel.findByIdAndUpdate(query, update, options)
        return todo
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function deleteTodoTask(query: FilterQuery<TodoDocument>) {
    return await TodoModel.findByIdAndDelete(query)
}

export async function findOneTodoTask(query: FilterQuery<TodoInput>, options: QueryOptions = { lean: true}) {
    try {
        const todo = await TodoModel.findOne(query, {}, options)
        return todo
    } catch (error: any) {
        throw new Error(error)
    }
}

export async function queryTodoTask(query: FilterQuery<TodoInput>, options: QueryOptions = { lean: true}) {
    try {
        const todo = await TodoModel.find(query, {}, options)
        return todo
    } catch (error: any) {
        throw new Error(error)
    }
}
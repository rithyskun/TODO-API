import { Request, Response } from "express";
import mongoose from "mongoose";
import { findAllTodo, createTodoTask, updateTodoTask, deleteTodoTask, findOneTodoTask } from '../services/todo.service'
import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput, GetTodoInput } from './../schemas/todo.schema';

export async function fetchAllTodo(req: Request<GetTodoInput['body']>, res: Response) {
    try {
        const todos = await findAllTodo()
        return res.status(200).json(todos)
    } catch (error: any) {
        console.log(error)
    }
}

export async function createTodo(req: Request<{}, {}, CreateTodoInput['body']>, res: Response) {
    try {
        const isExistTodo = await findOneTodoTask({
            todo: req.body.todo
        })

        if (isExistTodo) {
            return res.status(400).json('The todo task exist!')
        }

        const todo = await createTodoTask(req.body)
        return res.status(201).json(todo)
    } catch (error: any) {
        console.log(error)
    }
}

export async function updateTodo(req: Request<UpdateTodoInput['params']>, res: Response) {
    const id = req.params.id
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).send('Invalid Todo ID')
    }
    try {
        const updateBody = req.body
        const updateTodo = await updateTodoTask(
            { _id: req.params.id }, updateBody, { new: true }
        )

        if (!updateTodo) {
            return res.sendStatus(404)
        }
        res.status(200).json(updateTodo)
    } catch (error: any) {
        console.log(error)
    }
}

export async function deleteTodo(req: Request<DeleteTodoInput['params']>, res: Response) {
    const id = req.params.id
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).send('Invalid Todo ID')
    }

    try {
        const tobeRemoveTodo = await deleteTodoTask({
            _id: req.params.id
        })

        if (!tobeRemoveTodo) {
            return res.sendStatus(404)
        }
        res.json('Todo task has been deleted!')
    } catch (error: any) {
        console.log(error)
    }
}

export async function queryTodo(req: Request<GetTodoInput['params']>, res: Response) {
    try {
        const query = req.query
        const todo = await findOneTodoTask(query)

        if (!todo) {
            return res.sendStatus(404)
        }
        res.status(200).json(todo)
    } catch (error: any) {
        console.log(error)
    }
}
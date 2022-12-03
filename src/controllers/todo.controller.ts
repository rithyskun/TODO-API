import { Request, Response } from "express";
import mongoose from "mongoose";
import { findAllTodo, createTodoTask, updateTodoTask, deleteTodoTask, findOneTodoTask, queryTodoTask } from '../services/todo.service'
import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput, GetTodoInput } from './../schemas/todo.schema';
import TodoModel from "../models/todo.model";

export async function fetchAllTodo(req: Request, res: Response) {
    try {
        const todos = await findAllTodo()
        return res.status(200).send(todos)
    } catch (error: any) {
        res.status(500).json(error.message)
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
        res.status(500).json(error.message)
    }
}

export async function updateTodo(req: Request<UpdateTodoInput['params']>, res: Response) {
    const id = req.params.id
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json('Invalid id')
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
        res.status(500).json(error.message)
    }
}

export async function deleteTodo(req: Request<DeleteTodoInput['params']>, res: Response) {
    const id = req.params.id
    if (!mongoose.isObjectIdOrHexString(id)) {
        return res.status(400).json('Invalid id')
    }

    try {
        const tobeRemoveTodo = await deleteTodoTask({
            _id: req.params.id
        })

        if (!tobeRemoveTodo) {
            return res.sendStatus(404)
        }
        res.json('success')
    } catch (error: any) {
        res.status(500).json(error.message)
    }
}

export async function queryTodo(req: Request, res: Response) {
    try {
        const query = req.query
        
        const todo = await queryTodoTask(query)

        if (!todo || todo.length <= 0) {
            return res.sendStatus(404)
        }
        res.status(200).json(todo)
    } catch (error: any) {
        res.status(500).json(error.message)
    }
}

export async function findOneTodo(req: Request, res: Response) {
    try {
        const todo = await findOneTodoTask({
            _id: req.params.id
        })
        if(!todo) {
            return res.sendStatus(404)
        }
        res.status(200).json(todo)
    } catch (error: any) {
        res.status(500).json(error.message)
    }
}
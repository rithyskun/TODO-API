import { object, string, boolean, TypeOf } from 'zod'

const params = {
    params: object({
        id: string({
            required_error: 'Todo ID is required!'
        })
    })
}

const payload = {
    body: object({
        todo: string({
            required_error: 'Todo is required!'
        }).min(2, 'Task name too short - should be 2 characters minimum'),
        isCompleted: boolean({
            required_error: 'Status is required!'
        })
    })
}

export const createTodoSchema = object({
    ...payload,
})

export const updateTodoSchema = object({
    ...params,
    ...payload,
})

export const deleteTodoSchema = object({
    ...params,
})

export const getTodoSchema = object({
    ...params,
    ...payload,
})

export type CreateTodoInput = TypeOf<typeof createTodoSchema>
export type UpdateTodoInput = TypeOf<typeof updateTodoSchema>
export type DeleteTodoInput = TypeOf<typeof deleteTodoSchema>
export type GetTodoInput = TypeOf<typeof getTodoSchema>
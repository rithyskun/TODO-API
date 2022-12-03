import mongoose from "mongoose";

export interface TodoInput {
    todo: string,
    isCompleted: boolean
}

export interface TodoDocument extends TodoInput, mongoose.Document {
    id: string
    createAt: Date
}

const toDoSchema = new mongoose.Schema<TodoDocument>({
    todo: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

toDoSchema.virtual('id').get(function () {
    return this._id.toHexString()
  })
  
toDoSchema.set('toJSON', {
virtuals: true,
})

const TodoModel = mongoose.model<TodoDocument>('Todo', toDoSchema)

export default TodoModel
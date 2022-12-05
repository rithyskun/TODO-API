import { Server as IOServer } from 'socket.io'

export default function socket(io: IOServer) {
    io.on('connection', (socket: any) => {
        socket.on('connect', () => {
            console.log('client connected!')
        })
        socket.on('reload', (payload: any) => {
            setTimeout(() => {
                socket.broadcast.emit('refresh', payload)
            }, 1000)
        })

        socket.on('deleteTodo', (payload: string) => {
            setTimeout(() => {
                socket.broadcast.emit('todoRemoved', payload)
            }, 1000)
        })

        socket.on('createTodo', (payload: any) => {
            setTimeout(() => {
                socket.broadcast.emit('created', payload)
            }, 1000)
        })

        socket.on('updateTodo', (payload: any) => {
            setTimeout(() => {
                socket.broadcast.emit('updated', payload)
            }, 1000)
        })

        socket.on('disconnect', () => {
            console.log('client disconnected!')
        })

    })
}
import express, { Express, Request, Response } from 'express'
import http from 'http'
import compression from 'compression'
import cors from 'cors'
import config from 'config'
import mongoSanitize from 'express-mongo-sanitize'
import connect from './utils/connection'
import routes from './routes'
import { Server } from 'socket.io'
import socket from './utils/socket'
import httpLog from './utils/httpLog'

const options: cors.CorsOptions = {
    origin: '*',
    maxAge: 84600,
}

const app: Express = express()
const port = config.get<number>('port') || 4001
app.use(cors<Request>(options))
app.use(compression())
app.use(express.json())
app.use(mongoSanitize())
app.use(httpLog)

const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })
app.set('socketio', io)

httpServer.listen(port, async () => {
    console.log(`Server is running at port ${port}`)
    await connect()
    routes(app)
    socket(io)
})
import express, { Express, Request, Response } from 'express'

import compression from 'compression'
import cors from 'cors'
import config from 'config'
import mongoSanitize from 'express-mongo-sanitize'
import connect from './utils/connection'
import routes from './routes'
import { Server as IOServer } from 'socket.io'
import socket from './utils/socket'
import httpLog from './utils/httpLog'
import http from 'http'
import type { Server as HTTPServer } from 'http'

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

const httpServer: HTTPServer = http.createServer(app)
const io = new IOServer(httpServer, { cors: { origin: '*' } })

httpServer.listen(port, async () => {
    console.log(`Server is running at port ${port}`)
    await connect()
    routes(app)
    socket(io)
})
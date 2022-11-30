import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import http from 'http'

import connect from './utils/connection'
import routes from './routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 4001

app.use(express.json())

const httpServer = http.createServer(app)


httpServer.listen(port, async () => {
    console.log(`Server is running at port ${port}`)
    await connect()
    routes(app)
})
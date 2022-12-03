import { Request, Response, NextFunction } from 'express'

export default function httpLog(req: Request, res: Response, next: NextFunction) {
    console.info(`${req.method} ${req.originalUrl}`)
    console.info(req.body)

    res.on('finish', () => {
        console.info(`${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') || 0}b sent`)
    })
    next()
}
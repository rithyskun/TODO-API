import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT,
    dbUri: process.env.MONGO_URI,
    apiUrl: process.env.API_URL
}
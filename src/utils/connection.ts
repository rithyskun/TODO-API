import mongoose from 'mongoose'

async function connect() {
  let dbUri: any = process.env.DB_URI

  try {
    await mongoose.connect(dbUri)
    console.log('Database connected!')
  } catch (error) {
    process.exit(1)
  }
}

export default connect

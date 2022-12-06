import mongoose from 'mongoose'
import config from 'config'

async function connect() {
  let dbUri = config.get<string>('dbUri')
  try {
    await mongoose.connect(dbUri)
    console.log('Database connected!')
  } catch (error) {
    process.exit(1)
  }
}

export default connect

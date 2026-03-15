import app from './app.js'
import config from './config/index.js'

async function startServer() {
  try {
    app.listen(config.port, () => {
      console.log(`Mahsez backend api listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

startServer()

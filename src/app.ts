import express, { type Application } from 'express'
const app: Application = express()

app.use(express.json())

app.get('/', (req, res) => {
  const a = 10

  res.send(a)
})

export default app

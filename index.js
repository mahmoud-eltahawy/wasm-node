import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('hello world')
})

/**@type {3000 | 8080} port*/
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

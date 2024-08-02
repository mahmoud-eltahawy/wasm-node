import express from 'express'
import {fibonacci} from 'fibonacci';

const app = express()

app.get('/fib/:number', (req, res) => {
  const value = req.params.number;
  const number = Number(value);
  if (isNaN(number)) {
    res.send(`this value : ${value} is not valid number`).status(400)
    return;
  }
  const result = fibonacci(number);
  res.send(result.toString()).status(200)
})

/**@type {3000 | 8080} port*/
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

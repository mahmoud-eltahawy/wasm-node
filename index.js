import express from 'express'
import {fibonacci} from 'fibonacci';
import { MongoClient, ObjectId } from 'mongodb';

/**@type {3000 | 8080} port*/
const port = 3000;
const mongo_client = new MongoClient('mongodb://localhost:27017');
const app = express()
app.use(express.json())


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

const db_users = mongo_client.db("test_db").collection("users");

app.get('/users',async (_req,res) => {
  await mongo_client.connect();
  const users = await db_users.find().toArray()
  res.send(JSON.stringify(users)).status(200)
})

app.get('/users/:id',async (req,res) => {
  const id = req.params.id;
  await mongo_client.connect();
  const user = await db_users.find(new ObjectId(id)).toArray()
  res.send(JSON.stringify(user)).status(200)
})

app.post('/users',async (req,res,_next) => {
  const body = req.body;
  const result = await db_users.insertOne(body)
  if (result.acknowledged) {
    res.json(body).status(200);
  } else {
    res.json(body).status(400);
  }
})

app.put("/users/:id",async (req,res,_next) => {
  const id = req.params.id;
  const body = req.body;
  const result = await db_users.updateOne({"_id" : new ObjectId(id)},{$set : body})
  if (result.acknowledged) {
    res.send().status(200);
  } else {
    res.send().status(400);
  }
});

app.delete("/users/:id",async (req,res,_next) => {
  const id = req.params.id;
  await mongo_client.connect();
  const result = await db_users.deleteOne({"_id" : new ObjectId(id)});
  if (result.acknowledged) {
    res.send().status(200)
  } else {
    res.send().status(400)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

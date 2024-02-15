import axios from "axios";
import { MongoClient } from "mongodb";
import express from "express";
import bodyParser from "body-parser";
import monsters from "./routes/monster.route.js";
import { connectDB } from "./database/database.js";

const app = express();
const port = 8000;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use("/monsters", monsters);

// Start Express server
app.listen(port, async function () {
  console.log(`🚀 Fire app listening on port ${port}!`);

  try {
      
      const response = await axios.get("https://gist.githubusercontent.com/mrchenliang/e438f666d121261b74abcd70a5f938d8/raw/a8f14ee5097fe2ab4f78798307d2dd3dcb0dcd3a/monsters.json");
      let jsonData = response.data;

      const client = new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      const db = client.db("monsterworld"); 
      const collection = db.collection("monsters");
       
      if (Array.isArray(jsonData)) {
          await collection.insertMany(jsonData);
      } else {
          jsonData = JSON.parse(jsonData);
          await collection.insertMany(jsonData);
      }

      console.log(`Data inserted successfully!`);

  } catch (error) {
      console.error(`Error with inserting data into MongoDB`);
  }
});

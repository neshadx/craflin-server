const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("craflinDB");
    const groupCollection = db.collection("groups");

    app.post("/api/groups", async (req, res) => {
      const group = req.body;
      const result = await groupCollection.insertOne(group);
      res.status(201).send(result);
    });

    app.get("/api/groups", async (req, res) => {
      const groups = await groupCollection.find().toArray();
      res.send(groups);
    });

    app.get("/api/groups/:id", async (req, res) => {
      const id = req.params.id;
      const group = await groupCollection.findOne({ _id: new ObjectId(id) });
      if (!group) return res.status(404).send({ error: "Group not found" });
      res.send(group);
    });

    app.delete("/api/groups/:id", async (req, res) => {
      const id = req.params.id;
      const result = await groupCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/", (req, res) => {
      res.send(" Craflin backend is running!");
    });

    await client.db("admin").command({ ping: 1 });
    console.log(" Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});

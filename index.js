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
    await client.connect();

    const db = client.db("craflinDB");
    const groupCollection = db.collection("groups");

    // Create Group
    app.post("/api/groups", async (req, res) => {
      try {
        const group = req.body;
        const result = await groupCollection.insertOne(group);
        res.status(201).send(result);
      } catch (err) {
        console.error("POST /api/groups error:", err);
        res.status(500).send({ error: "Failed to create group" });
      }
    });

    // Get All Groups
    app.get("/api/groups", async (req, res) => {
      try {
        const groups = await groupCollection.find().toArray();
        res.send(groups);
      } catch (err) {
        console.error("GET /api/groups error:", err);
        res.status(500).send({ error: "Failed to fetch groups" });
      }
    });

    // Get Group by ID
    app.get("/api/groups/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const group = await groupCollection.findOne({ _id: new ObjectId(id) });
        if (!group) return res.status(404).send({ error: "Group not found" });
        res.send(group);
      } catch (err) {
        console.error("GET /api/groups/:id error:", err);
        res.status(500).send({ error: "Failed to fetch group" });
      }
    });

    // Delete Group
    app.delete("/api/groups/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await groupCollection.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (err) {
        console.error("DELETE /api/groups/:id error:", err);
        res.status(500).send({ error: "Failed to delete group" });
      }
    });

    // ✅ Join Group (NEW ROUTE)
    app.patch("/api/groups/join/:id", async (req, res) => {
      try {
        const groupId = req.params.id;
        const userEmail = req.headers?.authorization?.split(" ")[1];

        if (!userEmail) {
          return res.status(400).send({ error: "User email is required" });
        }

        const group = await groupCollection.findOne({ _id: new ObjectId(groupId) });
        if (!group) {
          return res.status(404).send({ error: "Group not found" });
        }

        if (group.members && group.members.includes(userEmail)) {
          return res.status(400).send({ error: "Already joined" });
        }

        const updated = await groupCollection.updateOne(
          { _id: new ObjectId(groupId) },
          { $push: { members: userEmail } }
        );

        res.send({ message: "Joined successfully", updated });
      } catch (err) {
        console.error("PATCH /api/groups/join/:id error:", err);
        res.status(500).send({ error: "Failed to join group" });
      }
    });

    // Test Route
    app.get("/api/test", (req, res) => {
      res.send({ message: "API is reachable" });
    });

    // Root
    app.get("/", (req, res) => {
      res.send(" Craflin backend is running!");
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});

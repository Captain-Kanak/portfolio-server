import dotenv from "dotenv";
dotenv.config()
import express, { json } from "express";
import cors from "cors";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

// create app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-seven-rust-4cu9pywf9f.vercel.app",
    ],
  })
);

// database management
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // database collections
    const projectCollections = client
      .db(process.env.DB_NAME)
      .collection("projects");
    const messageCollections = client
      .db(process.env.DB_NAME)
      .collection("messages");

    // project post api
    app.post("/projects", async (req, res) => {
      const project = req.body;
      project.createdAt = new Date().toISOString();

      const result = await projectCollections.insertOne(project);
      res.send(result);
    });

    // projects get api
    app.get("/projects", async (req, res) => {
      const projectsData = await projectCollections
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(projectsData);
    });

    // single project get api
    app.get("/projects/:projectId", async (req, res) => {
      const projectId = req.params.projectId;
      const query = { _id: new ObjectId(projectId) };

      const result = await projectCollections.findOne(query);
      res.send(result);
    });

    // project delete api
    app.delete("/projects/:projectId", async (req, res) => {
      const projectId = req.params.projectId;
      const query = { _id: new ObjectId(projectId) };

      const result = await projectCollections.deleteOne(query);
      res.send(result);
    });

    // message post api
    app.post("/messages", async (req, res) => {
      const message = req.body;
      message.createdAt = new Date().toISOString();

      const result = await messageCollections.insertOne(message);
      res.send(result);
    });

    // messages get api
    app.get("/messages", async (req, res) => {
      const messagesData = await messageCollections
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      res.send(messagesData);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// server basic health check
app.get("/", (req, res) => {
  res.send("Portfolio Server Running Successfully!");
});

// server start
app.listen(port, (req, res) => {
  console.log(`server running on port http://localhost:${port}`);
});

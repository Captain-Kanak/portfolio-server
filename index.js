require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// create app and port
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://portfolio-seven-rust-4cu9pywf9f.vercel.app",
      "http://localhost:5173",
    ],
  })
);

// database management
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0d3a79b.mongodb.net`;

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
    const projectCollections = client.db("portfolio").collection("projects");

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
  res.send("Server Running Successfully!");
});

// server start
app.listen(port, (req, res) => {
  console.log(`server running on port http://localhost:${port}`);
});

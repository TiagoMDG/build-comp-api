const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

// Routes

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create a new user
app.post("/users", async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(user);
});

// Get a user by ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(user);
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { email, name },
  });
  res.json(user);
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: "User deleted" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

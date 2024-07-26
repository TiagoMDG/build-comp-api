const express = require("express");
const app = express();

// Import versioned routes
const v1Routes = require("./routes/v1/api");

const port = 3000;

app.use(express.json());

// Routes setup for version 1
app.use("/api/v1", v1Routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

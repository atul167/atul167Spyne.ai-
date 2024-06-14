const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User");
const bodyParser = require("body-parser"); // Only use bodyParser if not using express.json() for parsing
// const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

const url = "mongodb://127.0.0.1:27017/Spyne"; // Add database name at the end

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// Homepage route
app.get("/", (req, res) => {
  res.render("index"); // Render the 'index.ejs' view
});
app.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch user data from MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Render the 'profile.ejs' view with user data
    res.render("profile", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user");
  }
});
// Route to post a new discussion
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

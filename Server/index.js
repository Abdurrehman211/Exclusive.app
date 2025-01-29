const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_Secret = "BDFFAA1591D84498FA9213C88D522";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/Exclusive", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
const User = mongoose.model("Registers", userSchema);

//Register Route

app.post("/register", (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash, role }).then((user) => {
        console.log("Data stored:", user);
        res.status(201).send("User registered successfully"); // Respond to the frontend
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error storing user data"); // Handle error response
    });
});

//register Route End

//**************************************************** */

//Login Route

app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("Finding USer");
    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }
    console.log("Finding Pass");
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, username: user.name },
      JWT_Secret,
      { expiresIn: "1h" }
    );
    console.log("User logged in");
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in");
  }
});

//Login Route End

//********************************************************************** */

//User data ROUTE Start

app.get("/getuser", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1]; // Extract the token
  if (!token) {
    return res.status(401).json({
      message: "Invalid token format",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_Secret);
    const user = await User.findOne({ _id: decoded.id });

    if (user) {
      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error decoding token",
    });
  }
});

//User data ROUTE End

//*********************************************** */

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

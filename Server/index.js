const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const app = express();
const http = require("http");
const { Server } = require("socket.io");



//Setting the Sockets: 
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Variables..
const JWT_Secret = process.env.JWT_Secret;
const client = new OAuth2Client(process.env.Google_Client);

//Headers and CORS....

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// MONGO Connection....
mongoose
  .connect(process.env.CONN_STRING, {
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
  role: {
    type: String,
    default: "user",
  },
  profilePic: {
    type: String,
    default: "", // Safe default if not provided
  },
});


const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});


const orderSchema = new mongoose.Schema({
  order_id: { type: String, required: true },
  tracker: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'PKR' },
  status: { type: String, default: 'PENDING' }, // or COMPLETED / FAILED
  createdAt: { type: Date, default: Date.now }
});

const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  addressLine: {
    type: String,
    required: true
  },
  city: String,
  postalCode: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Address = mongoose.model("Address", addressSchema);
const Order = mongoose.model('Order', orderSchema);
const Message = mongoose.model("Message", MessageSchema);


const User = mongoose.model("Registers", userSchema);


//Register Route

app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash, role }).then((user) => {
        res.status(201).send("User registered successfully"); // Respond to the frontend
      });
    })
    .catch((err) => {
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
    const isValidPassword = bcrypt.compare(password, user.password);
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

//Login with Google

//***************************************************** */
app.post("/login-google", async (req, res) => {
  const token = req.body.token;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture } = payload;

    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: null,
        role: "user",
        profilePic: picture,
      });
    }
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, username: user.name },
      JWT_Secret,
      { expiresIn: "1h" }
    );
    res.json({
      success: true,
      token: jwtToken,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: "Invalid Google token" });
  }
});

//Login with Google END

//***************************************************** */

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
    const decoded = jwt.verify(token, JWT_Secret); // jwt.verify throws if expired or invalid
    const user = await User.findOne({ _id: decoded.id }).select("-password");
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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

//User data ROUTE End

//*********************************************** */

//Email Roue Start
//********************************************* */

app.post("/send-mail", async (req, res) => {
  const { email, name, message, phone } = req.body;
  //transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  //creating Mail fucntion
  const mailOptions = {
    from: email,
    subject: "Complaint",
    to: "battlemani790@gmail.com",
    text: `
    A new Message from ${email} \n
    Name: ${name} \n
    Email: ${email} \n
    Phone No: ${phone} \n 
    Message: ${message} \n
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Email Roue End
//********************************************************* */

app.get("/", (req, res) => {
  res.send("Backend is running");
});


// Sockets!!!
io.use((socket,next)=>{
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('No Authentication'));
  }
  try {
const user = jwt.verify(token, JWT_Secret);
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
})

const userId = {};

io.on("connection", (socket) => {
  const user_id = socket.user.id;
  userId[user_id] = socket.id;
  
  console.log(`${user_id} connected on socket ${socket.id}`);

  socket.on('send_message', async ({ receiver_id, message, tempId }) => {
  try {
    const sender_id = socket.user.id;
    
    const savedMessage = await Message.create({
      sender: sender_id,
      receiver: receiver_id,
      message,
    });

    const clientMessage = {
      ...savedMessage.toObject(), // Convert mongoose doc to plain object
      tempId // Include the temporary ID
    };
    console.log(clientMessage);
    // Confirm to sender
    socket.emit("message_sent", clientMessage);
      
      // Emit to receiver if online
      const receiverSocketID = userId[receiver_id];
      console.log(`Receiver Socket ID: ${receiverSocketID}`);
      
    if (receiverSocketID) {
      io.to(receiverSocketID).emit("new_message", clientMessage);
    }
    
  } catch (error) {
    console.error("Message send error:", error);
    socket.emit("message_error", { error: "Failed to send message" });
    
    // Optionally: Remove optimistic update on error
    socket.emit("remove_optimistic", { tempId });
  }
  });

  socket.on("disconnect", () => {
    delete userId[user_id];
    console.log(`${user_id} disconnected`);
  });
});

app.get("/chat/users", async (req, res) => {
  const users = await Message.distinct("sender", { receiver: "683df0d88971fa30a49c50a9" });
  const userDetails = await User.find({ _id: { $in: users } });
  res.json(userDetails);
});

app.get("/chat/messages/:userId", async (req, res) => {
  const messages = await Message.find({
    $or: [
      { sender: req.params.userId, receiver: "683df0d88971fa30a49c50a9" },
      { sender: "683df0d88971fa30a49c50a9", receiver: req.params.userId },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

// Safe PAy integration !!!


//safepay initailization
const safepay = require('@sfpy/node-core')(process.env.Safe_pay_SECRET_KEY, {
  authType: 'secret',
  host: process.env.Safe_pay_Host 
});

// Route CREATION

app.post('/gateway/payment', async (req,res)=>{
try{
  const {amount , Order_id} = req.body;
  const payment = safepay.payments.session.setup({
    merchant_api_key: process.env.SAFEPAY_API_KEY,
      intent: "CYBERSOURCE",  // Payment gateway
      mode: "payment",        // One-time payment
      currency: "PKR",        // Default currency
      amount: amount * 100,   // Convert to paisa
      metadata: {
         order_id: Order_id 
      }
  })

  const order = new Order.create({
    order_id: Order_id,
    tracker: payment.token,
    amount: amount * 100, // Convert to paisa
    currency: "PKR",
    status: "PENDING"
  });
  await order.save();
  console.log(payment);
  res.json({
        checkout_url: payment.redirect_url, // Redirect user here
      tracker: payment.token,  
  })
}catch(err){
 console.error(err);
    res.status(500).json({ error: "Failed to create payment session" });
}
})
 
// For Payment Verifications:
//03363973553
app.get('/gateway/verification/:token',async(req,res)=>{
  try {
    const token = req.params.token;
    const details = await safepay.payments.session.fetch(token);
    const order = await Order.findOne({
      tracker: token
    });
    if(!order){
      return res.status(404).json({
        error: 'Order not Found'
      });
    }
    order.status = details.status;
    await order.save();

    res.json({
      message: "Payment Verified",
      status: details.status,
      order
    });

  } catch (error) {
    console.error(err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
})



// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


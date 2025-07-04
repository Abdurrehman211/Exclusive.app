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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  order_id: { type: String, required: true },
  tracker: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'PKR' },
  address: {
    name: String,
    addressLine: String,
    city: String,
    postalCode: String,
    phoneNo: String,
    country: String
  },
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number
    }
  ],
  paymentMethod: {
    type: String,
    enum: ['COD', 'Bank','GOOGLE_PAY', 'SAFE_PAY'],
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
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
  phoneNo :{
    type: String,
    required: true
  },
  email: String,
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
const address = await Address.findOne({ userId: user._id }).select("-_id -__v");
 const userObj = user.toObject();
    if (address) {
      userObj.address = address;
     
    } else {
       userObj.address  = null;
       
    }
      return res.status(200).json({
        success: true,
        user:  userObj,
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
const safepay = require('@sfpy/node-core')(process.env.SAFE_PAY_SECRET_KEY, {
  authType: 'secret',
  host: process.env.SAFE_PAY_HOST
});

app.post('/gateway/payment', async (req, res) => {
  try {
    const {
      userId,
      amount,
      Order_id,
      address,
      items,
      paymentMethod,
      saved
    } = req.body;

    // STEP 1: Setup Safepay payment session
    const payment = await safepay.payments.session.setup({
      merchant_api_key: process.env.SAFEPAY_API_KEY,
      intent: "CYBERSOURCE",
      mode: "payment",
      currency: "PKR",
      customer: {  // Add customer details
    email: address.email,  // Required field
    first_name: address.name,
  },
  metadata: {
    order_id: Order_id,
    source: "your-website"  // Additional identifying info
  }
    });


console.log("Full Payment Session Response:", payment.data);  // Debug output

const token = payment?.data?.tracker?.token;
if (!token) {
  throw new Error(`Token generation failed. Response: ${JSON.stringify(payment)}`);
}



    // STEP 2: Generate checkout URL directly (no need for separate auth in most cases)
const baseParams = {
      tracker: token,
      client: client,
      env: 'sandbox',
      redirect_url: encodeURIComponent("http://localhost:3000/success"),
      cancel_url: encodeURIComponent("http://localhost:3000/cancel")
    };

    const checkoutUrl = `https://sandbox.api.getsafepay.com/checkout/pay?${new URLSearchParams(baseParams)}`;

    console.log("Final Checkout URL:", checkoutUrl);


    // STEP 4: Save address if needed
    let finalAddress = address;
    if (saved === true || saved === 'true') {
      const savedAddress = await Address.create({
        userId,
        name: address.name,
        addressLine: address.addressLine,
        city: address.city,
        postalCode: address.postalCode,
        country: address.country
      });
      finalAddress = {
        name: savedAddress.name,
        addressLine: savedAddress.addressLine,
        city: savedAddress.city,
        postalCode: savedAddress.postalCode,
        country: savedAddress.country
      };
    }

    // STEP 5: Save order
    const order = await Order.create({
      userId,
      order_id: Order_id,
      tracker: token,
      amount: amount * 100,
      currency: "PKR",
      address: finalAddress,
      items,
      paymentMethod,
      status: "PENDING"
    });

    // STEP 6: Return response
     res.json({
      success: true,
      checkout_url: checkoutUrl.toString(),
      debug: {  // Remove in production
        tracker: payment.data.tracker,
        capabilities: payment.data.capabilities
      }
    });

  } catch (err) {
    console.error("Safepay Payment Error:", err);
    res.status(500).json({ error: "Failed to create payment session" });
  }
});

 
// For Payment Verifications:
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
    order.status = details.status || "Failed";
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


//For COD*******************

app.post('/gateway/COD' , async (req , res)=>{
  try {
    const {
  userId,amount,Order_id,address,items,paymentMethod,saved} = req.body;
  if (paymentMethod !== 'COD'){
    return res.status(400).json({
      error: "Invalid Payment Method"
    });
  }
  let finalAddress = address;
  if(saved === true || saved === 'true'){
    const savedAddress = await Address.create({
        userId,
        name: address.name,
        addressLine: address.addressLine,
        city: address.city,
        phoneNo: address.phoneNo,
        postalCode: address.postalCode,
        country: address.country
      });

      // store the Mongo document reference in order if needed (optional)
      // or continue embedding the raw address (depends on your schema)
      finalAddress = {
        name: savedAddress.name,
        addressLine: savedAddress.addressLine,
        city: savedAddress.city,
        postalCode: savedAddress.postalCode,
        country: savedAddress.country
      };
  }


    const order  =await Order.create({
       userId,
      order_id: Order_id,
      tracker: "COD_" + Date.now(), 
      amount: amount * 100,
      currency: "PKR",
      address:finalAddress,
      items,
      paymentMethod: "COD",
      status: "PENDING" 
    });

    await order.save();
      res.status(201).json({
      message: "Order placed with Cash on Delivery",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to place COD order" });
  }


});

//Google playgteway

app.post('/gateway/GooglePay' , async (req , res)=>{
  try {
    const {
  userId,amount,Order_id,address,items,paymentMethod,saved} = req.body;
  if (paymentMethod !== 'Google Pay'){
    return res.status(400).json({
      error: "Invalid Payment Method"
    });
  }
  let finalAddress = address;
  if(saved === true || saved === 'true'){
    const savedAddress = await Address.create({
        userId,
        name: address.name,
        addressLine: address.addressLine,
        city: address.city,
        phoneNo: address.phoneNo,
        postalCode: address.postalCode,
        country: address.country
      });

      // store the Mongo document reference in order if needed (optional)
      // or continue embedding the raw address (depends on your schema)
      finalAddress = {
        name: savedAddress.name,
        addressLine: savedAddress.addressLine,
        city: savedAddress.city,
        postalCode: savedAddress.postalCode,
        country: savedAddress.country
      };
  }


    const order  =await Order.create({
       userId,
      order_id: Order_id,
      tracker: "GooglePay_" + Date.now(), 
      amount: amount * 100,
      currency: "PKR",
      address:finalAddress,
      items,
    paymentMethod: "GOOGLE_PAY",
      status: "PENDING" 
    });

    await order.save();

      res.status(201).json({
      message: "Order placed with Google Pay",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place GPay order" });
  }


});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


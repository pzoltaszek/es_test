const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const User = require("./Entities/User");
const cors = require("cors");

const API_PORT = 3001;
const app = express();
const router = express.Router();
//disable CORS policy
app.use(cors());

// this is our MongoDB database
const dbRoute = "mongodb://pzoltaszek:P1i2o3t4r5@ds145194.mlab.com:45194/pzoltaszek_es";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// this is our get method
// this method fetches all available data in our database
router.get("/getUser", (req, res) => {
  User.find((err, user) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true, data: user });
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateUser", (req, res) => {
  const { id, update } = req.body;
  User.findByIdAndUpdate(id, update, err => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteUser", (req, res) => {
  const { id } = req.body;
  if(id === undefined || id <0 || id ===null){
    return res.json({ success: false});
  }
  User.findByIdAndDelete(id, err => {
    if (err) return res.send(err);
    //return res.json({ success: true });
  })
  .then(function(){
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putUser", (req, res) => {
  let user = new User();

  const { id, login, password } = req.body;

  if ((!id && id !== 0) || (!login && password)) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  user.login = login,
  user.password = password;
  user.id = id;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

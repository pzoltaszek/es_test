const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const User = new Schema(
  {
    id: Number,
    login: String,
    password: String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", User);
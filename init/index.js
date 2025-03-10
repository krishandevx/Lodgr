const mongoose = require("mongoose")
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/lodger";

main().then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.log(err);
  });

async function main(req, res, next) {
  await mongoose.connect(MONGO_URL);
}


const initDB = async () => {
    await Listing.deleteMany({});   //This will clean all the pre-existing data
    await Listing.insertMany(initData.data);
    console.log("Data was successfully initialized")
}

initDB();
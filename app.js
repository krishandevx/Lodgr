const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/lodger";

main().then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    console.log(err);
  })

async function main(req, res, next) {
  await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

app.get("/", (req, res) => {
  res.send("Hi, I am root")
})

const validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


app.get("/listings", wrapAsync(async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings})
}))

// New Route
app.get("/listings/new",  (req, res) => {
  res.render("listings/new.ejs")
})

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing})
}))


// Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);      // Chances of error
    await newListing.save(); 
    res.redirect("/listings")
  
}))

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing})
}))

// Update Route
app.put("/listings/:id",validateListing, wrapAsync(async(req, res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing})
  res.redirect(`/listings/${id}`)
}))

// Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id)
  // console.log(deletedListing);
  res.redirect("/listings")
}))

app.all("*", (req,res,next) => {
  next(new ExpressError(404, "Page Not Found!"))
})

app.use((err,req,res,next) => {
  let {statusCode=500, message="Something went wrong!"} = err;
  res.render("error.ejs", { err })
})

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

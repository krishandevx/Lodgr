const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");

const listings = require("./routes/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/lodger";

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main(req, res, next) {
  await mongoose.connect(MONGO_URL);
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {hxc
  res.send("Hi, I am root");
}); 

const validateReview = (req, res, next) => {
  let result = reviewSchema.validate(req.body, { abortEarly: false });

  console.log(result.error)

  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

app.use("/listings",listings)



// Reviews
// POST REVIEW ROUTE
app.post("/listings/:id/reviews", validateReview,wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`);
}));

// delete review route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req, res) => {
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}})
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`)
}))

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.render("error", { err });
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

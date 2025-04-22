const Listing = require("./models/listing")
const Review = require("./models/review")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema} = require("./schema.js");
module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error","Please login first to create listing")
        return res.redirect("/login")
      }
      next()
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    } 
    next()
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
      let listing = await Listing.findById(id)
      if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","Access Denied. You don’t have permission to modify this listing.")
       return res.redirect(`/listings/${id}`)
      }
      next()
}

module.exports.validateListing = (req, res, next) => {
  let result = listingSchema.validate(req.body, { abortEarly: false });

  if (result.error) {
    let errMsg = result.error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body, { abortEarly: false });
  
    if (result.error) {
      let errMsg = result.error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
      let review = await Review.findById(reviewId)
      if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","Access Denied. You don’t have permission to modify this review.")
       return res.redirect(`/listings/${id}`)
      }
      next()
}
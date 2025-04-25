const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, isOwner, validateListing, setListingImageData } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js")
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedin,
    upload.single("listing[image][url]"),
    setListingImageData,
    validateListing,
    wrapAsync(listingController.createListing)
  )


// New Route
router.get("/new", isLoggedin, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedin,
    isOwner,
    upload.single("listing[image][url]"),
    setListingImageData,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedin, isOwner, wrapAsync(listingController.deleteListing));

//Edit Route
router.get(
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;

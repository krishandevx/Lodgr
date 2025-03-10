const mongoose = require("mongoose");
const { Schema } = mongoose;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: { type: String, default: "default.jpg" },
        url: { 
            type: String, 
            default: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing;
import mongoose from "mongoose";

const keyboardsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  rate_average: {
    type: Number,
  },
  rate_number: {
    type: Number,
  },
  colors: {
    type: Array,
  },
  profile_type: {
    type: String,
  },
  category: {
    type: String,
  },
  series: {
    type: String,
  },
  connectivity: {
    type: String,
  },
  size: {
    type: String,
  },
  features: {
    type: String,
  },
  new: {
    type: Boolean,
  },
  delivery_time: {
    type: Number,
  },
  service_email: {
    type: String,
  },
  available: {
    type: Boolean,
  },
  popularity: {
    type: Number,
  },
  images: {
    type: Array,
  },
});

const Keyboard = mongoose.model("Keyboard", keyboardsSchema);
export default Keyboard;

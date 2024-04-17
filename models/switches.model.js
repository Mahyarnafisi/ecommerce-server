import mongoose from "mongoose";

const switchesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
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
  options: {
    type: Array,
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

const Switch = mongoose.model("switch", switchesSchema);
export default Switch;

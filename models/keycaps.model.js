import mongoose from "mongoose";

const keycapsSchema = new mongoose.Schema({
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
  series: {
    type: String,
  },
  category: {
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
});

const Keycap = mongoose.model("keycap", keycapsSchema);
export default Keycap;

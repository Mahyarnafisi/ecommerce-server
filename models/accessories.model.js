import mongoose from "mongoose";

const accessoriesSchema = mongoose.Schema({
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
  product_type: {
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

const Accessory = mongoose.model("Accessory", accessoriesSchema);

export default Accessory;

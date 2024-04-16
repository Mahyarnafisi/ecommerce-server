import mongoose from "mongoose";

const filtersSchema = new mongoose.Schema({
  product: {
    type: String,
  },
  filters: {
    type: Array,
  },
});

const Filter = mongoose.model("Filter", filtersSchema);
export default Filter;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);

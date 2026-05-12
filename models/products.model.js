const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "Please provide a category"],
      ref: "Category",
    },
    costPrice: {
      type: Number,
      require: [true, "Please provide a cost price"],
      min: [0, "Cost price must be greater than or equal zero"],
    },
    salePrice: {
      type: Number,
      require: [true, "Please provide a sale price"],
      min: [0, "Sale price must be greater than or equal zero"],
    },
    image: {
      type: String,
      require: [true, "Please provide a image"],
    },
    currentStock: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

product = mongoose.model("Product", schema);

module.exports = product;

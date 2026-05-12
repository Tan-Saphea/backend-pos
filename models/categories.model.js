const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
      unique: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//search name 
schema.index(
  {
    name: "text",
  },
  {
    default_language: "none",
  },
);

const category = mongoose.model("Category", schema);

module.exports = category;

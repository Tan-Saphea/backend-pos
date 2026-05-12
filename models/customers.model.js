const { default: mongoose } = require("mongoose");
const { type } = require("server/reply");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide a name"],
      unique: true,
    },
    phone: {
      type: String,
      require: [true, "Please provide a phone"],
      unique: true,
    },
    address: {
      type: String,
      require: [true, "Please provide a address"],
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

//search name and phone
schema.index(
  {
    name: "text",
    phone: "text",
  },
  {
    default_language: "none",
  },
);

const customer = mongoose.model("Customer", schema);

module.exports = customer;

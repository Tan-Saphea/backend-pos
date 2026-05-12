const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      require: [true, "Please provide a username"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    password: {
      type: String,
      require: [true, "Please provide a password"],
      minLengthe: 6,
    },
    role: {
      type: String,
      enum: ["supper", "admin", "cashier"],
      require: [true, "Please provide a role"],
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", schema);

module.exports = User;

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    wallet:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Wallet'
    },
    role: {
      type: String,
      enum: ["user", "admin",],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);


const populateUser = function (next) {
  this.populate("wallet", "_id amount"),
  next();
};

UserSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  // .pre("findById", populateUser)
  .pre("findOneAndUpdate", populateUser);
module.exports = mongoose.model('User', UserSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema(
  {
    owned_by: {
        type: Schema.Types.ObjectId,
        ref:'User'
      },
    amount: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

const populateUser = function (next) {
  this.populate("owned_by", "_id lastName firstName phone email"),
  next();
};

WalletSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

module.exports = mongoose.model("Wallet", WalletSchema);
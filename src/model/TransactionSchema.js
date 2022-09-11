const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    amount: {
      type: Number,
      // required: true
    },
    kind: {
      type: String,
      enum: ["deposit", "withdrawal", "transfer"],
      default: "deposit",
    },
    reference: {
      type: Object,
    },
    done_by: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    transact_with: {
      type: Schema.Types.ObjectId,
      ref:'User'
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["cancel", "pending", "success"],
      default: "success",
    },
    others:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);


const populateUser = function (next) {
  this.populate("done_by", "_id lastName firstName phone email"),
  this.populate("transact_with", "_id lastName firstName phone email"),
  next();
};

TransactionSchema.pre("find", populateUser)
  .pre("findOne", populateUser)
  .pre("findOneAndUpdate", populateUser);

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
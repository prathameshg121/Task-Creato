const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const enoteSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3 },
    content: { type: String, required: true, trim: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date },
  },
  { timestamps: true }
);

const eNote = mongoose.model("eNote", enoteSchema);

module.exports = eNote;

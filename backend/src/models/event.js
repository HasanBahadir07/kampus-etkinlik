import mongoose from "mongoose";

// Etkinlik dokümanının şeması. _id'yi MongoDB kendisi atar.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    date: {
      type: String,
      required: true,
      match: [/^\d{4}-\d{2}-\d{2}$/, "date YYYY-MM-DD biçiminde olmalı"],
    },
    time: { type: String, default: "" },
    capacity: { type: Number, default: 0, min: 0 },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  {
    timestamps: true, // createdAt, updatedAt
    // JSON'a çevirirken _id → id, __v gizli
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

// Şemayı derleyerek model oluştur → "events" koleksiyonu
const Event = mongoose.model("Event", eventSchema);

export default Event;

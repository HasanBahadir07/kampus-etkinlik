import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

export const CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

// Etkinlik dokümanının şeması. _id'yi MongoDB kendisi atar.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: CATEGORIES,
        message: `category şunlardan biri olmalı: ${CATEGORIES.join(", ")}`,
      },
    },
    // API'de "GG-AA-YYYY", veritabanında Date: sıralama ve $gte tarihe göre çalışır.
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    capacity: { type: Number, default: 0, min: 0 },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { getters: true }, // date yanıtta "GG-AA-YYYY" görünsün
    id: false, // _id dışında ayrıca "id" alanı ekleme
  },
);

// Şemayı derleyerek model oluştur → "events" koleksiyonu
const Event = mongoose.model("Event", eventSchema);

export default Event;

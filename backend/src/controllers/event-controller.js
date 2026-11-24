import mongoose from "mongoose";
import Event from "../models/event.js";

const notFound = (res) =>
  res.status(404).json({ error: { message: "Event not found" } });

const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ error: { message: "Database error" } });
};

// GET /events  (?category=Atölye isteğe bağlı)
export async function getEvents(req, res) {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const list = await Event.find(filter).sort({ date: 1 });
    res.json(list);
  } catch (err) {
    serverError(res, err);
  }
}

// GET /events/:id
export async function getEventById(req, res) {
  // Geçersiz biçimdeki id'ler (ör. "yok") veritabanına hiç sorulmaz.
  if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    serverError(res, err);
  }
}

// POST /events
export async function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } =
    req.body ?? {};

  if (!title || !category || !date) {
    return res.status(400).json({
      error: { message: "title, category and date are required" },
    });
  }

  try {
    const event = await Event.create({
      title,
      category,
      date,
      capacity,
      time,
      location,
      description,
    });
    res.status(201).json(event);
  } catch (err) {
    // Şema doğrulaması (ör. date biçimi, negatif capacity) → 400
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    serverError(res, err);
  }
}

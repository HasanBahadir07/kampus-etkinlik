import mongoose from "mongoose";
import Event from "../models/event-model.js";
import { todayStart } from "../utils/date.js";

// PATCH ile değiştirilemeyen alanlar
const KORUNAN_ALANLAR = ["_id", "createdAt", "updatedAt", "__v"];

// Aynı 404 tek yerde: getEventById, updateEvent, deleteEvent
function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

// Şema doğrulaması ya da tür dönüşümü (ör. yanlış tarih) hatası mı?
function isBadInput(err) {
  return err.name === "ValidationError" || err.name === "CastError";
}

// GET /events  (?search=atölye & ?category=Atölye isteğe bağlı)
export async function getEvents(req, res, next) {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) {
      // ( * ? gibi işaretler aramayı bozmasın
      const guvenli = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: guvenli, $options: "i" };
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/upcoming  → bugün ve sonrası, en yakın önce
export async function getUpcomingEvents(req, res, next) {
  try {
    const events = await Event.find({ date: { $gte: todayStart() } }).sort({
      date: 1,
      time: 1,
    });
    res.json(events);
  } catch (err) {
    next(err);
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    // Geçersiz biçimdeki id'ler (ör. "yok") veritabanına hiç sorulmaz.
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findById(req.params.id);
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
export async function createEvent(req, res, next) {
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
    if (isBadInput(err)) {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// PATCH /events/:id  → sadece gönderilen alanlar değişir
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }

    const korunan = Object.keys(body).filter((k) => KORUNAN_ALANLAR.includes(k));
    if (korunan.length > 0) {
      return res
        .status(400)
        .json({ error: { message: `${korunan.join(", ")} cannot be changed` } });
    }

    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after", // güncellenmiş kaydı döndür
      runValidators: true, // schema kuralları burada da çalışsın
    });
    if (!event) return notFound(res);
    res.json(event);
  } catch (err) {
    if (isBadInput(err)) {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// DELETE /events/:id  → 204, gövde yok
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return notFound(res); // ikinci silme de buraya
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

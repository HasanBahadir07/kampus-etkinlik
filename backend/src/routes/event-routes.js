import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getUpcomingEvents,
  updateEvent,
} from "../controllers/event-controller.js";

const router = Router();

// app.js'te "/events" öneki verildi; buradaki yollar onun devamı.
// Sabit adresler /:id'den ÖNCE: yoksa "upcoming" bir id sanılır → 404.
router.get("/", getEvents);
router.get("/upcoming", getUpcomingEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;

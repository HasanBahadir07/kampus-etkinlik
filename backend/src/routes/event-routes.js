import { Router } from "express";
import { getEvents, getEventById } from "../controllers/event-controller.js";

const router = Router();

// app.js'te "/events" öneki verildi; buradaki yollar onun devamı.
router.get("/", getEvents);
router.get("/:id", getEventById);

export default router;

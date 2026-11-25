import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // body → req.body

// Sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012017",
  });
});

app.use("/events", eventRoutes);

// Hiçbir route eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Controller'lardan next(err) ile gelen hatalar
app.use((err, req, res, next) => {
  // Bozuk JSON gövdesi gibi istemci hataları (express.json → 400)
  if (err.status && err.status < 500) {
    return res.status(err.status).json({ error: { message: err.message } });
  }
  console.error(err);
  res.status(500).json({ error: { message: "Database error" } });
});

export default app;

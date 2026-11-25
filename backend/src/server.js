import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Önce veritabanına bağlan, sonra istekleri kabul et.
try {
  await connectDB();
  app.listen(PORT, () => console.log(`API: http://localhost:${PORT}`));
} catch (err) {
  console.error("Veritabanına bağlanılamadı:", err.message);
  process.exit(1);
}

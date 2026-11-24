// Test verisini veritabanına yükler. Var olan etkinlikler silinip baştan eklenir.
//   npm run seed        → .env'deki MONGODB_URI (Atlas)
//   npm run seed:local  → mongodb://localhost:27017/kampus
import "dotenv/config";

if (process.argv.includes("--local")) {
  delete process.env.MONGODB_URI; // db.js yerel adrese düşer
}

const { connectDB, default: mongoose } = await import("../models/db.js");
const { default: Event } = await import("../models/event.js");
const { events } = await import("./events.js");

try {
  await connectDB();
  const docs = events.map(({ id, ...rest }) => rest); // eski "event-1" id'leri atılır
  const { deletedCount } = await Event.deleteMany({});
  const inserted = await Event.insertMany(docs);
  console.log(`${deletedCount} etkinlik silindi, ${inserted.length} etkinlik eklendi.`);
} catch (err) {
  console.error("Seed başarısız:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.connection.close();
}

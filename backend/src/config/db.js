import mongoose from "mongoose";

// Adres .env'deki MONGODB_URI'den gelir (Atlas). Yoksa yerel MongoDB kullanılır.
const LOCAL_URI = "mongodb://localhost:27017/kampus";
const dbURI = process.env.MONGODB_URI || LOCAL_URI;

// Kullanıcı adı ve şifre loglara yazılmasın diye adresten çıkarılır.
const safeURI = dbURI.replace(/\/\/[^@]*@/, "//***@");

// Bağlantı olayları
mongoose.connection.on("connected", () => {
  const where = dbURI === LOCAL_URI ? "yerel" : "Atlas";
  console.log(`MongoDB bağlandı (${where}): ${safeURI}`);
});
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose bağlantı hatası: ${err.message}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose bağlantısı kesildi");
});

// Uygulama kapanırken bağlantıyı düzgünce kapat.
async function shutdown(reason) {
  await mongoose.connection.close();
  console.log(`Mongoose bağlantısı kapatıldı (${reason})`);
  process.exit(0);
}
process.once("SIGINT", () => shutdown("uygulama durduruldu"));
process.once("SIGTERM", () => shutdown("uygulama sonlandırıldı"));

// Bağlantı uygulama başlarken bir kez açılır ve açık kalır.
export async function connectDB() {
  await mongoose.connect(dbURI);
}

export default mongoose;

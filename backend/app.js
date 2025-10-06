import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = 3001;

// 🔹 CORS ayarı (frontend portuna izin ver)
app.use(cors({ origin: "http://localhost:5173" }));

// 🔹 Routes
app.use("/products", productsRouter);

// 🔹 Sunucu başlat
app.listen(PORT, () =>
  console.log(`✅ Server çalışıyor: http://localhost:${PORT}`)
);

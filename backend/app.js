import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "https://firass-hossreh-homework.netlify.app" }));

app.use("/products", productsRouter);

app.listen(PORT, () =>
  console.log(`Server çalışıyor: http://localhost:${PORT}`)
);

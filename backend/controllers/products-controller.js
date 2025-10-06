import fs from "fs";
import path from "path";
import axios from "axios";

const getProductsData = () => {
  const filePath = path.join(process.cwd(), "data/products.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
};

export const getGoldPriceUSD = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://www.goldapi.io/api/XAU/USD",
      headers: {
        "x-access-token": "goldapi-q738vsmgeprkgz-io",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(options);
    const goldPriceUSD = parseFloat(response.data.price);
    const goldPricePerGram = goldPrice / 31.1035;

    console.log(goldPricePerGram);
    return goldPricePerGram;
  } catch (err) {
    console.error(
      "Altın fiyatı alınamadı, sabit değer kullanılıyor:",
      err.message
    );
    return 70;
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = getProductsData();
    const goldPrice = await getGoldPriceUSD();

    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

    let calculated = products.map(p => {
      const price = (p.popularityScore + 1) * p.weight * goldPrice;
      return {
        ...p,
        price: parseFloat(price.toFixed(2)),
      };
    });

    if (minPrice || maxPrice) {
      calculated = calculated.filter(
        p =>
          (!minPrice || p.price >= parseFloat(minPrice)) &&
          (!maxPrice || p.price <= parseFloat(maxPrice))
      );
    }

    if (minPopularity || maxPopularity) {
      calculated = calculated.filter(
        p =>
          (!minPopularity || p.popularityScore >= parseFloat(minPopularity)) &&
          (!maxPopularity || p.popularityScore <= parseFloat(maxPopularity))
      );
    }

    res.json({
      goldPriceUSD: goldPrice.toFixed(2),
      count: calculated.length,
      products: calculated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ürünler alınamadı" });
  }
};

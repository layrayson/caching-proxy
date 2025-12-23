import express from "express";
import { CacheManager } from "./cache";
import { HttpClient } from "./httpClient";
import { parseArgs } from "./cli";
const args = parseArgs();

const port = parseInt(args.port);
const originURL = args.origin;
const cacheManager = new CacheManager();
const httpClient = new HttpClient(originURL);
const app = express();

// Parse JSON request bodies
app.use(express.json());

app.use(async (req, res) => {
  const cacheKey = `${req.originalUrl}`;
  if (req.method === "GET") {
    const cachedData = cacheManager.get(cacheKey);
    if (cachedData) {
      res.set(cachedData.headers);
      res.setHeader("X-Cache", "HIT");
      return res.status(cachedData.statusCode).json(cachedData.data);
    }
  }
  try {
    const response = await httpClient.request(
      req.originalUrl,
      req.method,
      req.body,
      req.headers
    );
    if (req.method === "GET" && response.statusCode === 200) {
      cacheManager.set(
        cacheKey,
        response.data,
        response.headers,
        response.statusCode
      );
    }
    res.set(response.headers);
    res.setHeader("X-Cache", "MISS");
    res.status(response.statusCode).json(response.data);
    return;
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

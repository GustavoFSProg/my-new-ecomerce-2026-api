import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const { PORT } = process.env;

const api = express();

api.use(cors());
api.use(express.json());
api.use(routes);

api.listen(PORT, () => {
  return console.log(`Server is running on port: ${PORT}`);
});

export default api;

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
// middleware to log http request
import morgan from "morgan";
import path from "path";

/*Middleware Configurations*/

dotenv.config();
const app = express();
// built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
//  secure your Express app by setting various HTTP headers
app.use(helmet());
// This sets the Cross-Origin-Resource-Policy header,
// which controls the set of origins that are empowered to include images, scripts, styles or other resourc
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// The "common" argument specifies a predefined format for the log entries.
app.use(morgan("common"));
//middleware function parses incoming request bodies in JSON format

app.use(bodyParser.json());
//  middleware function parses incoming request bodies in URL-encoded format
// extended allows for choosing between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true)
app.use(bodyParser.urlencoded({ extended: false }));
//enables Cross-Origin Resource Sharing (CORS) with various options
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});


/* ROUTES */
import transactionRoutes from "./routes/transaction.js";
import portfolioRoutes from "./routes/portfolio.js";
import quoteRoutes from "./routes/quote.js";
import performanceRoutes from "./routes/performance.js";
import fundamentalRoutes from "./routes/fundamental.js";
import companyRoutes from "./routes/company.js";
import authRoutes from "./routes/auth.js";
/* Import Controllers and middleware */
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/verifyToken.js";

/* AUTH ROUTE */
app.post("/auth/register", register);
app.use("/auth", authRoutes)

/* GET ROUTE */
app.use(transactionRoutes);
app.use(portfolioRoutes);
app.use(quoteRoutes);
app.use(performanceRoutes);
app.use(fundamentalRoutes);
app.use(companyRoutes);

/* SET UP MONGOOSE */
const PORT = process.env.PORT || 9000;
const URI = process.env.MONGO_URL;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

import express, { Express, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes";
import { initBearerTokens } from "./utils/initializePartnerAPIAuth";

const app: Express = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5173",
      "http://localhost:5173",
      "http://localhost:5173",
      "http://192.168.29.74:5173",
    ],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// const limiter = rateLimit({
//     max: 3000,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many Requests from this IP, please try again in an hour!',
// });
// app.use('/vikas', limiter);

app.use(express.urlencoded({ extended: true }));

app.use("/static", (req, res, next) => {
  // Set the desired response headers
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // Example cache control header
  // Call next() to pass control to the next middleware or route handler
  next();
});
app.use("/static", express.static("static"));
// app.use(mongoSanitize());

// app.use(xss())

initBearerTokens();

app.use(router);

export default app;

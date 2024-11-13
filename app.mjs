import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {fileURLToPath} from "url";
import indexRouter from "./routes/index.mjs";
import ownersRouter from "./routes/owners.mjs";
import connect from "./db/connectDB.mjs";


const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file;
const __dirname = path.dirname(__filename); // get the name of the directory
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


connect() // Connect to MongoDB database
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use('/owners', ownersRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
export default app;

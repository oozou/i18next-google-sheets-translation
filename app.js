const express = require("express");
const createError = require("http-errors");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");

const indexRouter = require("./routes/index");
const localeRouter = require("./routes/locale");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(i18nextMiddleware.handle(i18next));

/**
 * Webhook to refresh the locales without reloading the app
 */
app.get("/reload-locales", (req, res) => {
  // TODO: Trigger this route using Google Sheets API
  // code using a button when translations are updated
  i18next.reloadResources();
  res.status(200).json({ message: "SUCCESS_REFRESH_LOCALES" });
});

app.use("/", indexRouter);
app.use("/locales", localeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

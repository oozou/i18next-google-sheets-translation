const express = require("express");
const createError = require("http-errors");
const path = require("path");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-http-backend");

const indexRouter = require("./routes/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

// app.use("/locales", express.static("locales"));
app.get("/locales/:lng/:ns.json", async (req, res) => {
  const { lng, ns } = req.params;
  console.log({ lng, ns });
  res.status(200).json({ hello: "sawastdee" });
});

app.use(i18nextMiddleware.handle(i18next));
app.use("/", indexRouter);

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

app.listen(3000, () => console.log("listening on port 3000"));

i18next.use(Backend).init(
  {
    lng: "en",
    fallbackLng: "en",
    preload: ["en"],
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "http://localhost:3000/locales/{{lng}}/{{ns}}.json",
      reloadInterval: 60 * 60 * 1000, // fetch every 60 minute
    },
  },
  (err, t) => {
    if (err) return console.error(err);
    console.log(t("hello"));
    console.log(t("hello", { lng: "en" }));
  }
);

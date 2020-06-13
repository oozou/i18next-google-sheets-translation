const i18next = require("i18next");
const Backend = require("i18next-http-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const app = require("./app");
const config = require("./config");

const { port, host } = config.app;

function init() {
  i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init(
      {
        lng: "th",
        fallbackLng: "th",
        preload: ["en", "th"],
        ns: ["translation"],
        defaultNS: "translation",
        backend: config.localeOptions,
        lookupQuerystring: "lng",
        detection: {},
      },
      (err, t) => {
        if (err) return console.error(err);
        // console.log(t("hello"));
        // console.log(t("hello", { lng: "en" }));
      }
    );
}

app.listen(port, host, () => {
  console.log(`URL: http://${host}:${port}`);
  init();
});

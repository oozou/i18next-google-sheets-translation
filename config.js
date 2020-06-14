require("dotenv").config();

const app = {
  port: process.env.APP_PORT,
  host: process.env.APP_HOST,
  googleApiEnabled: String(true) === process.env.GOOGLE_API_ENABLED,
};

const options = {
  spreadsheetId: process.env.SPREADSHEET_ID,
  range: process.env.TRANSLATION_CELL_RANGE,
};

const localeOptions = {
  loadPath: `
    http://${app.host}:${app.port}/locales/{{lng}}/{{ns}}.json
  `,
  reloadInterval: 60 * 60 * 1000, // fetch every 60 minute
};

const config = {
  app,
  keys: require("./keys.json"),
  options,
  localeOptions,
};

module.exports = config;

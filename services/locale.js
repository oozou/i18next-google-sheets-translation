const { google } = require("googleapis");

class LocaleService {
  constructor(keys, options) {
    this.client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    this.gsapi = google.sheets({ version: "v4", auth: this.client });
    this.options = options;

    this.authorized = false;
  }

  getAll = async () => {
    const {
      data: { values },
    } = await this.gsapi.spreadsheets.values.get(this.options);

    // first row is column names [key, en, th]
    const [_, ...valuesWithoutKey] = values;
    const translationMap = {
      en: 1,
      th: 2,
    };
    const translations = (col) =>
      valuesWithoutKey.reduce(
        (acc, v) => ({
          ...acc,
          [v[0]]: v[col],
        }),
        {}
      );

    const translationsEn = translations(translationMap.en);
    const translationsTh = translations(translationMap.th);
    return { translationsEn, translationsTh };
  };

  authorize = async () => {
    return new Promise((resolve, reject) => {
      this.client.authorize((err, tokens) => {
        if (err) {
          this.authorized = false;
          reject(err);
          return;
        }

        this.authorized = true;
        resolve();
      });
    });
  };

  run = async () => {
    try {
      if (!this.authorized) {
        await this.authorize();
        // TODO: Resolve simultaneous access issue
        // Because of i18next preloading ["en", "th"]
        // at the same time while init process
        // SOLUTION: mutex on authorized variable
        console.log("GOOGLE_API_SUCCESS");
      }

      return await this.getAll();
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = LocaleService;

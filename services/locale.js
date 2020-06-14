class LocaleService {
  constructor(client, gsapi, options) {
    this.client = client;
    this.gsapi = gsapi;
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

  run = async () => {
    try {
      if (!this.authorized) {
        this.authorized = await this.client.authorize();
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

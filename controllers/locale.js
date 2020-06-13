class LocaleController {
  constructor(localeService) {
    this.localeService = localeService;
  }

  getAll = async (req, res) => {
    const { lng } = req.params;

    const { translationsEn, translationsTh } = await this.localeService.run();

    if (lng.startsWith("en")) {
      res.status(200).json(translationsEn);
      return;
    }

    // default to thai
    res.status(200).json(translationsTh);
  };
}

module.exports = LocaleController;

const express = require("express");
const config = require("../config");
const LocaleController = require("../controllers/locale");
const LocaleService = require("../services/locale");

class MockLocaleService {
  async run() {
    const translationsEn = {
      hello: "hello world",
    };
    const translationsTh = {
      hello: "สวัสดี",
    };
    return { translationsEn, translationsTh };
  }
}

let localeService;
if (config.app.googleApiEnabled) {
  localeService = new LocaleService(config.keys, config.options);
} else {
  localeService = new MockLocaleService();
}

const localeController = new LocaleController(localeService);

const router = express.Router();

router.get("/:lng/:ns.json", localeController.getAll);

module.exports = router;

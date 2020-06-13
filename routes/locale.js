const express = require("express");
const config = require("../config");
const LocaleController = require("../controllers/locale");
const LocaleService = require("../services/locale");

const localeService = new LocaleService(config.keys, config.options);
const localeController = new LocaleController(localeService);

const router = express.Router();

router.get("/:lng/:ns.json", localeController.getAll);

module.exports = router;

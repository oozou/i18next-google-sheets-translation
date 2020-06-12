const express = require("express");

const router = express.Router();

class IndexController {
  static list(req, res, next) {
    const lng = req.language;
    const lngs = req.languages;

    req.i18n.changeLanguage("en");
    console.log({ lng, lngs });

    const exists = req.i18n.exists("hello");
    const translation = req.t("hello");
    console.log({ exists, translation });
    res.render("index", { title: "Express" });
  }
}

router.get("/", IndexController.list);

module.exports = router;

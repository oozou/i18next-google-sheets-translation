const express = require("express");

const router = express.Router();

class HomeController {
  list = (req, res) => {
    const lng = req.language;
    const exists = req.i18n.exists("headline");

    if (!exists) {
      // handle missing translations
      res.render("error");
      return;
    }

    const viewData = {
      headline: req.t("headline", { lng }),
      email: req.t("email", { lng }),
      emailPlaceholder: req.t("emailPlaceholder", { lng }),
      password: req.t("password", { lng }),
      passwordPlaceholder: req.t("passwordPlaceholder", { lng }),
      signin: req.t("signin", { lng }),
    };

    res.render("home", viewData);
  };
}

const homeController = new HomeController();

router.get("/", homeController.list);

module.exports = router;

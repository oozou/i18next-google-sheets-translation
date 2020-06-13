const express = require("express");

const router = express.Router();

class HomeController {
  list = (req, res) => {
    const lng = req.language;
    const exists = req.i18n.exists("hello");

    if (!exists) {
      res.render("home", { hello: "hello" });
      return;
    }

    res.render("home", { hello: req.t("hello", { lng }) });
  };
}

const homeController = new HomeController();

router.get("/", homeController.list);

module.exports = router;

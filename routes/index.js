const express = require("express");

const router = express.Router();

class IndexController {
  list = (req, res) => {
    const lng = req.language;
    const exists = req.i18n.exists("hello");

    if (!exists) {
      res.render("index", { hello: "hello" });
      return;
    }

    res.render("index", { hello: req.t("hello", { lng }) });
  };
}

const indexController = new IndexController();

router.get("/", indexController.list);

module.exports = router;

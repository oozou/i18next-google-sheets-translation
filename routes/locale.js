const express = require("express");
const config = require("../config");
const LocaleController = require("../controllers/locale");
const LocaleService = require("../services/locale");

class MockLocaleService {
  async run() {
    const translationsEn = {
      headline: "Login for more convenient shopping",
      email: "Email or Mobile Number",
      emailPlaceholder: "Enter your email or mobile number",
      password: "Password",
      passwordPlaceholder: "password",
      signin: "Sign in",
    };
    const translationsTh = {
      headline: "เข้าสู่ระบบเพื่อการช้อปที่สะดวกยิ่งขึ้น",
      email: "อีเมลหรือเบอร์โทรศัพท์",
      emailPlaceholder: "กรอกอีเมลหรือเบอร์โทรศัพท์",
      password: "รหัสผ่าน",
      passwordPlaceholder: "รหัสผ่าน",
      signin: "เข้าสู่ระบบ",
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

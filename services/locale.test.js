const LocaleService = require("./locale");
const config = require("../config");

jest.mock("googleapis", () => {
  return {
    google: {
      sheets: () => ({}),
    },
  };
});

const gsapi = {
  spreadsheets: {
    values: {
      get: jest.fn(() => ({
        data: {
          values: [
            ["key", "en", "th"],
            [
              "headline",
              "Login for more convenient shopping",
              "เข้าสู่ระบบเพื่อการช้อปที่สะดวกยิ่งขึ้น",
            ],
          ],
        },
      })),
    },
  },
};
// const authorize = jest.fn(() => {
//   throw new Error("google api quota exceeded");
// });
const authorize = jest.fn(() => true);

describe("LocaleService", () => {
  it("initializes correctly", async () => {
    const localeService = new LocaleService(
      { authorize },
      gsapi,
      config.options
    );
    expect(localeService).toBeDefined();
  });

  it("maps the translations to valid translation object", async () => {
    const localeService = new LocaleService(
      { authorize },
      gsapi,
      config.options
    );
    const { translationsTh, translationsEn } = await localeService.run();
    expect(translationsEn).toEqual({
      headline: "Login for more convenient shopping",
    });
    expect(translationsTh).toEqual({
      headline: "เข้าสู่ระบบเพื่อการช้อปที่สะดวกยิ่งขึ้น",
    });
  });
});

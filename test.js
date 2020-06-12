const { google } = require("googleapis");
const keys = require("./keys.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

client.authorize(function (err, tokens) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("connected");
    gsrun(client);
  }
});

async function gsrun(client) {
  const gsapi = google.sheets({ version: "v4", auth: client });
  const opt = {
    spreadsheetId: "1N-kBKw7sjB4--NcIxWo5mlscdVAl3Vb5IRY9BVvW13U",
    range: "B2:D3",
  };

  const {
    data: { values },
  } = await gsapi.spreadsheets.values.get(opt);
  const [keys, ...valuesWithoutKey] = values;
  const translations = valuesWithoutKey.map((v) => ({
    [keys[0]]: v[0],
    [keys[1]]: v[1],
    [keys[2]]: v[2],
  }));
  console.log(translations);
}

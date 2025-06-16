const axios = require("axios");
const fs = require("fs");

async function fetchRates() {
  try {
    const { data } = await axios.get("https://query1.finance.yahoo.com/v8/finance/chart/ZQ=F?interval=1d");
    const prices = data.chart.result[0].indicators.adjclose[0].adjclose;
    const latest = +(100 - prices[prices.length - 1]).toFixed(2);

    const output = [{
      label: "Implied Rate (Front Month)",
      date: new Date().toISOString().split("T")[0],
      rate: latest
    }];

    fs.writeFileSync("fed_forecast.json", JSON.stringify(output, null, 2));
    console.log("✔ Forecast saved to fed_forecast.json");
  } catch (e) {
    console.error("❌ Error fetching rates:", e.message);
  }
}

fetchRates();

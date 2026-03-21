// cron/pingServer.js

const cron = require("node-cron");
const axios = require("axios");

const SERVER_URL = "https://api.thinknorder.in";

function startPingJob() {
  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await axios.get(SERVER_URL, {
        timeout: 5000,
      });

      console.log(`[CRON] Ping success: ${res.status} at ${new Date().toISOString()}`);
    } catch (error) {
      console.error(`[CRON] Ping failed: ${error.message}`);
    }
  });
}

module.exports = startPingJob;
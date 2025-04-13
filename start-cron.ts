import { AppDataSource } from "./src/config/data-source";
import { reportQueue } from "./src/module/bullMQ/report.queue";

async function main() {
  await AppDataSource.initialize();

  setInterval(async () => {
    console.log("⏱️ Running scheduled report job...");
    await reportQueue.add("generate-report", {});
  }, parseInt(process.env.SCHEDULER_INTERVAL ?? "60000")); // Default to 60 seconds if not set

  console.log("🕒 Scheduler running...");
}

main().catch((err) => {
  console.error("❌ Scheduler crashed:", err);
});

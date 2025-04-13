import { connection } from "./src/config/redis";
import { Worker, WorkerOptions } from "bullmq";
import { AppDataSource } from "./src/config/data-source";
import ReportService from "./src/module/report/report.service";

const workerOptions: WorkerOptions = {
  connection,
};
AppDataSource.initialize();

const worker = new Worker(
  "report",
  async (job) => {
    console.log("Processing job:", job.id);
    await ReportService.generateReport();
    console.log("Job completed:", job.id);
    return { status: "done" };
  },
  workerOptions
);

// When worker ready, log a message
worker.on("ready", () => {
  console.log("✅ Worker has started and is ready to process jobs.");
});

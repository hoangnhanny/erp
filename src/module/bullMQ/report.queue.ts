import { Queue } from "bullmq";
import { connection } from "../../config/redis";

export const reportQueue = new Queue("report", { connection: connection });

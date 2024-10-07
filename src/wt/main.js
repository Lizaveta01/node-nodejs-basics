import { cpus } from "os";
import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import * as path from "path";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerPath = path.join(__dirname, "worker.js");

const performCalculations = async () => {
    const numbOfCPU = cpus();
    let i = 10;

    const workerArray = numbOfCPU.map((cpu) => {
        return new Promise((res, rej) => {
        const worker = new Worker(workerPath, { workerData: i++ });
        worker.on("message", res);
        worker.on("error", rej);
        });
    });

    const result = await Promise.all(workerArray);
    console.log(result);
};

await performCalculations();
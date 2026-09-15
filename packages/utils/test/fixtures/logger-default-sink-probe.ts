import * as fs from "node:fs";
import { getLogsDir, logger } from "../../src/index";

const reportPath = process.argv[2];
if (!reportPath) throw new Error("expected report path");

// Deliberately no `setTransports` call: the default file sink has to resolve its
// own directory, which is what the parent test asserts on.
logger.info("logger-default-sink-probe");

const logsDir = getLogsDir();
const files = fs.existsSync(logsDir) ? fs.readdirSync(logsDir).sort() : [];
fs.writeFileSync(reportPath, JSON.stringify({ logsDir, files }));

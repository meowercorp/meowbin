import fs from "node:fs/promises";
import path from "node:path";
import CONFIG from "../config";
import { sleep } from "bun";
import { Logger } from "./logger";

/**
 * Task to prune all expired pastes
 * @param {number} timeToWait - Amount of ms to sleep between each paste
 * @returns {Promise<boolean>} - Returns true if successful
 * @throws
 */
export async function prunePastes(timeToWait: number): Promise<boolean> {
  const logger = new Logger("prune");
  const pastes = await fs.readdir(CONFIG.PASTE_PATH);
  const time = new Date().getTime();
  const pruneTime = time + CONFIG.MAX_PRUNE_TIME;
  let prunedTotal = 0;
  for (const paste of pastes) {
    const pastePath = path.join(CONFIG.PASTE_PATH, paste);
    const stats = await fs.stat(pastePath);
    if (stats.ctimeMs > pruneTime) {
      const file = Bun.file(pastePath);
      try {
        await file.unlink();
        prunedTotal += 1;
      } catch (e) {
        logger.error(e);
      }
    }
    await sleep(timeToWait);
  }
  logger.log("Pruned", prunedTotal, "pastes");
  return true;
}

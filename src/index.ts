import CONFIG from "./config";
import { PasteData } from "./paste";
import { prunePastes } from "./utils/cron";
import Elysia, { t } from "elysia";
import { Logger } from "./utils/logger";

const logger = new Logger("backend");

// i dont want to redo the part where i make the folders for the fourth time today. ill leave it for later.

if (!CONFIG.DISABLE_PRUNE) {
  await prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  Bun.cron("@midnight", () => {
    prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  });
}

// to make it more unified, its only POST to one endpoint to retrieve paste
// this is both (maybe) better privacy + allows for easy password protected pastes
const api = new Elysia({ prefix: "/api" }).post(
  "/p/:id",
  async ({ body, set, params: { id } }) => {
    // i cant be bothered to finish this for the third time
    const paste = await PasteData.fromFile(id);
    return PasteData.strip(paste);
  },
  { params: t.Object({ id: t.String() }) },
);
// also add a .post for making a new paste

api.listen(3001);

import CONFIG from "./config";
import { PasteData } from "./paste";
import { prunePastes } from "./utils/cron";
import Elysia, { t } from "elysia";

const logger = new Logger("backend");

if (!CONFIG.DISABLE_PRUNE) {
  await prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  Bun.cron("@midnight", () => {
    prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  });
}

const api = new Elysia({ prefix: "/api" }).get(
  "/p/:id",
  async ({ params: { id } }) => {
    try {
      const paste = await PasteData.fromFile(id);
      return paste;
    } catch (e) {
      // something that shows the error to the client
    }
  },
  { params: { id: t.String() } },
);

import { exit } from "node:process";
import fs from "node:fs/promises";
import { randomBytes } from "node:crypto";
import Elysia, { t } from "elysia";
import CONFIG from "./config";
import { Logger } from "./utils/logger";
import { Paste, PasteData } from "./paste";
import { PasteExistsError } from "./types";
import { prunePastes } from "./utils/cron";

const logger = new Logger("backend");

if (!(await fs.exists(CONFIG.BASE_PATH))) {
  logger.log("BASE_PATH does not exist");
  try {
    await fs.mkdir(CONFIG.BASE_PATH, { recursive: true });
  } catch (e) {
    logger.error(e);
    exit(1);
  }
  logger.log("Created BASE_PATH");
}
if (!(await fs.exists(CONFIG.PASTE_PATH))) {
  logger.log("PASTE_PATH does not exist");
  try {
    await fs.mkdir(CONFIG.PASTE_PATH, { recursive: true });
  } catch (e) {
    logger.error(e);
    exit(1);
  }
  logger.log("Created PASTE_PATH");
}

if (!CONFIG.DISABLE_PRUNE) {
  await prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  Bun.cron("@midnight", () => {
    prunePastes(CONFIG.PRUNE_TIME_TO_WAIT);
  });
}

// to make it more unified, its only POST to one endpoint to retrieve paste
// this is both (maybe) better privacy + allows for easy password protected pastes
const api = new Elysia({ prefix: "/api" })
  .onRequest(({ request }) => {
    logger.debug(request);
  })
  .post(
    "/p/:id",
    async ({ set, body, params: { id } }) => {
      try {
        const paste = await PasteData.fromFile(id);
        if (paste.password) {
          if (paste.password === body) {
            if (paste.burnOnRead) {
              await new Paste(paste).delete();
            }
            return PasteData.strip(paste);
          } else {
            set.status = "Unauthorized";
            return { error: "Invalid password" };
          }
        }
      } catch (e) {
        set.status = "Not Found";
        return { error: "Paste does not exist" };
      }
    },
    {
      body: t.String(),
      params: t.Object({ id: t.String() }),
    },
  )
  .post(
    "/n/:id?",
    async ({ set, body, params: { id } }) => {
      // move all of these horrifying checks elsewhere.
      if (id && CONFIG.DISABLE_CUSTOM_IDS) {
        set.status = "Bad Request";
        return { error: "Custom IDs have been disabled on this server" };
      }
      if (id && id.length > CONFIG.MAX_CUSTOM_ID_LENGTH) {
        set.status = "Bad Request";
        return { error: "Custom ID exceeds allowed max length" };
      }
      if (body.password && CONFIG.DISABLE_PASSWORDS) {
        set.status = "Bad Request";
        return {
          error: "Password-protected pastes have been disabled on this server",
        };
      }
      if (body.burnOnRead && CONFIG.DISABLE_BURN_ON_READ) {
        set.status = "Bad Request";
        return {
          error: "Burn on read has been disabled on this server",
        };
      }
      const data = {
        ...body,
        id: id || randomBytes(32).toHex(),
        timestamp: Date.now(),
      };
      const pasteData = new PasteData(data);
      const paste = new Paste(pasteData);
      try {
        await paste.save();
        set.status = "Created";
        return { id: paste.id, timestamp: paste.timestamp };
      } catch (e) {
        if (e instanceof PasteExistsError) {
          set.status = "Conflict";
          return { error: "Paste already exists" };
        }
        throw e;
      }
    },
    {
      body: t.Object({
        message: t.String(),
        title: t.Optional(t.String()),
        encrypted: t.Optional(t.Boolean()),
        password: t.Optional(t.String()),
        burnOnRead: t.Optional(t.Boolean()),
      }),
      params: t.Object({
        id: t.Optional(t.String()),
      }),
    },
  );

api.listen(3001);

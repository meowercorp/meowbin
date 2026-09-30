import path from "node:path";
import os from "node:os";

const CONFIG = {
  BASE_PATH:
    Bun.env.BASE_PATH ||
    path.join(os.homedir(), ".config", "meowercorp", "meowbin"),
  PASTE_PATH: Bun.env.PASTE_PATH || "",
  DISABLE_PRUNE:
    Bun.env.DISABLE_PRUNE && Bun.env.DISABLE_PRUNE.toLowerCase() === "true"
      ? true
      : false,
  MAX_PRUNE_TIME: Number(Bun.env.MAX_PRUNE_TIME) || 7 * 24 * 60 * 60 * 1000,
  PRUNE_TIME_TO_WAIT: Number(Bun.env.PRUNE_TIME_TO_WAIT) || 1000,
};

CONFIG.PASTE_PATH = CONFIG.PASTE_PATH || path.join(CONFIG.BASE_PATH, "data");

export default CONFIG;

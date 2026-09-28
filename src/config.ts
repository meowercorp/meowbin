import path from "node:path";
import fs from "node:fs/promises";
import os from "node:os";

const CONFIG = {
  BASE_PATH:
    Bun.env.BASE_PATH ||
    path.join(os.homedir(), ".config", "meowercorp", "meowbin"),
  PASTE_PATH: Bun.env.PASTE_PATH || "",
};

CONFIG.PASTE_PATH = CONFIG.PASTE_PATH || path.join(CONFIG.BASE_PATH, "data");

export default CONFIG;

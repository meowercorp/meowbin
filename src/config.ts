import path from "node:path";
import os from "node:os";

// i dont know what to name this
// but it returns if its true and real and factual
// basically equiv. to env === "true" ? true : false (default false)
function factual(env?: string): boolean {
  if (env && env.toLowerCase() === "true") {
    return true;
  }
  return false;
}

const CONFIG = {
  // FILE PATHS
  BASE_PATH:
    Bun.env.BASE_PATH ||
    path.join(os.homedir(), ".config", "meowercorp", "meowbin"),
  PASTE_PATH: Bun.env.PASTE_PATH || "",
  // PRUNE FLAGS
  DISABLE_PRUNE: factual(Bun.env.DISABLE_PRUNE),
  /** Amount of time (ms) until pastes expire and are eligible for pruning */
  MAX_PRUNE_TIME: Number(Bun.env.MAX_PRUNE_TIME) || 7 * 24 * 60 * 60 * 1000,
  PRUNE_TIME_TO_WAIT: Number(Bun.env.PRUNE_TIME_TO_WAIT) || 1000,
  // FFLAGS
  /** Disable uploading encrypted pastes */
  DISABLE_ENCRYPTION: factual(Bun.env.DISABLE_ENCRYPTION),
  /** Force uploading encrypted pastes */
  FORCE_ENCRYPTION: factual(Bun.env.FORCE_ENCRYPTION),
  /**
   * Disable password-protected pastes
   *
   * With {@link CONFIG.FORCE_ENCRYPTION}, all pastes require a hash (key) anyways, so it's slightly less important.
   */
  DISABLE_PASSWORDS: factual(Bun.env.DISABLE_PASSWORDS),
  /** Disable creating pastes with custom IDs */
  DISABLE_CUSTOM_IDS: factual(Bun.env.DISABLE_CUSTOM_IDS),
  /**
   * Set maximum custom ID length.
   *
   * NOTE: The default random ID generator is 64 characters (32 random bytes to hex)
   */
  MAX_CUSTOM_ID_LENGTH: Number(Bun.env.MAX_CUSTOM_ID_LENGTH) || 64,
  /** Disable Burn on Read (prune after fetch) */
  DISABLE_BURN_ON_READ: factual(Bun.env.DISABLE_BURN_ON_READ),
};

CONFIG.PASTE_PATH = CONFIG.PASTE_PATH || path.join(CONFIG.BASE_PATH, "data");

export default CONFIG;

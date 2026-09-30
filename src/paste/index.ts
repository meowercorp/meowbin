import path from "node:path";

import CONFIG from "../config";
import {
  EmptyPasswordError,
  PasteExistsError,
  PasteExpiredError,
  PasteNotFoundError,
} from "../types";
import { BunFile } from "bun";

/**
 * Data for paste. Do not extend with extra methods.
 */
export class PasteData {
  id: string;
  title?: string;
  timestamp: number;
  encrypted?: boolean;
  message: string;
  password?: string;

  constructor(data: PasteData, id?: string) {
    this.id = data.id ?? id;
    this.title = data.title;
    this.timestamp = data.timestamp;
    this.encrypted = data.encrypted;
    this.message = data.message;
    this.password = data.password;
  }

  static async fromFile(id: string) {
    const file = Bun.file(path.join(CONFIG.PASTE_PATH, id));
    if (!(await file.exists())) {
      throw PasteNotFoundError;
    }
    const json = (await file.json()) as PasteData;
    if (Date.now() > json.timestamp + CONFIG.MAX_PRUNE_TIME) {
      throw PasteExpiredError;
    }
    return new PasteData(json);
  }
}

/**
 * Interactive wrapper for {@link PasteData}
 */
export class Paste extends PasteData {
  file: BunFile;

  constructor(data: PasteData, id?: string) {
    super(data, id);

    this.file = this.getPasteFile();
  }

  static async fromFile(id: string) {
    return new Paste(await PasteData.fromFile(id));
  }

  getPasteFile() {
    return Bun.file(path.join(CONFIG.PASTE_PATH, this.id));
  }

  toPasteData() {
    const data: PasteData = {
      id: this.id,
      title: this.title,
      timestamp: this.timestamp,
      encrypted: this.encrypted,
      message: this.message,
      password: this.password,
    };
    return data;
  }
  async getMessage(password?: string) {
    // decrypt client side later lol
    if (!this.password) {
      return this.message;
    }
    if (this.password) {
      if (password) {
        const hash = await Bun.password.hash(password);
        if (hash == this.password) {
          return this.message;
        }
      } else {
        throw EmptyPasswordError;
      }
    }
  }

  async save() {
    // make pastes immutable, i guess
    if (await this.file.exists()) {
      throw PasteExistsError;
    }
    const data = this.toPasteData();
    await this.file.write(JSON.stringify(data));
  }

  async delete() {
    if (!(await this.file.exists())) {
      throw PasteNotFoundError;
    }
    try {
      await this.file.unlink();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

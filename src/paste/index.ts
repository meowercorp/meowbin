import path from "node:path";

import CONFIG from "../config";
import { PasteExistsError } from "../types";
import { BunFile } from "bun";

export class PasteData {
  id: string;
  title?: string;
  timestamp: number;
  encrypted?: boolean;
  message: string;

  constructor(data: PasteData, id?: string) {
    this.id = data.id ?? id;
    this.title = data.title;
    this.timestamp = data.timestamp;
    this.encrypted = data.encrypted;
    this.message = data.message;
  }
}

export class Paste extends PasteData {
  file?: BunFile;

  constructor(data: PasteData, id?: string) {
    super(data, id)
    
    this.file = this.getPasteFile();
  }

  getPasteFile() {
    return Bun.file(path.join(CONFIG.PASTE_PATH, this.id))
  }

  getMessage() {
    // decrypt client side later lol
    return this.message;
  }

  async save() {
    const data: PasteData = {
      id: this.id,
      title: this.title,
      timestamp: this.timestamp,
      encrypted: this.encrypted,
      message: this.message,
    };
    await this.file!.write(JSON.stringify(data));
  }
}

export async function setPaste(paste: Paste): Promise<boolean> {
  const file = Bun.file(path.join(CONFIG.PASTE_PATH, paste.id));
  if (await file.exists()) {
    throw PasteExistsError;
  }
  try {
    file.write(JSON.stringify(paste));
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

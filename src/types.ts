export class MeowbinError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MeowbinError";
  }
}

export class PasteNotFoundError extends MeowbinError {
  constructor(message: string) {
    super(message);
    this.name = "PasteNotFoundError";
  }
}

export class PasteExistsError extends MeowbinError {
  constructor(message: string) {
    super(message);
    this.name = "PasteExistsError";
  }
}

export class EmptyPasswordError extends MeowbinError {
  constructor(message: string) {
    super(message);
    this.name = "EmptyPasswordError";
  }
}

export class PasteExpiredError extends MeowbinError {
  constructor(message: string) {
    super(message);
    this.name = "PasteExpiredError";
  }
}

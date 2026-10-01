export class MeowbinError extends Error {
  constructor(message?: string) {
    super(message || "Unspecified MeowbinError");
    this.name = "MeowbinError";
  }
}

export class PasteNotFoundError extends MeowbinError {
  constructor(message?: string) {
    super(message || "Paste does not exist");
    this.name = "PasteNotFoundError";
  }
}

export class PasteExistsError extends MeowbinError {
  constructor(message?: string) {
    super(message || "Paste already exists");
    this.name = "PasteExistsError";
  }
}

export class EmptyPasswordError extends MeowbinError {
  constructor(message?: string) {
    super(message || "Password not provided");
    this.name = "EmptyPasswordError";
  }
}

export class PasteExpiredError extends MeowbinError {
  constructor(message?: string) {
    super(message || "Paste already expired");
    this.name = "PasteExpiredError";
  }
}

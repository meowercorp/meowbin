export class Logger {
  name: string;
  constructor(name?: string) {
    this.name = name ? "[" + name + "] " : "";
  }

  debug(...data: any[]) {
    console.debug(new Date().toISOString(), this.name, ...data);
  }

  trace(...data: any[]) {
    console.trace(new Date().toISOString(), this.name, ...data);
  }

  log(...data: any[]) {
    console.log(new Date().toISOString(), this.name, ...data);
  }

  warn(...data: any[]) {
    console.warn(new Date().toISOString(), this.name, ...data);
  }

  error(...data: any[]) {
    console.error(new Date().toISOString(), this.name, ...data);
  }
}

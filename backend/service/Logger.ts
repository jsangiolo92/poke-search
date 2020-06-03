import winston, { format } from "winston";

export class Logger {
  private logger: any;
  constructor() {
    if (process.env.NODE_ENV === "development") {
      this.logger = console;
    } else {
      this.logger = winston.createLogger({
        level: "info",
        format: format.combine(
          format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          format.json(),
        ),
        transports: [new winston.transports.Console()],
      });
    }
  }

  public log = (message: any) => {
    this.logger.log("info", message);
  };

  public error = (message: string) => {
    this.logger.log("error", message);
  };
}

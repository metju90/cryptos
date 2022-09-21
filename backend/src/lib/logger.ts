import bunyan from "bunyan";

const logger = bunyan.createLogger({
  name: "exchange-query",
  level: "debug"
});

export default logger;

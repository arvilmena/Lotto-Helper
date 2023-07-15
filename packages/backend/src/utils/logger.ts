import { WinstonTransport as AxiomTransport } from '@axiomhq/axiom-node';
import winston from 'winston';

const axiomTransport = new AxiomTransport();
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [axiomTransport],
  exceptionHandlers: [axiomTransport],
  rejectionHandlers: [axiomTransport],
});

// Add the console logger if we're not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export { logger };

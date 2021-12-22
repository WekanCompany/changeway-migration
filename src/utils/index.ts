import util from 'util';
import winston from 'winston';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${new Date(timestamp).toISOString()} ${level}: ${message}`;
});

export function initLogger(path: string): winston.Logger {
    return winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.prettyPrint(),
            customFormat
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: path }),
        ],
    });
}

export function expandObject(obj: Object) {
    return util.inspect(obj, false, null, true);
}
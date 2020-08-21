import winston from 'winston';
import appRoot from 'app-root-path';
import { formatISO } from 'date-fns';

const appendIsoDate = () => {
    const isoformat = formatISO(new Date(), {
        format: 'extended',
        representation: 'complete',
    });
    return isoformat.toString();
};

const options = {
    alllog: {
        filename: `${appRoot}/winston-logs/logs/applog.log`,
        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp({ format: appendIsoDate }),
            winston.format.colorize(),
            winston.format.json(),
        ),
    },
    errorlog: {
        filename: `${appRoot}/winston-logs/logs/app-error.log`,
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp({ format: appendIsoDate }),
            winston.format.colorize(),
            winston.format.json(),
        ),
    },
    warnlog: {
        filename: `${appRoot}/winston-logs/logs/app-warn.log`,
        level: 'warn',
        format: winston.format.combine(
            winston.format.timestamp({ format: appendIsoDate }),
            winston.format.colorize(),
            winston.format.json(),
        ),
    },
    httplog: {
        level: 'verbose',
        format: winston.format.combine(
            winston.format.timestamp({ format: appendIsoDate }),
            winston.format.colorize(),
            winston.format.json(),
        ),
    },
    console: {
        level: 'debug',
        format: winston.format.combine(
            winston.format.timestamp({ format: appendIsoDate }),
            winston.format.colorize(),
            winston.format.simple(),
        ),
    },
    rejection: {
        filename: `${appRoot}/winston-logs/logs/app-rejection.log`,
    },
};

const loggerWinston = winston.createLogger({
    transports: [
        new winston.transports.File(options.alllog),
        new winston.transports.File(options.errorlog),
        new winston.transports.File(options.warnlog),
        new winston.transports.Http(options.httplog),
        new winston.transports.Console(options.console),
    ],
    rejectionHandlers: [new winston.transports.File(options.rejection)],
    exitOnError: false,
});

loggerWinston.stream = {
    write(message) {
        loggerWinston.info(message);
    },
};

export default loggerWinston;

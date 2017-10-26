const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            prettyPrint: true,
        }),
    ],
});

const BREAK_LINE_LENGTH = 50;

class LoggerClass {

    info(...args) {
        return this._log('info', [...args]);
    }

    warn(...args) {
        return this._log('warn', [...args]);
    }

    error(...args) {
        return this._log('error', [...args]);
    }

    profile(id) {
        logger.profile(id);

        return this;
    }

    break(char) {
        this.info(new Array(BREAK_LINE_LENGTH).join(char || '='));

        return this;
    }

    _log(level, params) {
        logger[level].apply(null, params);

        return this;
    }
}

module.exports = function Logger() {
    return new LoggerClass();
};

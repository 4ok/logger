'use strict';

const winston = require('winston');

class LoggerClass {

    constructor(options) {
        this._logger = this._getLogger(options);
    }

    log() {
        const level = arguments[0];
        const args = Array.prototype.slice.call(arguments, 1);

        return this._log(level, args);
    }

    info() {
        return this._log('info', arguments);
    }

    warn() {
        return this._log('warn', arguments);
    }

    error() {
        return this._log('error', arguments);
    }

    profile(id) {
        return this._logger.profile(id);
    }

    break(char) {
        this.info(new Array(50).join(char || '='));

        return this;
    }

    _log(level, args) {
        args = Array.prototype.slice.call(args);

        this._logger[level].apply(null, args);

        return this;
    }

    _getLogger(options) {
        options = options || {};

        return new (winston.Logger)({
            transports : [
                new (winston.transports.Console)({
                    colorize : true,
                    prettyPrint : true,
                }),
            ],
        });
    }
}

module.exports = function Logger(options) {
    return new LoggerClass(options);
};

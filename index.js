var winston = require('winston');

var Logger = function (options) {

    if (undefined === options) {
        options = {};
    }

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                colorize:    true,
                prettyPrint: true
            })
        ]
    });

    this.log = function () {
        var level = arguments[0];
        var args  = Array.prototype.slice.call(arguments, 1);

        _log(level, args);
    };

    this.info = function () {
        _log('info', arguments);
    };

    this.warn = function () {
        _log('warn', arguments);
    };

    this.error = function () {
        _log('error', arguments);
    };

    this.profile = function (id) {
        logger.profile(id);
    };

    this.separator = function () {
        this.info(new Array(50).join('='));
    };

    var _log = function (level, args) {
        args = Array.prototype.slice.call(args);

        logger[level].apply(null, args);
    }
};

module.exports = function (options) {
    var result;

    if (!(this instanceof Logger)) {
        result = new Logger(options);
    }

    return result;
};

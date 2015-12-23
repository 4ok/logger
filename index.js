var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize:    true,
            prettyPrint: true
        })
    ]
});

function _log(level, args) {
    args = Array.prototype.slice.call(args);

    logger[level].apply(null, args);

    return this;
}

var Logger = function (options) {

    if (undefined === options) {
        options = {};
    }

    this.log = function () {
        var level = arguments[0];
        var args  = Array.prototype.slice.call(arguments, 1);

        return _log(level, args);
    };

    this.info = function () {
        return _log('info', arguments);
    };

    this.warn = function () {
        return _log('warn', arguments);
    };

    this.error = function () {
        return _log('error', arguments);
    };

    this.profile = function (id) {
        return logger.profile(id);
    };

    this.break = function (char) {
        this.info(new Array(50).join(char || '='));

        return this;
    };
};

module.exports = function (options) {
    var result;

    if (!(this instanceof Logger)) {
        result = new Logger(options);
    }

    return result;
};

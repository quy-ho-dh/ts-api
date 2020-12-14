"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const colors = require("colors/safe");
const _ = require("lodash");
const moment = require("moment");
const path = require("path");
const IS_DEVELOPMENT = true;
const LOG_LEVEL = 'DEBUG';
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
})(LogLevel || (LogLevel = {}));
const MinLogLevel = LOG_LEVEL;
class DefaultLogger {
    constructor(scope) {
        this.debug = this._log(LogLevel.DEBUG);
        this.info = this._log(LogLevel.INFO);
        this.warn = this._log(LogLevel.WARN);
        this.error = this._log(LogLevel.ERROR);
        this.scope = this.parseScope(scope || 'app');
    }
    get timestamp() {
        return moment().utc().format('YYYY-MM-DD HH:mm:ss');
    }
    parseScope(filepath) {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), '');
            filepath = filepath.replace(`${path.sep}server${path.sep}`, '');
            filepath = filepath.replace(`${path.sep}build${path.sep}`, '');
            filepath = filepath.replace('.ts', '');
            filepath = filepath.replace('.js', '');
            filepath = filepath.replace(path.sep, ':');
        }
        return filepath;
    }
    _log(level) {
        return level >= MinLogLevel ? this.log(level) : (_) => void 0;
    }
}
class ConsoleLogger extends DefaultLogger {
    constructor() {
        super(...arguments);
        this.colorize = (level) => {
            switch (level) {
                case LogLevel.DEBUG:
                    return colors.blue;
                case LogLevel.INFO:
                    return colors.green;
                case LogLevel.WARN:
                    return colors.yellow;
                case LogLevel.ERROR:
                    return colors.red;
                default:
                    return colors.grey;
            }
        };
    }
    log(level) {
        return (message, ...optionalParams) => {
            let context = _.chain([this.scope, this.timestamp, LogLevel[level]])
                .compact()
                .join(' ')
                .value();
            if (IS_DEVELOPMENT) {
                context = this.colorize(level)(context);
                message = this.colorize(level)(message);
            }
            return _.get(global.console, LogLevel[level].toLowerCase()).bind(global.console, context)(message, ...optionalParams);
        };
    }
}
function getLogger(scope) {
    return new ConsoleLogger(scope);
}
exports.getLogger = getLogger;
//# sourceMappingURL=log.js.map
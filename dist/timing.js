'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timing = timing;
function timing(modules) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.time;
  var timeEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.timeEnd;

  var newModules = {};

  var _loop = function _loop(key) {
    var val = modules[key];
    if (typeof val === 'function') {
      (function () {
        var funcToWrapped = val;
        newModules[key] = function () {
          var _arguments = arguments;

          var argsArray = Object.keys(arguments).map(function (key) {
            return _arguments[key];
          });
          time(key + ' use');
          var funcResult = funcToWrapped.apply(null, argsArray);
          if (!funcResult.then) {
            timeEnd(key + ' use');
            return funcResult;
          } else {
            return funcResult.then(function (result) {
              timeEnd(key + ' use');
              return result;
            });
          }
        };
      })();
    } else {
      newModules[key] = val;
    }
  };

  for (var key in modules) {
    _loop(key);
  }
  return newModules;
}
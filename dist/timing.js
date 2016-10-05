'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timing = timing;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function timing(modules) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console.time;
  var timeEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.timeEnd;

  var newModules = {};

  var _loop = function _loop(key) {
    var val = modules[key];
    if (typeof val === 'function') {
      (function () {
        var funcToWrapped = val;
        newModules[key] = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
          var _args = arguments;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  time(key + ' use');
                  _context.next = 3;
                  return funcToWrapped.apply(funcToWrapped, _args);

                case 3:
                  timeEnd(key + ' use');

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));
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
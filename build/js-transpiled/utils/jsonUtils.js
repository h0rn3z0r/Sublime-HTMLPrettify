"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJSON5File = exports.parseJSON5 = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _json = _interopRequireDefault(require("json5"));

var stdio = _interopRequireWildcard(require("./stdioUtils"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses some json text if it's well formed, otherwise silently fails and
// returns undefined.
var parseJSON5 = function parseJSON5(string) {
  try {
    return _json.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse jsbeautifyrc:', string);
    return undefined;
  }
}; // Parses a json file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.


exports.parseJSON5 = parseJSON5;

var parseJSON5File =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(filePath) {
    var contents, parsed;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            stdio.info('Attempting to parse file:', filePath);
            _context.prev = 1;
            _context.next = 4;
            return _fsExtra.default.readFile(filePath, {
              encoding: 'utf8'
            });

          case 4:
            contents = _context.sent;
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            stdio.info('Failed to read file:', filePath);
            return _context.abrupt("return", undefined);

          case 11:
            parsed = parseJSON5(contents);

            if (!(parsed === undefined)) {
              _context.next = 15;
              break;
            }

            stdio.info('Failed to parse file:', filePath);
            return _context.abrupt("return", undefined);

          case 15:
            return _context.abrupt("return", parsed);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function parseJSON5File(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.parseJSON5File = parseJSON5File;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25VdGlscy5qcyJdLCJuYW1lcyI6WyJwYXJzZUpTT041Iiwic3RyaW5nIiwiSlNPTjUiLCJwYXJzZSIsImUiLCJzdGRpbyIsImluZm8iLCJ1bmRlZmluZWQiLCJwYXJzZUpTT041RmlsZSIsImZpbGVQYXRoIiwiZnMiLCJyZWFkRmlsZSIsImVuY29kaW5nIiwiY29udGVudHMiLCJwYXJzZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSUE7O0FBQ0E7O0FBRUE7O0FBUEE7OztBQVNBO0FBQ0E7QUFDTyxJQUFNQSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDQyxNQUFELEVBQVk7QUFDcEMsTUFBSTtBQUNGLFdBQU9DLGNBQU1DLEtBQU4sQ0FBWUYsTUFBWixDQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9HLENBQVAsRUFBVTtBQUNWQyxJQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVywrQkFBWCxFQUE0Q0wsTUFBNUM7QUFDQSxXQUFPTSxTQUFQO0FBQ0Q7QUFDRixDQVBNLEMsQ0FTUDtBQUNBOzs7OztBQUNPLElBQU1DLGNBQWM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUM1QkosWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsMkJBQVgsRUFBd0NHLFFBQXhDO0FBRDRCO0FBQUE7QUFBQSxtQkFJVEMsaUJBQUdDLFFBQUgsQ0FBWUYsUUFBWixFQUFzQjtBQUFFRyxjQUFBQSxRQUFRLEVBQUU7QUFBWixhQUF0QixDQUpTOztBQUFBO0FBSTFCQyxZQUFBQSxRQUowQjtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBTTFCUixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyxzQkFBWCxFQUFtQ0csUUFBbkM7QUFOMEIsNkNBT25CRixTQVBtQjs7QUFBQTtBQVN0Qk8sWUFBQUEsTUFUc0IsR0FTYmQsVUFBVSxDQUFDYSxRQUFELENBVEc7O0FBQUEsa0JBVXhCQyxNQUFNLEtBQUtQLFNBVmE7QUFBQTtBQUFBO0FBQUE7O0FBVzFCRixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyx1QkFBWCxFQUFvQ0csUUFBcEM7QUFYMEIsNkNBWW5CRixTQVptQjs7QUFBQTtBQUFBLDZDQWNyQk8sTUFkcUI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBZE4sY0FBYztBQUFBO0FBQUE7QUFBQSxHQUFwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcclxuaW1wb3J0IEpTT041IGZyb20gJ2pzb241JztcclxuXHJcbmltcG9ydCAqIGFzIHN0ZGlvIGZyb20gJy4vc3RkaW9VdGlscyc7XHJcblxyXG4vLyBQYXJzZXMgc29tZSBqc29uIHRleHQgaWYgaXQncyB3ZWxsIGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzIGFuZFxyXG4vLyByZXR1cm5zIHVuZGVmaW5lZC5cclxuZXhwb3J0IGNvbnN0IHBhcnNlSlNPTjUgPSAoc3RyaW5nKSA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09ONS5wYXJzZShzdHJpbmcpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBqc2JlYXV0aWZ5cmM6Jywgc3RyaW5nKTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUGFyc2VzIGEganNvbiBmaWxlIGF0IGEgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyBhbiBvYmplY3QgaWYgaXQgZXhpc3RzXHJcbi8vIGFuZCBpc24ndCBtYWxmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlscyBhbmQgcmV0dXJucyB1bmRlZmluZWQuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUpTT041RmlsZSA9IGFzeW5jIChmaWxlUGF0aCkgPT4ge1xyXG4gIHN0ZGlvLmluZm8oJ0F0dGVtcHRpbmcgdG8gcGFyc2UgZmlsZTonLCBmaWxlUGF0aCk7XHJcbiAgbGV0IGNvbnRlbnRzO1xyXG4gIHRyeSB7XHJcbiAgICBjb250ZW50cyA9IGF3YWl0IGZzLnJlYWRGaWxlKGZpbGVQYXRoLCB7IGVuY29kaW5nOiAndXRmOCcgfSk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHJlYWQgZmlsZTonLCBmaWxlUGF0aCk7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUpTT041KGNvbnRlbnRzKTtcclxuICBpZiAocGFyc2VkID09PSB1bmRlZmluZWQpIHtcclxuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byBwYXJzZSBmaWxlOicsIGZpbGVQYXRoKTtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcbiJdLCJmaWxlIjoidXRpbHMvanNvblV0aWxzLmpzIn0=

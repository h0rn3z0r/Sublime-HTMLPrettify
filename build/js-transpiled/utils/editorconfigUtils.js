"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseEditorConfigFile = exports.parseEditorConfig = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _editorconfigParser = _interopRequireDefault(require("editorconfig-parser"));

var stdio = _interopRequireWildcard(require("./stdioUtils"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses some .editorconfig text if it's well formed, otherwise silently fails
// and returns undefined.
var parseEditorConfig = function parseEditorConfig(string) {
  try {
    return _editorconfigParser.default.parse(string);
  } catch (e) {
    stdio.info('Failed to parse editorconfig:', string);
    return undefined;
  }
}; // Parses .editorconfig file at a given path and returns an object if it exists
// and isn't malformed, otherwise silently fails and returns undefined.


exports.parseEditorConfig = parseEditorConfig;

var parseEditorConfigFile =
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
            parsed = parseEditorConfig(contents);

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

  return function parseEditorConfigFile(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.parseEditorConfigFile = parseEditorConfigFile;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2VkaXRvcmNvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlRWRpdG9yQ29uZmlnIiwic3RyaW5nIiwiZWRpdG9yY29uZmlnIiwicGFyc2UiLCJlIiwic3RkaW8iLCJpbmZvIiwidW5kZWZpbmVkIiwicGFyc2VFZGl0b3JDb25maWdGaWxlIiwiZmlsZVBhdGgiLCJmcyIsInJlYWRGaWxlIiwiZW5jb2RpbmciLCJjb250ZW50cyIsInBhcnNlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFFQTs7QUFQQTs7O0FBU0E7QUFDQTtBQUNPLElBQU1BLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0IsQ0FBQ0MsTUFBRCxFQUFZO0FBQzNDLE1BQUk7QUFDRixXQUFPQyw0QkFBYUMsS0FBYixDQUFtQkYsTUFBbkIsQ0FBUDtBQUNELEdBRkQsQ0FFRSxPQUFPRyxDQUFQLEVBQVU7QUFDVkMsSUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsK0JBQVgsRUFBNENMLE1BQTVDO0FBQ0EsV0FBT00sU0FBUDtBQUNEO0FBQ0YsQ0FQTSxDLENBU1A7QUFDQTs7Ozs7QUFDTyxJQUFNQyxxQkFBcUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQUFHLGlCQUFPQyxRQUFQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNuQ0osWUFBQUEsS0FBSyxDQUFDQyxJQUFOLENBQVcsMkJBQVgsRUFBd0NHLFFBQXhDO0FBRG1DO0FBQUE7QUFBQSxtQkFJaEJDLGlCQUFHQyxRQUFILENBQVlGLFFBQVosRUFBc0I7QUFBRUcsY0FBQUEsUUFBUSxFQUFFO0FBQVosYUFBdEIsQ0FKZ0I7O0FBQUE7QUFJakNDLFlBQUFBLFFBSmlDO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFNakNSLFlBQUFBLEtBQUssQ0FBQ0MsSUFBTixDQUFXLHNCQUFYLEVBQW1DRyxRQUFuQztBQU5pQyw2Q0FPMUJGLFNBUDBCOztBQUFBO0FBUzdCTyxZQUFBQSxNQVQ2QixHQVNwQmQsaUJBQWlCLENBQUNhLFFBQUQsQ0FURzs7QUFBQSxrQkFVL0JDLE1BQU0sS0FBS1AsU0FWb0I7QUFBQTtBQUFBO0FBQUE7O0FBV2pDRixZQUFBQSxLQUFLLENBQUNDLElBQU4sQ0FBVyx1QkFBWCxFQUFvQ0csUUFBcEM7QUFYaUMsNkNBWTFCRixTQVowQjs7QUFBQTtBQUFBLDZDQWM1Qk8sTUFkNEI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBckJOLHFCQUFxQjtBQUFBO0FBQUE7QUFBQSxHQUEzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcclxuICogTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xyXG4gKiBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLiAqL1xyXG5cclxuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcclxuaW1wb3J0IGVkaXRvcmNvbmZpZyBmcm9tICdlZGl0b3Jjb25maWctcGFyc2VyJztcclxuXHJcbmltcG9ydCAqIGFzIHN0ZGlvIGZyb20gJy4vc3RkaW9VdGlscyc7XHJcblxyXG4vLyBQYXJzZXMgc29tZSAuZWRpdG9yY29uZmlnIHRleHQgaWYgaXQncyB3ZWxsIGZvcm1lZCwgb3RoZXJ3aXNlIHNpbGVudGx5IGZhaWxzXHJcbi8vIGFuZCByZXR1cm5zIHVuZGVmaW5lZC5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRWRpdG9yQ29uZmlnID0gKHN0cmluZykgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZWRpdG9yY29uZmlnLnBhcnNlKHN0cmluZyk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGVkaXRvcmNvbmZpZzonLCBzdHJpbmcpO1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn07XHJcblxyXG4vLyBQYXJzZXMgLmVkaXRvcmNvbmZpZyBmaWxlIGF0IGEgZ2l2ZW4gcGF0aCBhbmQgcmV0dXJucyBhbiBvYmplY3QgaWYgaXQgZXhpc3RzXHJcbi8vIGFuZCBpc24ndCBtYWxmb3JtZWQsIG90aGVyd2lzZSBzaWxlbnRseSBmYWlscyBhbmQgcmV0dXJucyB1bmRlZmluZWQuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUVkaXRvckNvbmZpZ0ZpbGUgPSBhc3luYyAoZmlsZVBhdGgpID0+IHtcclxuICBzdGRpby5pbmZvKCdBdHRlbXB0aW5nIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xyXG4gIGxldCBjb250ZW50cztcclxuICB0cnkge1xyXG4gICAgY29udGVudHMgPSBhd2FpdCBmcy5yZWFkRmlsZShmaWxlUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIHN0ZGlvLmluZm8oJ0ZhaWxlZCB0byByZWFkIGZpbGU6JywgZmlsZVBhdGgpO1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFZGl0b3JDb25maWcoY29udGVudHMpO1xyXG4gIGlmIChwYXJzZWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgc3RkaW8uaW5mbygnRmFpbGVkIHRvIHBhcnNlIGZpbGU6JywgZmlsZVBhdGgpO1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuIl0sImZpbGUiOiJ1dGlscy9lZGl0b3Jjb25maWdVdGlscy5qcyJ9

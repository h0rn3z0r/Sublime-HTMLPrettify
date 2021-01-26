"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalizeJsbeautifyConfig = exports.extendJsbeautifyConfigWithEditorOverrides = exports.extendJsbeautifyConfigWithCurrentFileMatchRules = exports.extendJsbeautifyConfigFromEditorConfigInFolders = exports.extendJsbeautifyConfigFromFolders = exports.extendJsbeautifyConfigFromEditorConfigFile = exports.extendJsbeautifyConfigFromFile = exports.extendJsbeautifyConfig = exports.parseDefaultJsbeautifyConfig = exports.parseJsbeautifyConfig = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/es7.object.entries");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _clone = _interopRequireDefault(require("lodash/clone"));

var _promiseArrays = _interopRequireDefault(require("promise-arrays"));

var _paths = require("./paths");

var _constants = require("./constants");

var _jsonUtils = require("./jsonUtils");

var _editorconfigUtils = require("./editorconfigUtils");

var _configSanitizers = require("./configSanitizers");

var _fileUtils = require("./fileUtils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// Parses a .jsbeautifyrc json file and returns a sanitized object
// with a consistent and expected format.
var parseJsbeautifyConfig =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(filePath) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _configSanitizers.sanitizeJsbeautifyConfig;
            _context.next = 3;
            return (0, _jsonUtils.parseJSON5File)(filePath);

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parseJsbeautifyConfig(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Parses the default .jsbeautifyrc json file coming with this plugin.


exports.parseJsbeautifyConfig = parseJsbeautifyConfig;

var parseDefaultJsbeautifyConfig = function parseDefaultJsbeautifyConfig() {
  return parseJsbeautifyConfig(_path.default.join(_paths.ROOT_DIR, '.jsbeautifyrc.defaults.json'));
}; // Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.


exports.parseDefaultJsbeautifyConfig = parseDefaultJsbeautifyConfig;

var extendJsbeautifyConfig = function extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig) {
  var oldClonedJsbeautifyConfig = (0, _clone.default)(oldJsbeautifyConfig);

  var _arr = Object.entries(newJsbeautifyConfig || {});

  for (var _i = 0; _i < _arr.length; _i++) {
    var _arr$_i = (0, _slicedToArray2.default)(_arr[_i], 2),
        fileType = _arr$_i[0],
        newFileSettings = _arr$_i[1];

    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        oldClonedJsbeautifyConfig[fileType] = (0, _objectSpread2.default)({}, oldClonedJsbeautifyConfig[fileType] || {}, newFileSettings || {});
        break;

      case 'custom':
        var _arr2 = Object.entries(newFileSettings || {});

        for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
          var _arr2$_i = (0, _slicedToArray2.default)(_arr2[_i2], 2),
              globString = _arr2$_i[0],
              newGlobConfig = _arr2$_i[1];

          oldClonedJsbeautifyConfig.custom[globString] = (0, _objectSpread2.default)({}, oldClonedJsbeautifyConfig.custom[globString] || {}, newGlobConfig || {});
        }

        break;

      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  }

  return oldClonedJsbeautifyConfig;
}; // Clones and extends a given .jsbeautifyrc object with the one located at a
// file path. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfig = extendJsbeautifyConfig;

var extendJsbeautifyConfigFromFile =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(filePath, oldJsbeautifyConfig) {
    var newJsbeautifyConfig;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return parseJsbeautifyConfig(filePath);

          case 2:
            newJsbeautifyConfig = _context2.sent;
            return _context2.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function extendJsbeautifyConfigFromFile(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with an .editorconfig file
// located at a file path. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfigFromFile = extendJsbeautifyConfigFromFile;

var extendJsbeautifyConfigFromEditorConfigFile =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(filePath, oldJsbeautifyConfig) {
    var newEditorConfig, newJsbeautifyConfig;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _editorconfigUtils.parseEditorConfigFile)(filePath);

          case 2:
            newEditorConfig = _context3.sent;
            newJsbeautifyConfig = (0, _configSanitizers.sanitizeJsbeautifyConfig)((0, _configSanitizers.translateEditorConfigToJsbeautifyConfig)(newEditorConfig));
            return _context3.abrupt("return", extendJsbeautifyConfig(newJsbeautifyConfig, oldJsbeautifyConfig));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function extendJsbeautifyConfigFromEditorConfigFile(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with the first one found in
// a list of folder paths. If none exists, a clone of the original is returned.


exports.extendJsbeautifyConfigFromEditorConfigFile = extendJsbeautifyConfigFromEditorConfigFile;

var extendJsbeautifyConfigFromFolders =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee4(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newJsbeautifyConfigPath;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.jsbeautifyrc');
            });
            _context4.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);

          case 3:
            newJsbeautifyConfigPath = _context4.sent[0];

            if (!newJsbeautifyConfigPath) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", extendJsbeautifyConfigFromFile(newJsbeautifyConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context4.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function extendJsbeautifyConfigFromFolders(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc object with the first .editorconfig
// file found in a list of folder paths. If none exists, a clone of the original
// is returned.


exports.extendJsbeautifyConfigFromFolders = extendJsbeautifyConfigFromFolders;

var extendJsbeautifyConfigFromEditorConfigInFolders =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee5(folderPaths, oldJsbeautifyConfig) {
    var filesToCheck, newEditorConfigPath;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filesToCheck = folderPaths.map(function (f) {
              return _path.default.join(f, '.editorconfig');
            });
            _context5.next = 3;
            return _promiseArrays.default.filter(filesToCheck, _fsExtra.default.pathExists);

          case 3:
            newEditorConfigPath = _context5.sent[0];

            if (!newEditorConfigPath) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", extendJsbeautifyConfigFromEditorConfigFile(newEditorConfigPath, oldJsbeautifyConfig));

          case 6:
            return _context5.abrupt("return", (0, _clone.default)(oldJsbeautifyConfig));

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function extendJsbeautifyConfigFromEditorConfigInFolders(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}(); // Clones and extends a given .jsbeautifyrc with some additional custom options
// defined in the "custom" field, which contains globs defining additional
// prettification rules for certain files paths.


exports.extendJsbeautifyConfigFromEditorConfigInFolders = extendJsbeautifyConfigFromEditorConfigInFolders;

var extendJsbeautifyConfigWithCurrentFileMatchRules = function extendJsbeautifyConfigWithCurrentFileMatchRules(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.currentFileMatchRules = {};

  var _arr3 = Object.entries(clonedJsbeautifyConfig.custom || {});

  for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    var _arr3$_i = (0, _slicedToArray2.default)(_arr3[_i3], 2),
        globString = _arr3$_i[0],
        globFileConfig = _arr3$_i[1];

    var _arr4 = Object.entries(globFileConfig || {});

    for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
      var _arr4$_i = (0, _slicedToArray2.default)(_arr4[_i4], 2),
          prefName = _arr4$_i[0],
          globPrefValue = _arr4$_i[1];

      if ((0, _fileUtils.isMatchingGlob)(globString)) {
        clonedJsbeautifyConfig.currentFileMatchRules[prefName] = globPrefValue;
      }
    }
  }

  return clonedJsbeautifyConfig;
}; // Clones and extends a given .jsbeautifyrc with some additional custom options
// retrieved from the editor settings.


exports.extendJsbeautifyConfigWithCurrentFileMatchRules = extendJsbeautifyConfigWithCurrentFileMatchRules;

var extendJsbeautifyConfigWithEditorOverrides = function extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig) {
  var clonedJsbeautifyConfig = (0, _clone.default)(jsbeautifyConfig);
  clonedJsbeautifyConfig.editorOverrides = {};

  if (_constants.EDITOR_INDENT_SIZE !== '?') {
    clonedJsbeautifyConfig.editorOverrides.indent_size = +_constants.EDITOR_INDENT_SIZE;
  }

  if (_constants.EDITOR_INDENT_WITH_TABS !== '?') {
    if (_constants.EDITOR_INDENT_WITH_TABS === 'True') {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = true;
      clonedJsbeautifyConfig.editorOverrides.indent_char = '\t';
    } else {
      clonedJsbeautifyConfig.editorOverrides.indent_with_tabs = false;
      clonedJsbeautifyConfig.editorOverrides.indent_char = ' ';
    }
  }

  return clonedJsbeautifyConfig;
}; // Clones and extends a given .jsbeautifyrc with some additional meta-options
// following some specific rules respecting global editor settings.


exports.extendJsbeautifyConfigWithEditorOverrides = extendJsbeautifyConfigWithEditorOverrides;

var finalizeJsbeautifyConfig = function finalizeJsbeautifyConfig(jsbeautifyConfig) {
  var extendedJsbeautifyConfig = extendJsbeautifyConfigWithCurrentFileMatchRules(extendJsbeautifyConfigWithEditorOverrides(jsbeautifyConfig));
  return {
    html: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.html || {}, {
      css: extendedJsbeautifyConfig.css,
      js: extendedJsbeautifyConfig.js
    }, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    css: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.css || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    js: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.js || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {}),
    json: (0, _objectSpread2.default)({}, extendedJsbeautifyConfig.all || {}, extendedJsbeautifyConfig.json || {}, extendedJsbeautifyConfig.currentFileMatchRules || {}, extendedJsbeautifyConfig.editorOverrides || {})
  };
};

exports.finalizeJsbeautifyConfig = finalizeJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1V0aWxzLmpzIl0sIm5hbWVzIjpbInBhcnNlSnNiZWF1dGlmeUNvbmZpZyIsImZpbGVQYXRoIiwic2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnIiwicGFyc2VEZWZhdWx0SnNiZWF1dGlmeUNvbmZpZyIsInBhdGgiLCJqb2luIiwiUk9PVF9ESVIiLCJleHRlbmRKc2JlYXV0aWZ5Q29uZmlnIiwibmV3SnNiZWF1dGlmeUNvbmZpZyIsIm9sZEpzYmVhdXRpZnlDb25maWciLCJvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnIiwiT2JqZWN0IiwiZW50cmllcyIsImZpbGVUeXBlIiwibmV3RmlsZVNldHRpbmdzIiwiZ2xvYlN0cmluZyIsIm5ld0dsb2JDb25maWciLCJjdXN0b20iLCJFcnJvciIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnRmlsZSIsIm5ld0VkaXRvckNvbmZpZyIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRm9sZGVycyIsImZvbGRlclBhdGhzIiwiZmlsZXNUb0NoZWNrIiwibWFwIiwiZiIsInByb21pc2VBcnJheXMiLCJmaWx0ZXIiLCJmcyIsInBhdGhFeGlzdHMiLCJuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRWRpdG9yQ29uZmlnSW5Gb2xkZXJzIiwibmV3RWRpdG9yQ29uZmlnUGF0aCIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoQ3VycmVudEZpbGVNYXRjaFJ1bGVzIiwianNiZWF1dGlmeUNvbmZpZyIsImNsb25lZEpzYmVhdXRpZnlDb25maWciLCJjdXJyZW50RmlsZU1hdGNoUnVsZXMiLCJnbG9iRmlsZUNvbmZpZyIsInByZWZOYW1lIiwiZ2xvYlByZWZWYWx1ZSIsImV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzIiwiZWRpdG9yT3ZlcnJpZGVzIiwiRURJVE9SX0lOREVOVF9TSVpFIiwiaW5kZW50X3NpemUiLCJFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyIsImluZGVudF93aXRoX3RhYnMiLCJpbmRlbnRfY2hhciIsImZpbmFsaXplSnNiZWF1dGlmeUNvbmZpZyIsImV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZyIsImh0bWwiLCJhbGwiLCJjc3MiLCJqcyIsImpzb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQWRBOzs7QUFnQkE7QUFDQTtBQUNPLElBQU1BLHFCQUFxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBQUcsaUJBQU1DLFFBQU47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDBCQUFrQkMsMENBQWxCO0FBQUE7QUFBQSxtQkFBaUQsK0JBQWVELFFBQWYsQ0FBakQ7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBQUg7O0FBQUEsa0JBQXJCRCxxQkFBcUI7QUFBQTtBQUFBO0FBQUEsR0FBM0IsQyxDQUVQOzs7OztBQUNPLElBQU1HLDRCQUE0QixHQUFHLFNBQS9CQSw0QkFBK0I7QUFBQSxTQUFNSCxxQkFBcUIsQ0FBQ0ksY0FBS0MsSUFBTCxDQUFVQyxlQUFWLEVBQW9CLDZCQUFwQixDQUFELENBQTNCO0FBQUEsQ0FBckMsQyxDQUVQO0FBQ0E7Ozs7O0FBQ08sSUFBTUMsc0JBQXNCLEdBQUcsU0FBekJBLHNCQUF5QixDQUFDQyxtQkFBRCxFQUFzQkMsbUJBQXRCLEVBQThDO0FBQ2xGLE1BQU1DLHlCQUF5QixHQUFHLG9CQUFNRCxtQkFBTixDQUFsQzs7QUFEa0YsYUFHeENFLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlSixtQkFBbUIsSUFBSSxFQUF0QyxDQUh3Qzs7QUFHbEYsMkNBQXFGO0FBQUE7QUFBQSxRQUF6RUssUUFBeUU7QUFBQSxRQUEvREMsZUFBK0Q7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aXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xyXG5pbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lJztcclxuaW1wb3J0IHByb21pc2VBcnJheXMgZnJvbSAncHJvbWlzZS1hcnJheXMnO1xyXG5cclxuaW1wb3J0IHsgUk9PVF9ESVIgfSBmcm9tICcuL3BhdGhzJztcclxuaW1wb3J0IHsgRURJVE9SX0lOREVOVF9TSVpFLCBFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyB9IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgcGFyc2VKU09ONUZpbGUgfSBmcm9tICcuL2pzb25VdGlscyc7XHJcbmltcG9ydCB7IHBhcnNlRWRpdG9yQ29uZmlnRmlsZSB9IGZyb20gJy4vZWRpdG9yY29uZmlnVXRpbHMnO1xyXG5pbXBvcnQgeyBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcsIHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyB9IGZyb20gJy4vY29uZmlnU2FuaXRpemVycyc7XHJcbmltcG9ydCB7IGlzTWF0Y2hpbmdHbG9iIH0gZnJvbSAnLi9maWxlVXRpbHMnO1xyXG5cclxuLy8gUGFyc2VzIGEgLmpzYmVhdXRpZnlyYyBqc29uIGZpbGUgYW5kIHJldHVybnMgYSBzYW5pdGl6ZWQgb2JqZWN0XHJcbi8vIHdpdGggYSBjb25zaXN0ZW50IGFuZCBleHBlY3RlZCBmb3JtYXQuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUpzYmVhdXRpZnlDb25maWcgPSBhc3luYyBmaWxlUGF0aCA9PiBzYW5pdGl6ZUpzYmVhdXRpZnlDb25maWcoYXdhaXQgcGFyc2VKU09ONUZpbGUoZmlsZVBhdGgpKTtcclxuXHJcbi8vIFBhcnNlcyB0aGUgZGVmYXVsdCAuanNiZWF1dGlmeXJjIGpzb24gZmlsZSBjb21pbmcgd2l0aCB0aGlzIHBsdWdpbi5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRGVmYXVsdEpzYmVhdXRpZnlDb25maWcgPSAoKSA9PiBwYXJzZUpzYmVhdXRpZnlDb25maWcocGF0aC5qb2luKFJPT1RfRElSLCAnLmpzYmVhdXRpZnlyYy5kZWZhdWx0cy5qc29uJykpO1xyXG5cclxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgb25lIGxvY2F0ZWQgYXQgYVxyXG4vLyBmaWxlIHBhdGguIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cclxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWcgPSAobmV3SnNiZWF1dGlmeUNvbmZpZywgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xyXG4gIGNvbnN0IG9sZENsb25lZEpzYmVhdXRpZnlDb25maWcgPSBjbG9uZShvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcclxuXHJcbiAgZm9yIChjb25zdCBbZmlsZVR5cGUsIG5ld0ZpbGVTZXR0aW5nc10gb2YgT2JqZWN0LmVudHJpZXMobmV3SnNiZWF1dGlmeUNvbmZpZyB8fCB7fSkpIHtcclxuICAgIHN3aXRjaCAoZmlsZVR5cGUpIHtcclxuICAgICAgY2FzZSAnYWxsJzpcclxuICAgICAgY2FzZSAnaHRtbCc6XHJcbiAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgIGNhc2UgJ2pzJzpcclxuICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgb2xkQ2xvbmVkSnNiZWF1dGlmeUNvbmZpZ1tmaWxlVHlwZV0gPSB7XHJcbiAgICAgICAgICAuLi5vbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnW2ZpbGVUeXBlXSB8fCB7fSxcclxuICAgICAgICAgIC4uLm5ld0ZpbGVTZXR0aW5ncyB8fCB7fSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgIGZvciAoY29uc3QgW2dsb2JTdHJpbmcsIG5ld0dsb2JDb25maWddIG9mIE9iamVjdC5lbnRyaWVzKG5ld0ZpbGVTZXR0aW5ncyB8fCB7fSkpIHtcclxuICAgICAgICAgIG9sZENsb25lZEpzYmVhdXRpZnlDb25maWcuY3VzdG9tW2dsb2JTdHJpbmddID0ge1xyXG4gICAgICAgICAgICAuLi5vbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbVtnbG9iU3RyaW5nXSB8fCB7fSxcclxuICAgICAgICAgICAgLi4ubmV3R2xvYkNvbmZpZyB8fCB7fSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biAuanNiZWF1dGlmeXJjIGZpbGUgdHlwZTogJHtmaWxlVHlwZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvbGRDbG9uZWRKc2JlYXV0aWZ5Q29uZmlnO1xyXG59O1xyXG5cclxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCB0aGUgb25lIGxvY2F0ZWQgYXQgYVxyXG4vLyBmaWxlIHBhdGguIElmIG5vbmUgZXhpc3RzLCBhIGNsb25lIG9mIHRoZSBvcmlnaW5hbCBpcyByZXR1cm5lZC5cclxuZXhwb3J0IGNvbnN0IGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZSA9IGFzeW5jIChmaWxlUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZykgPT4ge1xyXG4gIGNvbnN0IG5ld0pzYmVhdXRpZnlDb25maWcgPSBhd2FpdCBwYXJzZUpzYmVhdXRpZnlDb25maWcoZmlsZVBhdGgpO1xyXG4gIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnKG5ld0pzYmVhdXRpZnlDb25maWcsIG9sZEpzYmVhdXRpZnlDb25maWcpO1xyXG59O1xyXG5cclxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyBvYmplY3Qgd2l0aCBhbiAuZWRpdG9yY29uZmlnIGZpbGVcclxuLy8gbG9jYXRlZCBhdCBhIGZpbGUgcGF0aC4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsIGlzIHJldHVybmVkLlxyXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdGaWxlID0gYXN5bmMgKGZpbGVQYXRoLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XHJcbiAgY29uc3QgbmV3RWRpdG9yQ29uZmlnID0gYXdhaXQgcGFyc2VFZGl0b3JDb25maWdGaWxlKGZpbGVQYXRoKTtcclxuICBjb25zdCBuZXdKc2JlYXV0aWZ5Q29uZmlnID0gc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnKHRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyhuZXdFZGl0b3JDb25maWcpKTtcclxuICByZXR1cm4gZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZyhuZXdKc2JlYXV0aWZ5Q29uZmlnLCBvbGRKc2JlYXV0aWZ5Q29uZmlnKTtcclxufTtcclxuXHJcbi8vIENsb25lcyBhbmQgZXh0ZW5kcyBhIGdpdmVuIC5qc2JlYXV0aWZ5cmMgb2JqZWN0IHdpdGggdGhlIGZpcnN0IG9uZSBmb3VuZCBpblxyXG4vLyBhIGxpc3Qgb2YgZm9sZGVyIHBhdGhzLiBJZiBub25lIGV4aXN0cywgYSBjbG9uZSBvZiB0aGUgb3JpZ2luYWwgaXMgcmV0dXJuZWQuXHJcbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUZvbGRlcnMgPSBhc3luYyAoZm9sZGVyUGF0aHMsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcclxuICBjb25zdCBmaWxlc1RvQ2hlY2sgPSBmb2xkZXJQYXRocy5tYXAoZiA9PiBwYXRoLmpvaW4oZiwgJy5qc2JlYXV0aWZ5cmMnKSk7XHJcbiAgY29uc3QgbmV3SnNiZWF1dGlmeUNvbmZpZ1BhdGggPSAoYXdhaXQgcHJvbWlzZUFycmF5cy5maWx0ZXIoZmlsZXNUb0NoZWNrLCBmcy5wYXRoRXhpc3RzKSlbMF07XHJcblxyXG4gIGlmIChuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCkge1xyXG4gICAgcmV0dXJuIGV4dGVuZEpzYmVhdXRpZnlDb25maWdGcm9tRmlsZShuZXdKc2JlYXV0aWZ5Q29uZmlnUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XHJcbn07XHJcblxyXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIG9iamVjdCB3aXRoIHRoZSBmaXJzdCAuZWRpdG9yY29uZmlnXHJcbi8vIGZpbGUgZm91bmQgaW4gYSBsaXN0IG9mIGZvbGRlciBwYXRocy4gSWYgbm9uZSBleGlzdHMsIGEgY2xvbmUgb2YgdGhlIG9yaWdpbmFsXHJcbi8vIGlzIHJldHVybmVkLlxyXG5leHBvcnQgY29uc3QgZXh0ZW5kSnNiZWF1dGlmeUNvbmZpZ0Zyb21FZGl0b3JDb25maWdJbkZvbGRlcnMgPSBhc3luYyAoZm9sZGVyUGF0aHMsIG9sZEpzYmVhdXRpZnlDb25maWcpID0+IHtcclxuICBjb25zdCBmaWxlc1RvQ2hlY2sgPSBmb2xkZXJQYXRocy5tYXAoZiA9PiBwYXRoLmpvaW4oZiwgJy5lZGl0b3Jjb25maWcnKSk7XHJcbiAgY29uc3QgbmV3RWRpdG9yQ29uZmlnUGF0aCA9IChhd2FpdCBwcm9taXNlQXJyYXlzLmZpbHRlcihmaWxlc1RvQ2hlY2ssIGZzLnBhdGhFeGlzdHMpKVswXTtcclxuXHJcbiAgaWYgKG5ld0VkaXRvckNvbmZpZ1BhdGgpIHtcclxuICAgIHJldHVybiBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnRnJvbUVkaXRvckNvbmZpZ0ZpbGUobmV3RWRpdG9yQ29uZmlnUGF0aCwgb2xkSnNiZWF1dGlmeUNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2xvbmUob2xkSnNiZWF1dGlmeUNvbmZpZyk7XHJcbn07XHJcblxyXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBvcHRpb25zXHJcbi8vIGRlZmluZWQgaW4gdGhlIFwiY3VzdG9tXCIgZmllbGQsIHdoaWNoIGNvbnRhaW5zIGdsb2JzIGRlZmluaW5nIGFkZGl0aW9uYWxcclxuLy8gcHJldHRpZmljYXRpb24gcnVsZXMgZm9yIGNlcnRhaW4gZmlsZXMgcGF0aHMuXHJcbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEN1cnJlbnRGaWxlTWF0Y2hSdWxlcyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XHJcbiAgY29uc3QgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyA9IGNsb25lKGpzYmVhdXRpZnlDb25maWcpO1xyXG4gIGNsb25lZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzID0ge307XHJcblxyXG4gIGZvciAoY29uc3QgW2dsb2JTdHJpbmcsIGdsb2JGaWxlQ29uZmlnXSBvZiBPYmplY3QuZW50cmllcyhjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmN1c3RvbSB8fCB7fSkpIHtcclxuICAgIGZvciAoY29uc3QgW3ByZWZOYW1lLCBnbG9iUHJlZlZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhnbG9iRmlsZUNvbmZpZyB8fCB7fSkpIHtcclxuICAgICAgaWYgKGlzTWF0Y2hpbmdHbG9iKGdsb2JTdHJpbmcpKSB7XHJcbiAgICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5jdXJyZW50RmlsZU1hdGNoUnVsZXNbcHJlZk5hbWVdID0gZ2xvYlByZWZWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNsb25lZEpzYmVhdXRpZnlDb25maWc7XHJcbn07XHJcblxyXG4vLyBDbG9uZXMgYW5kIGV4dGVuZHMgYSBnaXZlbiAuanNiZWF1dGlmeXJjIHdpdGggc29tZSBhZGRpdGlvbmFsIGN1c3RvbSBvcHRpb25zXHJcbi8vIHJldHJpZXZlZCBmcm9tIHRoZSBlZGl0b3Igc2V0dGluZ3MuXHJcbmV4cG9ydCBjb25zdCBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEVkaXRvck92ZXJyaWRlcyA9IChqc2JlYXV0aWZ5Q29uZmlnKSA9PiB7XHJcbiAgY29uc3QgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZyA9IGNsb25lKGpzYmVhdXRpZnlDb25maWcpO1xyXG4gIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzID0ge307XHJcblxyXG4gIGlmIChFRElUT1JfSU5ERU5UX1NJWkUgIT09ICc/Jykge1xyXG4gICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3NpemUgPSArRURJVE9SX0lOREVOVF9TSVpFO1xyXG4gIH1cclxuXHJcbiAgaWYgKEVESVRPUl9JTkRFTlRfV0lUSF9UQUJTICE9PSAnPycpIHtcclxuICAgIGlmIChFRElUT1JfSU5ERU5UX1dJVEhfVEFCUyA9PT0gJ1RydWUnKSB7XHJcbiAgICAgIGNsb25lZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzLmluZGVudF93aXRoX3RhYnMgPSB0cnVlO1xyXG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICdcXHQnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xvbmVkSnNiZWF1dGlmeUNvbmZpZy5lZGl0b3JPdmVycmlkZXMuaW5kZW50X3dpdGhfdGFicyA9IGZhbHNlO1xyXG4gICAgICBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcy5pbmRlbnRfY2hhciA9ICcgJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBjbG9uZWRKc2JlYXV0aWZ5Q29uZmlnO1xyXG59O1xyXG5cclxuLy8gQ2xvbmVzIGFuZCBleHRlbmRzIGEgZ2l2ZW4gLmpzYmVhdXRpZnlyYyB3aXRoIHNvbWUgYWRkaXRpb25hbCBtZXRhLW9wdGlvbnNcclxuLy8gZm9sbG93aW5nIHNvbWUgc3BlY2lmaWMgcnVsZXMgcmVzcGVjdGluZyBnbG9iYWwgZWRpdG9yIHNldHRpbmdzLlxyXG5leHBvcnQgY29uc3QgZmluYWxpemVKc2JlYXV0aWZ5Q29uZmlnID0gKGpzYmVhdXRpZnlDb25maWcpID0+IHtcclxuICBjb25zdCBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcgPSBleHRlbmRKc2JlYXV0aWZ5Q29uZmlnV2l0aEN1cnJlbnRGaWxlTWF0Y2hSdWxlcyhcclxuICAgIGV4dGVuZEpzYmVhdXRpZnlDb25maWdXaXRoRWRpdG9yT3ZlcnJpZGVzKFxyXG4gICAgICBqc2JlYXV0aWZ5Q29uZmlnLFxyXG4gICAgKSxcclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaHRtbDoge1xyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuYWxsIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuaHRtbCB8fCB7fSxcclxuICAgICAgY3NzOiBleHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3NzLFxyXG4gICAgICBqczogZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzLFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxyXG4gICAgfSxcclxuXHJcbiAgICBjc3M6IHtcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmNzcyB8fCB7fSxcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmN1cnJlbnRGaWxlTWF0Y2hSdWxlcyB8fCB7fSxcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmVkaXRvck92ZXJyaWRlcyB8fCB7fSxcclxuICAgIH0sXHJcblxyXG4gICAganM6IHtcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmFsbCB8fCB7fSxcclxuICAgICAgLi4uZXh0ZW5kZWRKc2JlYXV0aWZ5Q29uZmlnLmpzIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxyXG4gICAgfSxcclxuXHJcbiAgICBqc29uOiB7XHJcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5hbGwgfHwge30sXHJcbiAgICAgIC4uLmV4dGVuZGVkSnNiZWF1dGlmeUNvbmZpZy5qc29uIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuY3VycmVudEZpbGVNYXRjaFJ1bGVzIHx8IHt9LFxyXG4gICAgICAuLi5leHRlbmRlZEpzYmVhdXRpZnlDb25maWcuZWRpdG9yT3ZlcnJpZGVzIHx8IHt9LFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG4iXSwiZmlsZSI6InV0aWxzL2NvbmZpZ1V0aWxzLmpzIn0=

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMatchingGlob = exports.isJS = exports.isJSON = exports.isHTML = exports.isCSS = void 0;

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _path = require("path");

var _minimatch = _interopRequireDefault(require("minimatch"));

var _constants = require("./constants");

var _jsonUtils = require("./jsonUtils");

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var GLOBAL_FILE_RULES = (0, _jsonUtils.parseJSON5)(_constants.GLOBAL_FILE_RULES_JSON); // Checks if a file path is allowed by regexing the file name and expecting
// it not to match certain expressions.

var hasDisallowedFilePathPattern = function hasDisallowedFilePathPattern(fileType, filePath) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ((GLOBAL_FILE_RULES[fileType] || {}).disallowed_file_patterns || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pattern = _step.value;

      if (filePath.match(new RegExp(pattern, 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}; // Checks if a file is of a particular type by regexing the file name and
// expecting a certain extension.


var hasAllowedFileExtension = function hasAllowedFileExtension(expectedType, filePath) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = ((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_extensions || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var extension = _step2.value;

      if (filePath.match(new RegExp("\\.".concat(extension, "$"), 'i'))) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}; // Checks if a file is of a particular type by regexing the syntax name and
// expecting a pattern.


var hasAllowedFileSyntax = function hasAllowedFileSyntax(expectedType, fileSyntax) {
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = ((GLOBAL_FILE_RULES[expectedType] || {}).allowed_file_syntaxes || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var pattern = _step3.value;

      if (fileSyntax.toLowerCase().includes(pattern)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return false;
};

var isCSS = function isCSS() {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('css', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('css', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('css', _constants.ORIGINAL_FILE_PATH);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax : false;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isCSS = isCSS;

var isHTML = function isHTML(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('html', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('html', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('html', _constants.ORIGINAL_FILE_PATH);
  var isMaybeHtml = bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeHtml : isMaybeHtml;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isHTML = isHTML;

var isJSON = function isJSON(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('json', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('json', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('json', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJson = bufferContents.match(/^\s*[{[]/);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJson : isMaybeJson;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
};

exports.isJSON = isJSON;

var isJS = function isJS(bufferContents) {
  var isSavedFile = _constants.ORIGINAL_FILE_PATH !== '?';
  var useEditorFileSyntaxForDeterminingFileType = _constants.EDITOR_FILE_SYNTAX !== '?';
  var isAllowedExtension = hasAllowedFileExtension('js', _constants.ORIGINAL_FILE_PATH);
  var isAllowedSyntax = hasAllowedFileSyntax('js', _constants.EDITOR_FILE_SYNTAX);
  var isDisallowedFilePattern = hasDisallowedFilePathPattern('js', _constants.ORIGINAL_FILE_PATH);
  var isMaybeJs = !bufferContents.match(/^\s*</);

  if (!isSavedFile) {
    return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isMaybeJs : isMaybeJs;
  }

  if (isDisallowedFilePattern) {
    return false;
  }

  return useEditorFileSyntaxForDeterminingFileType ? isAllowedSyntax || isAllowedExtension : isAllowedExtension;
}; // Checks if a file path matches a particular glob string.


exports.isJS = isJS;

var isMatchingGlob = function isMatchingGlob(globString) {
  // If file unsaved, reject glob matching;
  if (_constants.ORIGINAL_FILE_PATH === '?') {
    return false;
  }

  return (0, _minimatch.default)(_constants.ORIGINAL_FILE_PATH, globString) || (0, _minimatch.default)((0, _path.basename)(_constants.ORIGINAL_FILE_PATH), globString);
};

exports.isMatchingGlob = isMatchingGlob;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2ZpbGVVdGlscy5qcyJdLCJuYW1lcyI6WyJHTE9CQUxfRklMRV9SVUxFUyIsIkdMT0JBTF9GSUxFX1JVTEVTX0pTT04iLCJoYXNEaXNhbGxvd2VkRmlsZVBhdGhQYXR0ZXJuIiwiZmlsZVR5cGUiLCJmaWxlUGF0aCIsImRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyIsInBhdHRlcm4iLCJtYXRjaCIsIlJlZ0V4cCIsImhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uIiwiZXhwZWN0ZWRUeXBlIiwiYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMiLCJleHRlbnNpb24iLCJoYXNBbGxvd2VkRmlsZVN5bnRheCIsImZpbGVTeW50YXgiLCJhbGxvd2VkX2ZpbGVfc3ludGF4ZXMiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwiaXNDU1MiLCJpc1NhdmVkRmlsZSIsIk9SSUdJTkFMX0ZJTEVfUEFUSCIsInVzZUVkaXRvckZpbGVTeW50YXhGb3JEZXRlcm1pbmluZ0ZpbGVUeXBlIiwiRURJVE9SX0ZJTEVfU1lOVEFYIiwiaXNBbGxvd2VkRXh0ZW5zaW9uIiwiaXNBbGxvd2VkU3ludGF4IiwiaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4iLCJpc0hUTUwiLCJidWZmZXJDb250ZW50cyIsImlzTWF5YmVIdG1sIiwiaXNKU09OIiwiaXNNYXliZUpzb24iLCJpc0pTIiwiaXNNYXliZUpzIiwiaXNNYXRjaGluZ0dsb2IiLCJnbG9iU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBOztBQUVBOztBQUVBOztBQUNBOztBQVRBOzs7QUFXQSxJQUFNQSxpQkFBaUIsR0FBRywyQkFBV0MsaUNBQVgsQ0FBMUIsQyxDQUVBO0FBQ0E7O0FBQ0EsSUFBTUMsNEJBQTRCLEdBQUcsU0FBL0JBLDRCQUErQixDQUFDQyxRQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDM0QsMEJBQXNCLENBQUNKLGlCQUFpQixDQUFDRyxRQUFE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QU1RLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUNKLGNBQUQsRUFBb0I7QUFDdEMsTUFBTVIsV0FBVyxHQUFHQyxrQ0FBdUIsR0FBM0M7QUFDQSxNQUFNQyx5Q0FBeUMsR0FBR0Msa0NBQXVCLEdBQXpFO0FBRUEsTUFBTUMsa0JBQWtCLEdBQUdkLHVCQUF1QixDQUFDLElBQUQsRUFBT1csNkJBQVAsQ0FBbEQ7QUFDQSxNQUFNSSxlQUFlLEdBQUdYLG9CQUFvQixDQUFDLElBQUQsRUFBT1MsNkJBQVAsQ0FBNUM7QUFDQSxNQUFNRyx1QkFBdUIsR0FBR3ZCLDRCQUE0QixDQUFDLElBQUQsRUFBT2tCLDZCQUFQLENBQTVEO0FBQ0EsTUFBTVksU0FBUyxHQUFHLENBQUNMLGNBQWMsQ0FBQ3BCLEtBQWYsQ0FBcUIsT0FBckIsQ0FBbkI7O0FBRUEsTUFBSSxDQUFDWSxXQUFMLEVBQWtCO0FBQ2hCLFdBQU9FLHlDQUF5QyxHQUM1Q0csZUFBZSxJQUFJUSxTQUR5QixHQUU1Q0EsU0FGSjtBQUdEOztBQUVELE1BQUlQLHVCQUFKLEVBQTZCO0FBQzNCLFdBQU8sS0FBUDtBQUNEOztBQUVELFNBQU9KLHlDQUF5QyxHQUM1Q0csZUFBZSxJQUFJRCxrQkFEeUIsR0FFNUNBLGtCQUZKO0FBR0QsQ0F0Qk0sQyxDQXdCUDs7Ozs7QUFDTyxJQUFNVSxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLFVBQUQsRUFBZ0I7QUFDNUM7QUFDQSxNQUFJZCxrQ0FBdUIsR0FBM0IsRUFBZ0M7QUFDOUIsV0FBTyxLQUFQO0FBQ0Q7O0FBQ0QsU0FDRSx3QkFBVUEsNkJBQVYsRUFBOEJjLFVBQTlCLEtBQ0csd0JBQVUsb0JBQVNkLDZCQUFULENBQVYsRUFBd0NjLFVBQXhDLENBRkw7QUFJRCxDQVRNIiwic291cmNlc0NvbnRlbnQiOlsiLyogVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xyXG4gKiBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXHJcbiAqIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uICovXHJcblxyXG5pbXBvcnQgeyBiYXNlbmFtZSB9IGZyb20gJ3BhdGgnO1xyXG5cclxuaW1wb3J0IG1pbmltYXRjaCBmcm9tICdtaW5pbWF0Y2gnO1xyXG5cclxuaW1wb3J0IHsgR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTiwgT1JJR0lOQUxfRklMRV9QQVRILCBFRElUT1JfRklMRV9TWU5UQVggfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IHBhcnNlSlNPTjUgfSBmcm9tICcuL2pzb25VdGlscyc7XHJcblxyXG5jb25zdCBHTE9CQUxfRklMRV9SVUxFUyA9IHBhcnNlSlNPTjUoR0xPQkFMX0ZJTEVfUlVMRVNfSlNPTik7XHJcblxyXG4vLyBDaGVja3MgaWYgYSBmaWxlIHBhdGggaXMgYWxsb3dlZCBieSByZWdleGluZyB0aGUgZmlsZSBuYW1lIGFuZCBleHBlY3RpbmdcclxuLy8gaXQgbm90IHRvIG1hdGNoIGNlcnRhaW4gZXhwcmVzc2lvbnMuXHJcbmNvbnN0IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4gPSAoZmlsZVR5cGUsIGZpbGVQYXRoKSA9PiB7XHJcbiAgZm9yIChjb25zdCBwYXR0ZXJuIG9mIChHTE9CQUxfRklMRV9SVUxFU1tmaWxlVHlwZV0gfHwge30pLmRpc2FsbG93ZWRfZmlsZV9wYXR0ZXJucyB8fCBbXSkge1xyXG4gICAgaWYgKGZpbGVQYXRoLm1hdGNoKG5ldyBSZWdFeHAocGF0dGVybiwgJ2knKSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8vIENoZWNrcyBpZiBhIGZpbGUgaXMgb2YgYSBwYXJ0aWN1bGFyIHR5cGUgYnkgcmVnZXhpbmcgdGhlIGZpbGUgbmFtZSBhbmRcclxuLy8gZXhwZWN0aW5nIGEgY2VydGFpbiBleHRlbnNpb24uXHJcbmNvbnN0IGhhc0FsbG93ZWRGaWxlRXh0ZW5zaW9uID0gKGV4cGVjdGVkVHlwZSwgZmlsZVBhdGgpID0+IHtcclxuICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZXhwZWN0ZWRUeXBlXSB8fCB7fSkuYWxsb3dlZF9maWxlX2V4dGVuc2lvbnMgfHwgW10pIHtcclxuICAgIGlmIChmaWxlUGF0aC5tYXRjaChuZXcgUmVnRXhwKGBcXFxcLiR7ZXh0ZW5zaW9ufSRgLCAnaScpKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLy8gQ2hlY2tzIGlmIGEgZmlsZSBpcyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBieSByZWdleGluZyB0aGUgc3ludGF4IG5hbWUgYW5kXHJcbi8vIGV4cGVjdGluZyBhIHBhdHRlcm4uXHJcbmNvbnN0IGhhc0FsbG93ZWRGaWxlU3ludGF4ID0gKGV4cGVjdGVkVHlwZSwgZmlsZVN5bnRheCkgPT4ge1xyXG4gIGZvciAoY29uc3QgcGF0dGVybiBvZiAoR0xPQkFMX0ZJTEVfUlVMRVNbZXhwZWN0ZWRUeXBlXSB8fCB7fSkuYWxsb3dlZF9maWxlX3N5bnRheGVzIHx8IFtdKSB7XHJcbiAgICBpZiAoZmlsZVN5bnRheC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHBhdHRlcm4pKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNDU1MgPSAoKSA9PiB7XHJcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcclxuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xyXG5cclxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignY3NzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcclxuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnY3NzJywgRURJVE9SX0ZJTEVfU1lOVEFYKTtcclxuICBjb25zdCBpc0Rpc2FsbG93ZWRGaWxlUGF0dGVybiA9IGhhc0Rpc2FsbG93ZWRGaWxlUGF0aFBhdHRlcm4oJ2NzcycsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XHJcblxyXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcclxuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxyXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheFxyXG4gICAgICA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcclxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxyXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNIVE1MID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XHJcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcclxuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xyXG5cclxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignaHRtbCcsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XHJcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2h0bWwnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xyXG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignaHRtbCcsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XHJcbiAgY29uc3QgaXNNYXliZUh0bWwgPSBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccyo8Lyk7XHJcblxyXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcclxuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxyXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSHRtbFxyXG4gICAgICA6IGlzTWF5YmVIdG1sO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcclxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxyXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNKU09OID0gKGJ1ZmZlckNvbnRlbnRzKSA9PiB7XHJcbiAgY29uc3QgaXNTYXZlZEZpbGUgPSBPUklHSU5BTF9GSUxFX1BBVEggIT09ICc/JztcclxuICBjb25zdCB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZSA9IEVESVRPUl9GSUxFX1NZTlRBWCAhPT0gJz8nO1xyXG5cclxuICBjb25zdCBpc0FsbG93ZWRFeHRlbnNpb24gPSBoYXNBbGxvd2VkRmlsZUV4dGVuc2lvbignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XHJcbiAgY29uc3QgaXNBbGxvd2VkU3ludGF4ID0gaGFzQWxsb3dlZEZpbGVTeW50YXgoJ2pzb24nLCBFRElUT1JfRklMRV9TWU5UQVgpO1xyXG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignanNvbicsIE9SSUdJTkFMX0ZJTEVfUEFUSCk7XHJcbiAgY29uc3QgaXNNYXliZUpzb24gPSBidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccypbe1tdLyk7XHJcblxyXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcclxuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxyXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSnNvblxyXG4gICAgICA6IGlzTWF5YmVKc29uO1xyXG4gIH1cclxuXHJcbiAgaWYgKGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGVcclxuICAgID8gaXNBbGxvd2VkU3ludGF4IHx8IGlzQWxsb3dlZEV4dGVuc2lvblxyXG4gICAgOiBpc0FsbG93ZWRFeHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNKUyA9IChidWZmZXJDb250ZW50cykgPT4ge1xyXG4gIGNvbnN0IGlzU2F2ZWRGaWxlID0gT1JJR0lOQUxfRklMRV9QQVRIICE9PSAnPyc7XHJcbiAgY29uc3QgdXNlRWRpdG9yRmlsZVN5bnRheEZvckRldGVybWluaW5nRmlsZVR5cGUgPSBFRElUT1JfRklMRV9TWU5UQVggIT09ICc/JztcclxuXHJcbiAgY29uc3QgaXNBbGxvd2VkRXh0ZW5zaW9uID0gaGFzQWxsb3dlZEZpbGVFeHRlbnNpb24oJ2pzJywgT1JJR0lOQUxfRklMRV9QQVRIKTtcclxuICBjb25zdCBpc0FsbG93ZWRTeW50YXggPSBoYXNBbGxvd2VkRmlsZVN5bnRheCgnanMnLCBFRElUT1JfRklMRV9TWU5UQVgpO1xyXG4gIGNvbnN0IGlzRGlzYWxsb3dlZEZpbGVQYXR0ZXJuID0gaGFzRGlzYWxsb3dlZEZpbGVQYXRoUGF0dGVybignanMnLCBPUklHSU5BTF9GSUxFX1BBVEgpO1xyXG4gIGNvbnN0IGlzTWF5YmVKcyA9ICFidWZmZXJDb250ZW50cy5tYXRjaCgvXlxccyo8Lyk7XHJcblxyXG4gIGlmICghaXNTYXZlZEZpbGUpIHtcclxuICAgIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxyXG4gICAgICA/IGlzQWxsb3dlZFN5bnRheCB8fCBpc01heWJlSnNcclxuICAgICAgOiBpc01heWJlSnM7XHJcbiAgfVxyXG5cclxuICBpZiAoaXNEaXNhbGxvd2VkRmlsZVBhdHRlcm4pIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB1c2VFZGl0b3JGaWxlU3ludGF4Rm9yRGV0ZXJtaW5pbmdGaWxlVHlwZVxyXG4gICAgPyBpc0FsbG93ZWRTeW50YXggfHwgaXNBbGxvd2VkRXh0ZW5zaW9uXHJcbiAgICA6IGlzQWxsb3dlZEV4dGVuc2lvbjtcclxufTtcclxuXHJcbi8vIENoZWNrcyBpZiBhIGZpbGUgcGF0aCBtYXRjaGVzIGEgcGFydGljdWxhciBnbG9iIHN0cmluZy5cclxuZXhwb3J0IGNvbnN0IGlzTWF0Y2hpbmdHbG9iID0gKGdsb2JTdHJpbmcpID0+IHtcclxuICAvLyBJZiBmaWxlIHVuc2F2ZWQsIHJlamVjdCBnbG9iIG1hdGNoaW5nO1xyXG4gIGlmIChPUklHSU5BTF9GSUxFX1BBVEggPT09ICc/Jykge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gKFxyXG4gICAgbWluaW1hdGNoKE9SSUdJTkFMX0ZJTEVfUEFUSCwgZ2xvYlN0cmluZylcclxuICAgIHx8IG1pbmltYXRjaChiYXNlbmFtZShPUklHSU5BTF9GSUxFX1BBVEgpLCBnbG9iU3RyaW5nKVxyXG4gICk7XHJcbn07XHJcbiJdLCJmaWxlIjoidXRpbHMvZmlsZVV0aWxzLmpzIn0=

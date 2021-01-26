"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateEditorConfigToJsbeautifyConfig = exports.sanitizeJsbeautifyConfig = exports.sanitizeCharishValues = exports.sanitizeBooleanishValues = void 0;

var _pick = _interopRequireDefault(require("lodash/pick"));

var _isObject = _interopRequireDefault(require("lodash/isObject"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _mapObj = _interopRequireDefault(require("map-obj"));

var _isGlob = _interopRequireDefault(require("is-glob"));

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var VALID_JSBEAUTIFY_CONFIG_KEYS = ['all', 'html', 'css', 'js', 'json', 'custom']; // Utility function special casing "true" and "false" values as being
// actually booleans. This avoids common accidents in json files.

var sanitizeBooleanishValues = function sanitizeBooleanishValues(prefValue) {
  switch (prefValue) {
    case 'true':
      return true;

    case 'false':
      return false;

    default:
      return prefValue;
  }
}; // Utility function special casing "tab" and "space" values as being
// actually \t and \s.


exports.sanitizeBooleanishValues = sanitizeBooleanishValues;

var sanitizeCharishValues = function sanitizeCharishValues(prefValue) {
  switch (prefValue) {
    case 'tab':
      return '\t';

    case 'space':
      return ' ';

    default:
      return prefValue;
  }
}; // Utility function massaging .jsbeautifyrc objects into a consistent and
// expected format, discarding unknown keys and sanitizing values.


exports.sanitizeCharishValues = sanitizeCharishValues;

var sanitizeJsbeautifyConfig = function sanitizeJsbeautifyConfig(jsbeautifyConfig) {
  return (0, _mapObj.default)((0, _pick.default)(jsbeautifyConfig, VALID_JSBEAUTIFY_CONFIG_KEYS), function (fileType, fileSettings) {
    switch (fileType) {
      case 'all':
      case 'html':
      case 'css':
      case 'js':
      case 'json':
        return [fileType, (0, _mapObj.default)(fileSettings, function (prefName, prefValue) {
          return [prefName, sanitizeBooleanishValues(prefValue)];
        })];

      case 'custom':
        return [fileType, (0, _mapObj.default)(fileSettings, function (globString, globConfig) {
          return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
            return [prefName, sanitizeBooleanishValues(prefValue)];
          })];
        })];

      default:
        throw new Error("Unknown .jsbeautifyrc file type: ".concat(fileType));
    }
  });
};

exports.sanitizeJsbeautifyConfig = sanitizeJsbeautifyConfig;

var translateEditorConfigToJsbeautifyConfig = function translateEditorConfigToJsbeautifyConfig(editorConfig) {
  return {
    custom: (0, _mapObj.default)((0, _pickBy.default)(editorConfig, function (v, k) {
      return (0, _isGlob.default)(k) && (0, _isObject.default)(v);
    }), function (globString, globConfig) {
      return [globString, (0, _mapObj.default)(globConfig, function (prefName, prefValue) {
        switch (prefName) {
          case 'indent_style':
            return ['indent_char', sanitizeCharishValues(prefValue)];

          case 'insert_final_newline':
            return ['end_with_newline', prefValue];

          default:
            return [prefName, prefValue];
        }
      })];
    })
  };
};

exports.translateEditorConfigToJsbeautifyConfig = translateEditorConfigToJsbeautifyConfig;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbmZpZ1Nhbml0aXplcnMuanMiXSwibmFtZXMiOlsiVkFMSURfSlNCRUFVVElGWV9DT05GSUdfS0VZUyIsInNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyIsInByZWZWYWx1ZSIsInNhbml0aXplQ2hhcmlzaFZhbHVlcyIsInNhbml0aXplSnNiZWF1dGlmeUNvbmZpZyIsImpzYmVhdXRpZnlDb25maWciLCJmaWxlVHlwZSIsImZpbGVTZXR0aW5ncyIsInByZWZOYW1lIiwiZ2xvYlN0cmluZyIsImdsb2JDb25maWciLCJFcnJvciIsInRyYW5zbGF0ZUVkaXRvckNvbmZpZ1RvSnNiZWF1dGlmeUNvbmZpZyIsImVkaXRvckNvbmZpZyIsImN1c3RvbSIsInYiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFSQTs7O0FBVUEsSUFBTUEsNEJBQTRCLEdBQUcsQ0FDbkMsS0FEbUMsRUFFbkMsTUFGbUMsRUFHbkMsS0FIbUMsRUFJbkMsSUFKbUMsRUFLbkMsTUFMbUMsRUFNbkMsUUFObUMsQ0FBckMsQyxDQVNBO0FBQ0E7O0FBQ08sSUFBTUMsd0JBQXdCLEdBQUcsU0FBM0JBLHdCQUEyQixDQUFDQyxTQUFELEVBQWU7QUFDckQsVUFBUUEsU0FBUjtBQUNFLFNBQUssTUFBTDtBQUNFLGFBQU8sSUFBUDs7QUFDRixTQUFLLE9BQUw7QUFDRSxhQUFPLEtBQVA7O0FBQ0Y7QUFDRSxhQUFPQSxTQUFQO0FBTko7QUFRRCxDQVRNLEMsQ0FXUDtBQUNBOzs7OztBQUNPLElBQU1DLHFCQUFxQixHQUFHLFNBQXhCQSxxQkFBd0IsQ0FBQ0QsU0FBRCxFQUFlO0FBQ2xELFVBQVFBLFNBQVI7QUFDRSxTQUFLLEtBQUw7QUFDRSxhQUFPLElBQVA7O0FBQ0YsU0FBSyxPQUFMO0FBQ0UsYUFBTyxHQUFQOztBQUNGO0FBQ0UsYUFBT0EsU0FBUDtBQU5KO0FBUUQsQ0FUTSxDLENBV1A7QUFDQTs7Ozs7QUFDTyxJQUFNRSx3QkFBd0IsR0FBRyxTQUEzQkEsd0JBQTJCLENBQUFDLGdCQUFnQjtBQUFBLFNBQUkscUJBQU8sbUJBQUtBLGdCQUFMLEVBQXVCTCw0QkFBdkIsQ0FBUCxFQUE2RCxVQUFDTSxRQUFELEVBQVdDLFlBQVgsRUFBNEI7QUFDbkosWUFBUUQsUUFBUjtBQUNFLFdBQUssS0FBTDtBQUNBLFdBQUssTUFBTDtBQUNBLFdBQUssS0FBTDtBQUNBLFdBQUssSUFBTDtBQUNBLFdBQUssTUFBTDtBQUNFLGVBQU8sQ0FDTEEsUUFESyxFQUNLLHFCQUFPQyxZQUFQLEVBQXFCLFVBQUNDLFFBQUQsRUFBV04sU0FBWDtBQUFBLGlCQUF5QixDQUN0RE0sUUFEc0QsRUFDNUNQLHdCQUF3QixDQUFDQyxTQUFELENBRG9CLENBQXpCO0FBQUEsU0FBckIsQ0FETCxDQUFQOztBQUtGLFdBQUssUUFBTDtBQUNFLGVBQU8sQ0FDTEksUUFESyxFQUNLLHFCQUFPQyxZQUFQLEVBQXFCLFVBQUNFLFVBQUQsRUFBYUMsVUFBYjtBQUFBLGlCQUE0QixDQUN6REQsVUFEeUQsRUFDN0MscUJBQU9DLFVBQVAsRUFBbUIsVUFBQ0YsUUFBRCxFQUFXTixTQUFYO0FBQUEsbUJBQXlCLENBQ3RETSxRQURzRCxFQUM1Q1Asd0JBQXdCLENBQUNDLFNBQUQsQ0FEb0IsQ0FBekI7QUFBQSxXQUFuQixDQUQ2QyxDQUE1QjtBQUFBLFNBQXJCLENBREwsQ0FBUDs7QUFPRjtBQUNFLGNBQU0sSUFBSVMsS0FBSiw0Q0FBOENMLFFBQTlDLEVBQU47QUFwQko7QUFzQkQsR0F2QjJELENBQUo7QUFBQSxDQUFqRDs7OztBQXlCQSxJQUFNTSx1Q0FBdUMsR0FBRyxTQUExQ0EsdUNBQTBDLENBQUFDLFlBQVk7QUFBQSxTQUFLO0FBQ3RFQyxJQUFBQSxNQUFNLEVBQUUscUJBQU8scUJBQU9ELFlBQVAsRUFBcUIsVUFBQ0UsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsYUFBVSxxQkFBT0EsQ0FBUCxLQUFhLHVCQUFTRCxDQUFULENBQXZCO0FBQUEsS0FBckIsQ0FBUCxFQUFpRSxVQUFDTixVQUFELEVBQWFDLFVBQWI7QUFBQSxhQUE0QixDQUNuR0QsVUFEbUcsRUFDdkYscUJBQU9DLFVBQVAsRUFBbUIsVUFBQ0YsUUFBRCxFQUFXTixTQUFYLEVBQXlCO0FBQ3RELGdCQUFRTSxRQUFSO0FBQ0UsZUFBSyxjQUFMO0FBQ0UsbUJBQU8sQ0FDTCxhQURLLEVBQ1VMLHFCQUFxQixDQUFDRCxTQUFELENBRC9CLENBQVA7O0FBR0YsZUFBSyxzQkFBTDtBQUNFLG1CQUFPLENBQ0wsa0JBREssRUFDZUEsU0FEZixDQUFQOztBQUdGO0FBQ0UsbUJBQU8sQ0FDTE0sUUFESyxFQUNLTixTQURMLENBQVA7QUFWSjtBQWNELE9BZlcsQ0FEdUYsQ0FBNUI7QUFBQSxLQUFqRTtBQUQ4RCxHQUFMO0FBQUEsQ0FBNUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXHJcbiAqIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcclxuICogZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy4gKi9cclxuXHJcbmltcG9ydCBwaWNrIGZyb20gJ2xvZGFzaC9waWNrJztcclxuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC9pc09iamVjdCc7XHJcbmltcG9ydCBwaWNrQnkgZnJvbSAnbG9kYXNoL3BpY2tCeSc7XHJcbmltcG9ydCBtYXBPYmogZnJvbSAnbWFwLW9iaic7XHJcbmltcG9ydCBpc0dsb2IgZnJvbSAnaXMtZ2xvYic7XHJcblxyXG5jb25zdCBWQUxJRF9KU0JFQVVUSUZZX0NPTkZJR19LRVlTID0gW1xyXG4gICdhbGwnLFxyXG4gICdodG1sJyxcclxuICAnY3NzJyxcclxuICAnanMnLFxyXG4gICdqc29uJyxcclxuICAnY3VzdG9tJyxcclxuXTtcclxuXHJcbi8vIFV0aWxpdHkgZnVuY3Rpb24gc3BlY2lhbCBjYXNpbmcgXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIiB2YWx1ZXMgYXMgYmVpbmdcclxuLy8gYWN0dWFsbHkgYm9vbGVhbnMuIFRoaXMgYXZvaWRzIGNvbW1vbiBhY2NpZGVudHMgaW4ganNvbiBmaWxlcy5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplQm9vbGVhbmlzaFZhbHVlcyA9IChwcmVmVmFsdWUpID0+IHtcclxuICBzd2l0Y2ggKHByZWZWYWx1ZSkge1xyXG4gICAgY2FzZSAndHJ1ZSc6XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY2FzZSAnZmFsc2UnOlxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gcHJlZlZhbHVlO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFV0aWxpdHkgZnVuY3Rpb24gc3BlY2lhbCBjYXNpbmcgXCJ0YWJcIiBhbmQgXCJzcGFjZVwiIHZhbHVlcyBhcyBiZWluZ1xyXG4vLyBhY3R1YWxseSBcXHQgYW5kIFxccy5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplQ2hhcmlzaFZhbHVlcyA9IChwcmVmVmFsdWUpID0+IHtcclxuICBzd2l0Y2ggKHByZWZWYWx1ZSkge1xyXG4gICAgY2FzZSAndGFiJzpcclxuICAgICAgcmV0dXJuICdcXHQnO1xyXG4gICAgY2FzZSAnc3BhY2UnOlxyXG4gICAgICByZXR1cm4gJyAnO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHByZWZWYWx1ZTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBVdGlsaXR5IGZ1bmN0aW9uIG1hc3NhZ2luZyAuanNiZWF1dGlmeXJjIG9iamVjdHMgaW50byBhIGNvbnNpc3RlbnQgYW5kXHJcbi8vIGV4cGVjdGVkIGZvcm1hdCwgZGlzY2FyZGluZyB1bmtub3duIGtleXMgYW5kIHNhbml0aXppbmcgdmFsdWVzLlxyXG5leHBvcnQgY29uc3Qgc2FuaXRpemVKc2JlYXV0aWZ5Q29uZmlnID0ganNiZWF1dGlmeUNvbmZpZyA9PiBtYXBPYmoocGljayhqc2JlYXV0aWZ5Q29uZmlnLCBWQUxJRF9KU0JFQVVUSUZZX0NPTkZJR19LRVlTKSwgKGZpbGVUeXBlLCBmaWxlU2V0dGluZ3MpID0+IHtcclxuICBzd2l0Y2ggKGZpbGVUeXBlKSB7XHJcbiAgICBjYXNlICdhbGwnOlxyXG4gICAgY2FzZSAnaHRtbCc6XHJcbiAgICBjYXNlICdjc3MnOlxyXG4gICAgY2FzZSAnanMnOlxyXG4gICAgY2FzZSAnanNvbic6XHJcbiAgICAgIHJldHVybiBbXHJcbiAgICAgICAgZmlsZVR5cGUsIG1hcE9iaihmaWxlU2V0dGluZ3MsIChwcmVmTmFtZSwgcHJlZlZhbHVlKSA9PiBbXHJcbiAgICAgICAgICBwcmVmTmFtZSwgc2FuaXRpemVCb29sZWFuaXNoVmFsdWVzKHByZWZWYWx1ZSksXHJcbiAgICAgICAgXSksXHJcbiAgICAgIF07XHJcbiAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICByZXR1cm4gW1xyXG4gICAgICAgIGZpbGVUeXBlLCBtYXBPYmooZmlsZVNldHRpbmdzLCAoZ2xvYlN0cmluZywgZ2xvYkNvbmZpZykgPT4gW1xyXG4gICAgICAgICAgZ2xvYlN0cmluZywgbWFwT2JqKGdsb2JDb25maWcsIChwcmVmTmFtZSwgcHJlZlZhbHVlKSA9PiBbXHJcbiAgICAgICAgICAgIHByZWZOYW1lLCBzYW5pdGl6ZUJvb2xlYW5pc2hWYWx1ZXMocHJlZlZhbHVlKSxcclxuICAgICAgICAgIF0pLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICBdO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIC5qc2JlYXV0aWZ5cmMgZmlsZSB0eXBlOiAke2ZpbGVUeXBlfWApO1xyXG4gIH1cclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgdHJhbnNsYXRlRWRpdG9yQ29uZmlnVG9Kc2JlYXV0aWZ5Q29uZmlnID0gZWRpdG9yQ29uZmlnID0+ICh7XHJcbiAgY3VzdG9tOiBtYXBPYmoocGlja0J5KGVkaXRvckNvbmZpZywgKHYsIGspID0+IGlzR2xvYihrKSAmJiBpc09iamVjdCh2KSksIChnbG9iU3RyaW5nLCBnbG9iQ29uZmlnKSA9PiBbXHJcbiAgICBnbG9iU3RyaW5nLCBtYXBPYmooZ2xvYkNvbmZpZywgKHByZWZOYW1lLCBwcmVmVmFsdWUpID0+IHtcclxuICAgICAgc3dpdGNoIChwcmVmTmFtZSkge1xyXG4gICAgICAgIGNhc2UgJ2luZGVudF9zdHlsZSc6XHJcbiAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAnaW5kZW50X2NoYXInLCBzYW5pdGl6ZUNoYXJpc2hWYWx1ZXMocHJlZlZhbHVlKSxcclxuICAgICAgICAgIF07XHJcbiAgICAgICAgY2FzZSAnaW5zZXJ0X2ZpbmFsX25ld2xpbmUnOlxyXG4gICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgJ2VuZF93aXRoX25ld2xpbmUnLCBwcmVmVmFsdWUsXHJcbiAgICAgICAgICBdO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBwcmVmTmFtZSwgcHJlZlZhbHVlLFxyXG4gICAgICAgICAgXTtcclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgXSksXHJcbn0pO1xyXG4iXSwiZmlsZSI6InV0aWxzL2NvbmZpZ1Nhbml0aXplcnMuanMifQ==

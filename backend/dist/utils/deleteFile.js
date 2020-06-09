"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');

 function deleteFile(image, local) {
  if (image) {
    const path = _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', local, image);

    if (_fs2.default.existsSync(path)) {
      _fs2.default.unlinkSync(path);
    }
  }
} exports.default = deleteFile;

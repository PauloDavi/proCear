import multer from 'multer';
import { resolve } from 'path';
import { v4 } from 'uuid';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const hash = v4();

      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
};

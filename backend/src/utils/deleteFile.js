import fs from 'fs';
import { resolve } from 'path';

export default function deleteFile(image) {
  if (image) {
    const path = resolve(__dirname, '..', '..', 'uploads', image);

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}

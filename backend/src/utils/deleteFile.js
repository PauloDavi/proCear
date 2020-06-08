import fs from 'fs';
import { resolve } from 'path';

export default function deleteFile(image, local) {
  if (image) {
    const path = resolve(__dirname, '..', '..', 'uploads', local, image);

    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
}

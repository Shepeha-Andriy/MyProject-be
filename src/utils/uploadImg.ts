import multer from "multer";
import sharp from "sharp";

export const buffer = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    console.log(file);
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(
        new Error('err 224')
      );
    }
  },
});

export const compressAvatar = async (req, res, next) => {
  if (!req.files) {
    return next();
  }
  
  try {
    const resizedImages = [];

    for (const file of req.files) {
      const compressedImage = await sharp(file.buffer)
        .resize({ width: 500 })
        .jpeg({ quality: 50 })
        .toBuffer();

      file.buffer = compressedImage;
      file.size = compressedImage.byteLength

      if (file.buffer.byteLength > 500000) {
        return next(new Error(`Maximum avatar size: ${500000 / 1000000} mb.`));
      }

      resizedImages.push(file);
    }
 
    req.files = resizedImages
    next();
  } catch (err) {
    return next(err);
  }
};

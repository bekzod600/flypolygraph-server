const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

const img = {
  upload_img: async (tempFilePath, folderPath) => {
    if (!folderPath) return console.log("folderPath not found");
    if (!tempFilePath) return console.log("image not found");
    try {
      return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload(tempFilePath, { folder: `sq_market/${folderPath}` }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        });
        removeTmp(tempFilePath);
      });
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  },
  delete_img: async (public_id) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      if (result.result === "ok") {
        console.log("Rasm muvaffaqiyatli o'chirildi.");
      } else {
        console.log("Rasm o'chirishda xatolik yuz berdi.");
      }
    } catch (error) {
      console.error("Xatolik yuz berdi:", error.message);
    }
  },
};

module.exports = img;

/** 
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

exports.uploadImg = async (imgPath, folderPath) => {
  if (!folderPath) return console.log("folderPath not found");

  try {
    const result = await cloudinary.uploader.upload(imgPath, { folder: `Uzbekenergotamir/${folderPath}` });
    removeTmp(imgPath);
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteImg = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
  return "file deleted";
};

 */

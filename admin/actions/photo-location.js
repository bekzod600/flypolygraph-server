const path = require("path");
const fs = require("fs");
const AdminBro = require("admin-bro");

const after = async (res, req, ctx) => {
  const { record, uploadImage } = ctx;

  if (record.isValid() && uploadImage) {
    const filePath = path.join("uploads", record.id().toString(), uploadImage.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.rename(uploadImage.path, filePath);
    await record.update({ profilePhotoLocation: `/${filePath}` });
  }
  return res;
};
const before = async (req, ctx) => {
  if (req.method === "post") {
    const { uploadImage, ...otherParams } = req.payload;

    ctx.uploadImage = uploadImage;
  }
  return { ...otherParams, payload: otherParams };
};

module.exports = { before, after };

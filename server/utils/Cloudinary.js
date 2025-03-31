const cloudinary_js_config = require('../config/cloudinaryConfig');

const getBase64 = (file) => `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

const uploadToCloudinaryMany = async (files) => {
  const promises = files.map(async (file) => {
    return new Promise((resolve, reject) => {
      cloudinary_js_config.uploader.upload(getBase64(file), (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  });

  const result = await Promise.all(promises);

  return result.map((i) => ({
    public_id: i.public_id,
    url: i.secure_url,
  }));
};
const uploadToCloudinarySingle = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary_js_config.uploader.upload(getBase64(file), (error, result) => {
      if (error) return reject(error);
      resolve({
        public_id: result.public_id,
        url: result.secure_url,
      });
    });
  });
};

const deleteFromCloudinary = async (publicIds) => {
  const promises = publicIds.map((id) => {
    return new Promise((resolve, reject) => {
      cloudinary_js_config.uploader.destroy(id, (error, result) => {
        if (error) return reject(error);
        resolve();
      });
    });
  });

  await Promise.all(promises);
};

// Exporting all functions at once
module.exports = {
  uploadToCloudinarySingle,
  uploadToCloudinaryMany,
  deleteFromCloudinary,
};

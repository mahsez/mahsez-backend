// import { v2 as cloudinary } from 'cloudinary';
// import cloudinary from 'cloudinary';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import config from '@/config/index.js';

// cloudinary.config({
//   cloud_name: config.cloudinary.cloudinary_cloud_name,
//   api_key: config.cloudinary.cloudinary_api_key,
//   api_secret: config.cloudinary.cloudinary_api_secret,
// });

// Multer Cloudinary Storage কনফিগারেশন
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     const folder = req.originalUrl.includes('product')
//       ? 'mahsez-storate/product'
//       : req.originalUrl.includes('user')
//         ? 'mahsez-storate/user'
//         : req.originalUrl.includes('blog')
//           ? 'mahsez-storate/blog'
//           : 'mahsez/other';

//     const fileName = file.originalname
//       .split('.')[0]
//       .toLowerCase()
//       .replace(/\s+/g, '-')
//       .replace(/[^a-z0-9-_]/g, '');

//     return {
//       folder,
//       allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
//       public_id: `t${Date.now()}-${fileName}`,
//       resource_type: 'image',
//     };
//   },
// });

// const upload = multer({ storage: storage });

// export const FileUploadHelper = {
//   upload,
// };

//////////// Only Single file upload in Object
// const uploadToCloudinary = async (
//   uploadFiles: IUploadFile,
// ): Promise<ICloudinaryResponse | undefined> => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       uploadFiles.path,
//       (error: Error, result: ICloudinaryResponse) => {
//         fs.unlinkSync(uploadFiles.path);
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       },
//     );
//   });
// };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//     // cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dkmk6h6vi",
  api_key: process.env.CLOUDINARY_API_KEY || "895696144883492",
  api_secret: process.env.CLOUDINARY_API_SECRET || "8xLp7u8yJvP8Z4h9yW7f3qQ",
});

export default cloudinary;


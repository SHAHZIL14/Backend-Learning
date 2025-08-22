import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
// Modules //

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});
// Configuration //

async function uploadOnCloud(filePath) {
  try {
    if (!filePath) throw new Error("File path not found");
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto"
    });
    console.log(response.url, "File uploaded successfully on cloud");
    return response;
  } catch (error) {
    fs.unlinkSync(filePath); // remove the locally saved file as of rejection //
    return null;
  }
}
// Methods //

export default uploadOnCloud;
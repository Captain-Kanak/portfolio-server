import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.js";
import multer from "multer";
import AppError from "../errors/AppError.js";
import status from "http-status";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: async (req, file) => {
    try {
      const originalFileName = file.originalname;
      const extension = originalFileName.split(".").pop()?.toLocaleLowerCase();
      const fileNameWithoutExtension = originalFileName
        .split(".")
        .slice(0, -1)
        .join(".")
        .toLocaleLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");

      const uniqueFileName =
        Math.random().toString(36).substring(2) +
        "-" +
        Date.now() +
        "-" +
        fileNameWithoutExtension;

      let folderName = "";
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      const pdfExtensions = ["pdf"];

      if (imageExtensions.includes(extension as string)) {
        folderName = "images";
      } else if (pdfExtensions.includes(extension as string)) {
        folderName = "pdfs";
      } else {
        folderName = "others";
      }

      return {
        resource_type: "auto",
        public_id: uniqueFileName,
        folder: `ph-healthcare/${folderName}`,
      };
    } catch (error: any) {
      throw new AppError(
        error.message || "Failed to upload file to Cloudinary",
        status.INTERNAL_SERVER_ERROR,
      );
    }
  },
});

export const multerUpload = multer({ storage });

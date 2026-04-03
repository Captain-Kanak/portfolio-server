import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { env } from "./env.js";
import AppError from "../errors/AppError.js";
import status from "http-status";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const uploadFileToCloudinary = async (
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> => {
  try {
    if (!buffer || !fileName) {
      throw new AppError(
        "File Name and Buffer are required to upload file to Cloudinary",
        status.BAD_REQUEST,
      );
    }

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const pdfExtensions = ["pdf"];

    const extension = fileName.split(".").pop()?.toLocaleLowerCase();
    let folderName = "";

    if (imageExtensions.includes(extension as string)) {
      folderName = "images";
    } else if (pdfExtensions.includes(extension as string)) {
      folderName = "pdfs";
    } else {
      folderName = "others";
    }

    const fileNameWithoutExtension = fileName
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

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            public_id: `portfolio/${folderName}/${uniqueFileName}`,
            folder: `portfolio/${folderName}`,
          },
          (error, result) => {
            if (error) {
              return reject(
                new AppError(
                  error.message || "Failed to upload file",
                  status.INTERNAL_SERVER_ERROR,
                ),
              );
            }

            resolve(result as UploadApiResponse);
          },
        )
        .end(buffer);
    });
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to upload file to Cloudinary",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const deleteFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.+?)(?:\.[a-zA-Z0-9]+)+$/;
    const match = url.match(regex);

    if (match && match[1]) {
      const publicId = match[1];

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });

      console.log(`File ${publicId} deleted from Cloudinary`);
    }
  } catch (error: any) {
    throw new AppError(
      error.message || "Failed to delete file from Cloudinary",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export { cloudinary as cloudinaryUpload };

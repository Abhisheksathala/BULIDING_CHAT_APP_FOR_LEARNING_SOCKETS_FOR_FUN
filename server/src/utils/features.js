import { v4 as uuid } from "uuid";
import { v2 as cloudinary } from "cloudinary";
import { getBase64 } from "../helpers/Hpelerchat";

export const emitEvent = (req, event, user, data) => {
  console.log("emitEvent called with:", { req, event, user, data });
};

export const uploadFilesTocloudinary = async (files = []) => {
  const uploadPromises = files.map((file, i) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });

  try {
    const results = await Promise.all(uploadPromises);

    const fromattedResults = results.map((result) => ({
      public_id: result.public_id,
      Url: result.secure_url,
    }));

    return fromattedResults;
  } catch (error) {
    throw new Error("Error uploading to cloudinary", error);
  }
};

export const deletfilesfromclodinary = async (public_id) => {
  console.log("deletfilesfromclodinary called with:", { public_id });
};

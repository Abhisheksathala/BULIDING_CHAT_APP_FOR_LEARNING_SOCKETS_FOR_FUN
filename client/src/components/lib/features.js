import moment from "moment";

export const fileFormat = (url = "") => {
  const fileExt = url.split(".").pop();

  if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";
  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

export const transformImage = (url = "", width = 100) => url;

export const getLast7days = () => {
  const currentDate = moment();
  const last7days = [];
  for (let i = 0; i < 7; i++) {
    // last7days.unshift(currentDate.format("MM D"));
    // currentDate.subtract(1, "days");
    const dayDate = currentDate.clone().subtract(i,"days")
    const dayname = dayDate.format("ddd")
    last7days.unshift(dayname)
  }
  return last7days;
};

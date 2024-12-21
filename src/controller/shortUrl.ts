import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";
import { URLModel } from "../models/urlModel";

export const shortURL: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { longurl } = req.body;

  if (!longurl) {
    return res.status(400).json({ message: "URL is required" });
  }

  const shortId = nanoid(8);
  const shortUrl = `https://WWW.ly/${shortId}`;

  try {
    const newUrl = new URLModel({
      longUrl: longurl,
      shortUrl: shortUrl,
      shortId: shortId,
    });
    await newUrl.save();

    res.status(200).json({ shortUrl });
  } catch (error) {
    console.error("Error shortening URL:", error);
    next(error);
  }
};

export const redirectURL: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shortId } = req.params;

  try {
    const urlRecord = await URLModel.findOne({ shortId });

    if (!urlRecord) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    res.status(200).json({ longUrl: urlRecord.longUrl });
  } catch (error) {
    console.error("Error during redirection:", error);
    next(error);
  }
};

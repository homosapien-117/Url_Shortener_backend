"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectURL = exports.shortURL = void 0;
const nanoid_1 = require("nanoid");
const urlModel_1 = require("../models/urlModel");
const shortURL = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { longurl } = req.body;
    if (!longurl) {
        return res.status(400).json({ message: "URL is required" });
    }
    const shortId = (0, nanoid_1.nanoid)(8);
    const shortUrl = `https://WWW.ly/${shortId}`;
    try {
        const newUrl = new urlModel_1.URLModel({
            longUrl: longurl,
            shortUrl: shortUrl,
            shortId: shortId,
        });
        yield newUrl.save();
        res.status(200).json({ shortUrl });
    }
    catch (error) {
        console.error("Error shortening URL:", error);
        next(error);
    }
});
exports.shortURL = shortURL;
const redirectURL = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shortId } = req.params;
    try {
        const urlRecord = yield urlModel_1.URLModel.findOne({ shortId });
        if (!urlRecord) {
            return res.status(404).json({ message: "Short URL not found" });
        }
        res.status(200).json({ longUrl: urlRecord.longUrl });
    }
    catch (error) {
        console.error("Error during redirection:", error);
        next(error);
    }
});
exports.redirectURL = redirectURL;

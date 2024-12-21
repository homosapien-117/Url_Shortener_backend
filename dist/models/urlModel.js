"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLModel = void 0;
const mongoose_1 = require("mongoose");
const urlSchema = new mongoose_1.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
}, { timestamps: true });
const URLModel = (0, mongoose_1.model)("URL", urlSchema);
exports.URLModel = URLModel;

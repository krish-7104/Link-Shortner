import Link from "../models/link.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import axios from 'axios';
import cheerio from 'cheerio';

export const GetLinkHandler = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const link = await Link.findOne({ uniqueId })
        if (!link) {
            return res.status(404).json(new ApiResponse(404, {}, "Link Not Found!"));
        }
        res.status(200).json(new ApiResponse(200, link, "Link Found!"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const GetAllLinksHandler = async (req, res) => {
    try {
        const { userId } = req.params;
        const links = await Link.find({ user: userId }).sort({ createdAt: -1 })
        res.status(200).json(new ApiResponse(200, links, "Links Found!"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

const FetchTiteFromLink = async (link) => {
    try {
        const { data } = await axios.get(link);
        const $ = cheerio.load(data);
        const title = $('title').first().text();
        return title;
    } catch (error) {
        return null;
    }
}

const generateUniqueId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueId = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters[randomIndex];
    }
    return uniqueId;
};

export const AddLinkHandler = async (req, res) => {
    try {
        const { user, url } = req.body;
        let title = await FetchTiteFromLink(url);
        if (title === null) {
            title = "Untitled";
        }
        const newLink = new Link({ user, url, uniqueId: generateUniqueId(), title, longurl: url });
        await newLink.save();
        res.status(201).json(new ApiResponse(201, newLink, "Link Created!"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


export const UpdateAnalyticsHandler = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const updatedLink = await Link.findOneAndUpdate({ uniqueId }, { $inc: { clicks: 1 } }, { new: true });
        if (!updatedLink) {
            return res.status(404).json(new ApiResponse(404, {}, "Link Not Found!"));
        }
        res.status(200).json(new ApiResponse(200, updatedLink, "Link Updated!"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};


export const DeleteLinkHandler = async (req, res) => {
    try {
        const { uniqueId } = req.params;
        const deletedLink = await Link.findOneAndDelete({ uniqueId });
        if (!deletedLink) {
            return res.status(404).json(new ApiResponse(404, {}, "Link Not Found!"));
        }
        res.status(200).json(new ApiResponse(200, {}, "Link Deleted!"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

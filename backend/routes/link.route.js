import express from "express";
import {
  AddLinkHandler,
  DeleteLinkHandler,
  GetAllLinksHandler,
  GetLinkHandler,
  UpdateAnalyticsHandler,
} from "../controllers/link.controller.js";

const router = express.Router();

router.post("/add-link", AddLinkHandler);
router.get("/get-links/:userId", GetAllLinksHandler);

router.get("/get-link/:uniqueId", GetLinkHandler);

router.patch("/update-click/:uniqueId", UpdateAnalyticsHandler);
router.delete("/delete-link/:uniqueId", DeleteLinkHandler);

export default router;

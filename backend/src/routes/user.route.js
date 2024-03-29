import { Router } from "express";
import { TempCodeShare } from "../models/tempcode.model.js";
import shortid from "shortid";

const router = Router();

router.post("/share", async (req, res) => {
  try {
    const { code, expirationTime , language } = req.body;

    // Validate input
    if (!code || !expirationTime) {
      return res
        .status(400)
        .json({ message: "Code and expiration time are required." });
    }

    // Generate a short ID for the code snippet
    const shortId = shortid.generate();

    // Create a new temp code share instance
    const tempCodeShare = new TempCodeShare({
      shortId: shortId,
      data: code,
      expirationTime: expirationTime,
      language: language,
    });

    // Save the temp code share
    await tempCodeShare.save();

    return res
      .status(201)
      .json({ message: "Code shared successfully.", shortId: shortId });
  } catch (error) {
    console.error("Error sharing code:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});

router.get("/getcode/:shortId", async (req, res) => {
  try {
    const { shortId , language } = req.params;

    // Find the code snippet by shortId
    const codeSnippet = await TempCodeShare.findOne({ shortId });

    if (!codeSnippet) {
      return res.status(404).json({ message: "Code snippet not found." });
    }

    return res
      .status(200)
      .json({ code: codeSnippet.data, language: codeSnippet.language });
  } catch (error) {
    console.error("Error retrieving code snippet:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
});


export default router;

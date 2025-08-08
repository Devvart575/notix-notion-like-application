import Block from "../model/Block.js";
import mongoose from "mongoose";

// Create a new block
export const createBlock = async (req, res) => {
  try {
    const { type, content, page, position, checked } = req.body;

    const trimmedPage = page?.trim();

    if (!mongoose.Types.ObjectId.isValid(trimmedPage)) {
      return res.status(400).json({ message: "Invalid page ID" });
    }

    const newBlock = await Block.create({
      type,
      content,
      page: trimmedPage,
      position,
      checked: type === "todo" ? checked || false : undefined,
    });

    res.status(201).json(newBlock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blocks for a given page
export const getBlockByPage = async (req, res) => {
  try {
    const blocks = await Block.find({ page: req.params.pageId }).sort("position");
    res.status(200).json(blocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a block (content, type, checked, etc.)
export const updateBlock = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBlock = await Block.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedBlock) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json(updatedBlock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a block
export const deleteBlock = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Block.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json({ message: "Block deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reorder blocks (bulk position update)
export const reorderBlocks = async (req, res) => {
  try {
    const { blocks } = req.body; // Array of { id, position }

    const updates = blocks.map(({ id, position }) =>
      Block.findByIdAndUpdate(id, { position })
    );

    await Promise.all(updates);

    res.status(200).json({ message: "Blocks reordered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// import Page from ".Page.js"
import Page from "../model/Page.js";
import Block from "../model/Block.js";

//  Create a new page 
export const createPage = async (req, res) => {
  try {
    const { title, parentPage } = req.body;

    const newPage = await Page.create({
      title,
      parentPage: parentPage || null,
      createdBy: req.user.id, 
    });

    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// Get all pages 
export const getPages = async (req, res) => {
  try {
    const pages = await Page.find({ createdBy: req.user.id }).populate("parentPage");
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get specific page by ID 
export const getPageById = async (req, res) => {
  try {
    const page = await Page.findOne({
      _id: req.params.id,
      createdBy: req.user.id, // 👈 ownership check
    }).populate("parentPage");

    if (!page)
      return res.status(404).json({
        message: "Page not found",
      });

    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Recursive delete 
export const deletePage = async (req, res) => {
  const { id } = req.params;

  try {
    // Ownership check
    const page = await Page.findOne({ _id: id, createdBy: req.user.id });
    if (!page) return res.status(404).json({ message: "Page not found" });

    await deletePageAndChildren(id, req.user.id);
    res.status(200).json({ message: "Page and its children deleted" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function
async function deletePageAndChildren(pageId, userId) {
  // 1. Find child pages owned by same user
  const childPages = await Page.find({ parentPage: pageId, createdBy: userId });

  // 2. Recursively delete each child page
  for (const child of childPages) {
    await deletePageAndChildren(child._id, userId);
  }

  // 3. Delete blocks of the current page
  await Block.deleteMany({ page: pageId });

  // 4. Delete the page itself
  await Page.findOneAndDelete({ _id: pageId, createdBy: userId });
}

// Reorder tasks 
export const reorderTasks = async (req, res) => {
  const { id } = req.params;
  const { reorderedTasks } = req.body;

  if (!Array.isArray(reorderedTasks)) {
    return res.status(400).json({ message: "reorderedTasks must be an array" });
  }

  try {
    const page = await Page.findOne({ _id: id, createdBy: req.user.id });
    if (!page) return res.status(404).json({ message: "Page not found" });

    // Replace tasks with new order
    page.tasks = reorderedTasks;
    await page.save();

    res.status(200).json({ message: "Tasks reordered", tasks: page.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update page title, content, or tasks
export const updatePage = async (req, res) => {
  const { id } = req.params;
  const { title, content, tasks } = req.body;

  try {
    const page = await Page.findOne({ _id: id, createdBy: req.user.id });
    if (!page) return res.status(404).json({ message: "Page not found" });

    if (title !== undefined) page.title = title;
    if (content !== undefined) page.content = content;
    if (tasks !== undefined) page.tasks = tasks;
    await page.save();

    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reorder pages (bulk position update)
export const reorderPages = async (req, res) => {
  try {
    const { pages } = req.body; // Array of { id, position }

    const updates = pages.map(({ id, position }) =>
      Page.findOneAndUpdate({ _id: id, createdBy: req.user.id }, { position })
    );

    await Promise.all(updates);

    res.status(200).json({ message: "Pages reordered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

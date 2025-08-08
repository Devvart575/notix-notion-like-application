// import Page from ".Page.js"
import Page from "../model/Page.js"
import Block from "../model/Block.js"

//create a new page

export const createPage = async (req, res) => {
    try {
        const {title, parentPage} = req.body;

        const newPage = await Page.create({
            title,
            parentPage: parentPage || null,
        })

        res.status(201).json(newPage)
    } catch (err) {
        res.status(400).json({
            message : err.message
        })
    }
}

//get all pages

export const getPages =async (req, res) =>{
    try{
        const pages = await Page.find().populate("parentPage")

        res.status(201).json(pages)
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

// get specific page by ID

export const getPageById = async (req,res) => {
    try {
        const page = await Page.findById(req.params.id).populate("parentPage")
        if (!page)
            return res.status(404).json({
                message : "Page not found"
            })

            res.status(201).json(page)
    }catch (err) {
       res.status(500).json({ message: err.message }); 
    }
}


// Recursive delete
export const deletePage = async (req, res) => {
  const { id } = req.params;

  try {
    await deletePageAndChildren(id);
    res.status(200).json({ message: "Page and its children deleted" });
  } catch (error) {
    console.error("Error deleting page:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function
async function deletePageAndChildren(pageId) {
  // 1. Find child pages
  const childPages = await Page.find({ parentPage: pageId });

  // 2. Recursively delete each child page
  for (const child of childPages) {
    await deletePageAndChildren(child._id);
  }

  // 3. Delete blocks of the current page
  await Block.deleteMany({ page: pageId });

  // 4. Delete the page itself
  await Page.findByIdAndDelete(pageId);
}


// PATCH: Reorder tasks inside a page
export const reorderTasks = async (req, res) => {
  const { id } = req.params;
  const { reorderedTasks } = req.body;

  if (!Array.isArray(reorderedTasks)) {
    return res.status(400).json({ message: "reorderedTasks must be an array" });
  }

  try {
    const page = await Page.findById(id);
    if (!page) return res.status(404).json({ message: "Page not found" });

    // Replace tasks with new order
    page.tasks = reorderedTasks;
    await page.save();

    res.status(200).json({ message: "Tasks reordered", tasks: page.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Block from "../model/Block.js";

//create a new block

export const createBlock = async (req, res) => {
    try {
        const {type,  content, page, position, checked} = req.body

        const newBlock = await Block.create({
            type,
            content,
            page,
            position,
            checked : type === "todo" ? checked || false : undefined
        })

        res.status(201).json(newBlock)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

//Get all block for a given page
export const getBlockById = async (req, res) => {
    try {
        const blocks = await Block.find({
            page: req.params.pageId
        })
        .sort("position")

        res.status(200).json(blocks)
    }catch (err){
        res.status(500).json({
            message : err.message
        })
    }
}
import mongoose from "mongoose"

const blockSchema = new mongoose.Schema({
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true
    },

    type: {
        type: String,
        enum: ["text", "todo", "image", "heading"],
        default: "text"
    },

    content: {
        type: String,
        default: ""
    },

    position: {
        type: Number,
        required: true, // Make this required for reliable reordering
    },

    checked: {
        type: Boolean,
        default: false, // used for todo blocks
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

// Automatically assign position on new block creation
blockSchema.pre("save", async function (next) {
    if (this.isNew && this.position === undefined) {
        const count = await mongoose.model("Block").countDocuments({ page: this.page });
        this.position = count;
    }
    next();
});

const Block = mongoose.model("Block", blockSchema);
export default Block;

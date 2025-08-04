import mongoose from "mongoose"

const blockSchema = new mongoose.Schema({
    page : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Page",
        required : true
    },

    type : {
        type : String,
        enum : ["text", "todo", "image", "heading"],
        default : "text"
    },

    content : {
        type : String,
        default : ""
    },

    position : {
        type : Number,
        default : 0
    },

    checked : {
        type : Boolean,
        default : false, // only used for todo block
    },

    createdAt : {
        type: Date,
        default : Date.now,
    }
})

const Block = mongoose.model("Block",blockSchema);
export default Block
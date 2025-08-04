import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },

    parentPage : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        default: null,
    },

    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null

    },

    createdAt : {
        type : Date,
        default: Date.now
    }

     
})

const Page = mongoose.model("Page", pageSchema);
export default Page
